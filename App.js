import React from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={viewStyles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const viewStyles = {

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }

};
