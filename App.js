import React, { Component } from 'react';
import {Text, View, ScrollView, TouchableHighlight, Image, StatusBar, Linking, WebView } from 'react-native';
import Dimensions from 'Dimensions';
import { LoginButton, TappableText } from './src/components';


//this code creates a constant that holds the dimensions of the current device as an object
const window = Dimensions.get('window');

const standardComponentWidth = window.width * 0.82;

//===================== OBJECT PROPERTIES ====================

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
  twitterLogin: 'https://twitter.com/login?lang=en',
  instagramSignUp: 'https://www.instagram.com/accounts/emailsignup/?hl=en',
  instagramAuthLogin: 'https://api.instagram.com/oauth/authorize/?client_id=cda6dee7d8164a868150910407962f52&redirect_uri=http://www.kaitechconsulting.com&response_type=token&scope=basic+follower_list+comments+likes',
  instagramLogout: 'https://instagram.com/accounts/logout',
  instagramBase: 'https://www.instagram.com/'
}


//=========================== CLASS DECLARATION ===========================


class App extends Component {

  constructor(props){

    super(props);

    //initialise the global state object
    this.state = {
      authenticationURL: urls.instagramLogout,
      retrievedAccessToken: '',
      isUserLoggedIn: false,
      //when the application loads up you don't want it displaying the authentication web view
      displayAuthenticationWebView: false
    }

  }

//=========================== ACTION FUNCTIONS ===========================


  loginButtonTapped = () => {
    this.setState({displayAuthenticationWebView: true});
  }

  /*This function will run EVERY TIME THE URL CHANGES*/
  onURLStateChange = (webViewState) => {

      let accessTokenSubString = 'access_token=';

      console.log("Current webViewState = " + webViewState.url);

      if(webViewState.url == urls.instagramBase){
        this.setState({authenticationURL: urls.instagramAuthLogin});
      }
      //OTHERWISE if the current URL contains the word 'access_token=' then . . .
      else if(webViewState.url.includes(accessTokenSubString)){

        /*find the index of the = after 'access_token'*/
        let startIndexOfAccessToken = webViewState.url.lastIndexOf(accessTokenSubString) + accessTokenSubString.length;

        /*if the accessToken is not populated (i.e if its length <= 1) then populate it*/
        if (this.state.retrievedAccessToken.length < 1) {
          //populate/set the access token with everything after the access_token= substring
          this.setState({retrievedAccessToken: webViewState.url.substr(startIndexOfAccessToken), displayAuthenticationWebView: false});
        }
      }
  }


//=========================== COMPONENT CREATION FUNCTIONS ===========================


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

  signUpFooter = () => {
    return (
      <View style={[viewStyles.forgottenLoginEncapsulationView, viewStyles.signUpFooterComponent]}>
        <Text style={[textStyles.forgottenLogin, {color: 'grey'}]}>Dont you have an account? </Text>
        <TappableText
          textStyle={[textStyles.forgottenLogin ,textStyles.forgottenLoginBold, {color: 'grey'}]}
          textTapped={() => Linking.openURL(urls.instagramSignUp)}
        >
          Sign Up
        </TappableText>
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


  authenticationWebViewComponent = () => {
    return (
      <WebView
        source={{ uri: this.state.authenticationURL }}
        startInLoadingState={true}
        onNavigationStateChange={this.onURLStateChange}
      />
    );
  }


  loginScreenComponent = () => {
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

        {this.signUpFooter()}

      </Image>
    );
  }



  render() {

    let hasSuccesfullyLoggedIn = (this.state.retrievedAccessToken.length > 1);
    let shouldDisplayLoginScreen = (!this.state.displayAuthenticationWebView && this.state.retrievedAccessToken.length < 1);

    //if the displayAuthenticationWebView is false then show the loginScreen
    if(shouldDisplayLoginScreen){
      return (
        this.loginScreenComponent()
      );
    }
    //display authentication WebView
    else if(this.state.displayAuthenticationWebView == true) {
      return (
        this.authenticationWebViewComponent()
      );
    }
    //at this point we've retrieved an access token, the user has succesfully logged on
    else if(hasSuccesfullyLoggedIn){
      console.log("Yay! Hit has succesfully login");
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>CONGRATULATIONS YOUVE LOGGED IN SUCCESFULLY</Text>
        </View>
      );
    }


  }

}


//===================== STYLES =====================

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
    marginBottom: 14,
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
  },
  signUpFooterComponent: {
    flex: 0.4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: 'black',
    shadowOffset: {width:0 , height: 1.5},
    elevation: 2,
    height: null,
    width: window.width
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

export default App;
