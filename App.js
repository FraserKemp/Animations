import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
  Easing,
} from 'react-native';
// import LottieView from 'lottie-react-native';
import ProcessingButton from './src/components/processingButton/ProcessingButton';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followToggle: false,
      followAnimated: new Animated.Value(0),
      likeToggle: false,
      heartAnimation: new Animated.Value(0),
    };
  }

  onPressFollowButtonOne = () => {
    this.animatedButton(!this.state.followToggle);
    this.setState({followToggle: !this.state.followToggle});
  };

  animatedButton = (newState) => {
    this.state.followAnimated.setValue(newState ? 0 : 1);
    Animated.timing(this.state.followAnimated, {
      toValue: newState,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  pressHeart = () => {
    this.likeAction(!this.state.likeToggle);
    this.setState({likeToggle: !this.state.likeToggle});
  };

  likeAction = (newState) => {
    this.state.heartAnimation.setValue(newState ? 0 : 1);
    Animated.timing(this.state.heartAnimation, {
      toValue: newState,
      duration: 800,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const {followToggle, followAnimated, heartAnimation} = this.state;
    const textValue = followToggle ? 'Following' : 'Follow';

    return (
      <View style={styles.buttonContainers}>
        <TouchableOpacity
          onPress={this.onPressFollowButtonOne}
          style={styles.followButton}>
          <Animated.View
            style={[
              styles.followButtonAnim,
              {
                transform: [
                  {
                    scaleX: followAnimated.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}
          />
          <Text
            style={[
              styles.followText,
              {color: followToggle ? '#FFFFFF' : '#D3072A'},
            ]}>
            {textValue}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressHeart} style={styles.lottieView}>
          {/*<LottieView source={require('./src/assets/29040-twitter-heart-animation')} progress={heartAnimation} />*/}
        </TouchableOpacity>
        <ProcessingButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainers: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  followText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 25,
  },
  followButton: {
    marginTop: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#D3072A',
    margin: 10,
    width: 180,
    height: 60,
    justifyContent: 'center',
  },
  followButtonAnim: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 180,
    borderRadius: 30,
    backgroundColor: '#D3072A',
    justifyContent: 'center',
  },
  lottieView: {
    flex: 1,
    width: 200,
    height: 200,
  },
});
