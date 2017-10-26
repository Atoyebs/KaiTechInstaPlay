import React from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image, StatusBar } from 'react-native';
import Dimensions from 'Dimensions';
import { LoginButton } from './src/components';


//this code creates a constant that holds the dimensions of the current device as an object
const window = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
      <Image source={require('./src/images/insta_login_background.jpg')} style={viewStyles.container}>

        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        <ScrollView style={viewStyles.ScrollView}>

          <Image source={require('./src/images/instagram-text-logo.png')}
           resizeMode={'contain'}
           style={viewStyles.instagramTextLogo}
          />

        </ScrollView>

      </Image>
    );
  }
}

const viewStyles = {

  container: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null
  },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  instagramTextLogo: {
    width: (window.width * 0.40),
    height: (window.height * 0.12),
    marginTop: (window.height * 0.20),
    marginBottom: 30
  }

};
