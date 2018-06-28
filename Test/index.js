import React, { Component } from "react";
import {
  AlertIOS,
  PushNotificationIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Platform,
} from "react-native";

import RNLocalNotifications from 'react-native-local-notifications';

const { height, width } = Dimensions.get("window");


//RNLocalNotifications.setAndroidIcons(largeIconName, largeIconType, smallIconName, smallIconType);
//RNLocalNotifications.setAndroidIcons("ic_launcher", "mipmap", "notification_small", "drawable"); //this are the default values, this function is optional

//RNLocalNotifications.createNotification(id, text, datetime, sound[, hiddendata]);
RNLocalNotifications.createNotification(1, 'Some text', '2017-01-02 12:30', 'default');

//RNLocalNotifications.updateNotification(id, text, datetime, sound[, hiddendata]);
RNLocalNotifications.updateNotification(1, 'Some modifications to text', '2017-01-02 12:35', 'silence');

//RNLocalNotifications.deleteNotification(id);
RNLocalNotifications.deleteNotification(1);

class Test extends Component {


  render() {
    return (
      <View style={styles.container}>
         <Text style={styles.title}>Push</Text>
      </View>
    );
  }
};
export default Test;

/*

  _sendNotification() {
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
      aps: {
        alert: 'Sample notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _onNotification(notification) {
    AlertIOS.alert(
      'Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
}

class NotificationPermissionExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {permissions: null};
  }

  render() {
    return (
      <View>
        <Button
          onPress={this._showPermissions.bind(this)}
          label="Show enabled permissions"
        />
        <Text>
          {JSON.stringify(this.state.permissions)}
        </Text>
      </View>
    );
  }

  _showPermissions() {
    PushNotificationIOS.checkPermissions((permissions) => {
      this.setState({permissions});
    });
  }
}

var styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
});
*/
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