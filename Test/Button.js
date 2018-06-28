import React, { Component } from "react";
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";

class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'white'}
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.buttonLabel}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
};

export default Button;

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