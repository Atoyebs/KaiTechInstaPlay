import React from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image, StatusBar } from 'react-native';
import Dimensions from 'Dimensions';
import { LoginButton } from './src/components';


//this code creates a constant that holds the dimensions of the current device as an object
const window = Dimensions.get('window');

const colors = {
  facebook: 'rgb(59, 89, 152)',
  text: 'rgba(255, 255, 255, 0.75)',
  instagramButtonBorderColor: 'rgba(255, 255, 255, 0.35)',
  facebookButtonBorderColor: 'rgba(255, 255, 255, 0.35)'
}

const loginButtonInfo = {
  height: 45,
  pageFontSize: 11,
  borderWidth: 0.8,
  borderRadius: 5
}

const standardComponentWidth = window.width * 0.82;

export default class App extends React.Component {

  loginButtonTapped = () => {
    console.log('button was just tapped');
  }


  render() {
    return (
      <Image source={require('./src/images/insta_login_background.jpg')} style={viewStyles.container}>

        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        <ScrollView>

          <Image source={require('./src/images/instagram-text-logo.png')}
           resizeMode={'contain'}
           style={viewStyles.instagramTextLogo}
          />

          <LoginButton
           buttonViewStyle={viewStyles.instagramLoginButtonView}
           touchableHighlightStyle={viewStyles.instagramLoginButtonHighlightStyle}
           buttonTextStyle={{color: colors.text, fontWeight: '500'}}
           buttonTapped={this.loginButtonTapped}
           activeOpacity={0.75}
          >
            Log In (Via Instagram)
          </LoginButton>

          <LoginButton
           buttonViewStyle={[viewStyles.instagramLoginButtonView, viewStyles.facebookLoginButtonView]}
           touchableHighlightStyle={viewStyles.facebookLoginButtonHighlightStyle}
           buttonTextStyle={{color: colors.text, fontWeight: '500'}}
           buttonTapped={this.loginButtonTapped}
           activeOpacity={0.75}
          >
            Facebook Login
          </LoginButton>

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
  instagramTextLogo: {
    width: (window.width * 0.40),
    height: (window.height * 0.12),
    marginTop: (window.height * 0.18),
    marginBottom: 30,
    alignSelf: 'center'
  },
  instagramLoginButtonView: {
    backgroundColor: 'transparent',
    borderColor: colors.instagramButtonBorderColor,
    borderWidth: loginButtonInfo.borderWidth,
    borderRadius: loginButtonInfo.borderRadius,
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  facebookLoginButtonView: {
    backgroundColor: colors.facebook
  },
  instagramLoginButtonHighlightStyle: {
    backgroundColor: 'transparent',
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    marginTop: 5
  },
  facebookLoginButtonHighlightStyle: {
    backgroundColor: colors.facebook,
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: loginButtonInfo.borderWidth,
    borderRadius: loginButtonInfo.borderRadius,
    borderColor: colors.facebookButtonBorderColor
  }

};

const textStyles = {

};
