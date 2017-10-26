import React from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image, StatusBar } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <Image source={require('./src/images/insta_login_background.jpg')}>

        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        

      </Image>
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
