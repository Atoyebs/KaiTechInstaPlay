import React from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image, StatusBar, Linking } from 'react-native';
import Dimensions from 'Dimensions';
import { LoginButton, TappableText } from './src/components';


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

const urls = {
  forgotInstagramLogin: 'https://www.instagram.com/accounts/password/reset',
  twitterLogin: 'https://twitter.com/login?lang=en'
}

const standardComponentWidth = window.width * 0.82;

export default class App extends React.Component {

  loginButtonTapped = () => {
    console.log('button was just tapped');
  }

  /* this function/method will render the -- OR -- separator component */
  orSeparatorComponent = () => {
    return (
      <View style={viewStyles.orSeparatorComponent}>
        <View style={viewStyles.orSeparatorLine}/>
        <Text style={textStyles.orSeparatorText}> OR</Text>
        <View style={viewStyles.orSeparatorLine}/>
      </View>
    );
  }

  /* this function/method will render the login with twitter component */
  loginWithTwitterTappableTextComponent = () => {
    return (
      <View style={viewStyles.twitterLoginComponentEncapsulatingView}>
        <Image
          source={require('./src/images/icons/twitter_bird.png')}
          style={viewStyles.twitterIcon}
          resizeMode={'contain'}
        />
        <TappableText
          textStyle={textStyles.twitterLoginText}
          textTapped={() => Linking.openURL(urls.twitterLogin)}
        >
          Log in with Twitter
        </TappableText>
      </View>
    );
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

          <View style={viewStyles.forgottenLoginEncapsulationView}>
            <Text style={textStyles.forgottenLogin}> Forgotten your login details? </Text>
            <TappableText
              textStyle={[textStyles.forgottenLogin, textStyles.forgottenLoginBold]}
              textTapped={() => Linking.openURL(urls.forgotInstagramLogin)}
            >
              Get Help Signing In
            </TappableText>
          </View>

          {this.orSeparatorComponent()}

          {this.loginWithTwitterTappableTextComponent()}

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
    marginTop: (window.height * 0.14),
    marginBottom: 25,
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
  },
  forgottenLoginEncapsulationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10
  },
  orSeparatorComponent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 25,
    marginBottom: 18,
    alignItems: 'center'
  },
  orSeparatorLine: {
    height: 1,
    flex: 5,
    backgroundColor: colors.facebookButtonBorderColor,
    borderColor: colors.facebookButtonBorderColor,
    borderWidth: 0.5
  },
  twitterLoginComponentEncapsulatingView: {
    flexDirection: 'row',
    width: standardComponentWidth,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  twitterIcon: {
    width: 17,
    height: 17
  }

};

const textStyles = {

  forgottenLogin:{
    color: 'white',
    fontSize: loginButtonInfo.pageFontSize
  },
  forgottenLoginBold: {
    fontWeight: 'bold'
  },
  orSeparatorText: {
    fontWeight: 'bold',
    fontSize: 12.5,
    marginHorizontal: 4,
    backgroundColor: 'transparent',
    color: colors.facebookButtonBorderColor,
    flex: 1
  },
  twitterLoginText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 7,
    color: 'white',
    backgroundColor: 'transparent'
  }

};
