import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Image
} from "react-native";
import PropTypes from "prop-types";
import DatePicker from "react-native-datepicker";

const { width, height } = Dimensions.get("window");

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text, todate: "" };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompleteToDo: PropTypes.func.isRequired,
    completeToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired,
    alarmDay: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    //this.todate = this.props.alarmDay;
  };

  render() {
    const { isEditing, toDoValue, todate, editdate } = this.state;
    const { text, id, deleteToDo, isCompleted, alarmDay} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <View style={styles.rowstyle}>
              <TextInput
                style={[
                  styles.text2,
                  styles.input,
                  isCompleted ? styles.completedText : styles.uncompletedText
                ]}
                value={toDoValue}
                multiline={true}
                onChangeText={this._controllInput}
                returnKeyType={"done"}
                //onBlur={this._finishEditing}
                underlineColorAndroid={"transparent"}
              />             

                <DatePicker
                    date={editdate}
                    mode="datetime"
                    placeholder="MM.DD HH:mm"
                    format="MM.DD HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    minuteInterval={10}
                    showIcon={false}
                    customStyles={{
                      dateInput: {
                        position: 'absolute',
                        left: 0,
                        top: 10,
                        marginLeft: 0,
                        width: 100,
                        height: 30,

                      },
                      dateIcon: {
                        top: 5,
                        marginRight: 5,
                      }
                    }}
                    onDateChange={(date) => {this.setState({editdate: date})}}
                  />

            </View>
          ) : (
            <View style={styles.rowstyle}>
              <Text
                style={[
                  styles.text2,
                  isCompleted ? styles.completedText : styles.uncompletedText
                ]}
              >
                {text}
              </Text>
              <Text
                style={[
                  isCompleted ? styles.completedText : styles.uncompletedText
                ]}
              >{alarmDay}</Text>
            </View>
            
          )}
          
        </View>

        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
              <Image style={styles.icons} source={require('../images/enter.png')} />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Image style={styles.icons} source={require('../images/edit.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={this._deleteToDo}>
              <View style={styles.actionContainer}>
                <Image style={styles.icons} source={require('../images/delete.png')} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _deleteToDo = event => {
    event.stopPropagation();
    const { id, isCompleted, deleteToDo } = this.props;
    deleteToDo(id, isCompleted);
  };

  _toggleComplete = event => {
    event.stopPropagation();
    const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
    if (isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };
  _startEditing = event => {
    event.stopPropagation();
    this.setState({ isEditing: true, editdate: this.props.alarmDay });
  };
  _finishEditing = event => {
    event.stopPropagation();
    const { toDoValue,  editdate} = this.state;
    const { id, updateToDo } = this.props;
    updateToDo(id, toDoValue, editdate);
    this.setState({ isEditing: false });
  };
  _controllInput = text => {
    this.setState({ toDoValue: text });
  };
}

export default TodoList;

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  rowstyle: {
    marginVertical: 20
  },
  text2: {
    fontWeight: "600",
    fontSize: 20,
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    width: width / 2,
    /*
    marginVertical: 15,
    paddingBottom: 5
    */
  },
  icons: {
    width: 20,
    height: 20
  }
});