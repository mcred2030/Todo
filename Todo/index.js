import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage
} from "react-native";
import TodoList from "./TodoList";
//import List from "./List";
import uuidv1 from "uuid/v1";
import DatePicker from "react-native-datepicker";


const { height, width } = Dimensions.get("window");

class Todo extends Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {},
    memodate:"2018-05-15",
    todate: "" //new Date()
  };
  componentDidMount = () => {
    this._loadToDos();
  };
  render() {
    const { newToDo, loadedToDos, toDos, memodate, todate } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do</Text>
        <View style={styles.card}>

          <View style={styles.inputRow}>
              <View style={styles.textInput}>
                <TextInput
                  style={styles.input}
                  placeholder={"add a new task.."}
                  value={newToDo}
                  onChangeText={this._crontollNewToDo}
                  placeholderTextColor={"#999"}
                  returnKeyType={"done"}
                  autoCorrect={false}
                  onSubmitEditing={this._addToDo}
                  underlineColorAndroid={"transparent"}
                />
              </View>
              <View style={styles.calendar}>
                <DatePicker
                    date={todate}
                    mode="date"
                    placeholder="MM.DD"
                    format="MM.DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        position: 'absolute',
                        left: 0,
                        top: 10,
                        marginLeft: 0,
                        width: 50,
                        height: 30,

                      },
                      dateIcon: {
                        top: 5,
                        marginRight: 5,
                      }
                    }}
                    onDateChange={(date) => {this.setState({todate: date})}}
                  />
              </View>
          </View>

          <View style={styles.dataList}>
            <ScrollView contentContainerStyle={styles.toDos}>
              {Object.values(toDos)
                .reverse()
                .map(toDo => (
                  <TodoList
                    key={toDo.id}
                    deleteToDo={this._deleteToDo}
                    uncompleteToDo={this._uncompleteToDo}
                    completeToDo={this._completeToDo}
                    updateToDo={this._updateToDo}
                    alarmDay={toDo.id}
                    {...toDo}
                  />
                ))}
            </ScrollView>
        </View>

      </View>       

        
    </View>
    );
  }
  _crontollNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({ loadedToDos: true, toDos: parsedToDos || {} });
    } catch (err) {
      console.log(err);
    }
  };
  _addToDo = () => {
    const { newToDo, todate  } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now(),
            alarmDay: todate
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          todate: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        this._saveToDos(newState.toDos);
        return { ...newState };
      });
    }
  };
  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _uncompleteToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: { ...prevState.toDos[id], isCompleted: true }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _updateToDo = (id, text, alarmDay) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: { ...prevState.toDos[id], text: text , alarmDay: alarmDay }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _saveToDos = newToDos => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };

}

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    
  },
  
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 20,
    fontWeight: "200",
    marginBottom: 10
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: 'column',
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  inputRow: {
    flexDirection: 'row',
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 4,
  },
  calendar: {
    flex: 1,
    alignItems: "center",
    
  },
  dataList: {
    flex: 5,
  },
  input: {
    padding: 20,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});