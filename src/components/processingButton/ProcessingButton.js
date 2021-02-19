import React, {Component} from 'react';
import {View, Animated, TouchableOpacity, Text, StyleSheet} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';

const AnimatedIcon = Animated.createAnimatedComponent(IconFeather);

export default class ProcessingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textAnimValue: new Animated.ValueXY({x: 0, y: 0}),
      opacity: new Animated.Value(0),
      dotAnim1: new Animated.ValueXY({x: 0, y: 0}),
      dotAnim2: new Animated.ValueXY({x: 0, y: 0}),
      dotAnim3: new Animated.ValueXY({x: 0, y: 0}),
      dotAnim4: new Animated.ValueXY({x: 0, y: 0}),
      greenAnim: new Animated.Value(0),
      checkMarkOpacity: new Animated.Value(0),
    };
  }

  onPress = () => {
    const {
      dotAnim1,
      dotAnim2,
      dotAnim3,
      dotAnim4,
      opacity,
      textAnimValue,
      greenAnim,
      checkMarkOpacity,
    } = this.state;
    Animated.sequence([
      Animated.timing(textAnimValue, {
        toValue: {x: 0, y: -10},
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(textAnimValue, {
        toValue: {x: 0, y: 100},
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.stagger(300, [
        Animated.timing(dotAnim1, {
          toValue: {x: 110, y: 0},
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(dotAnim2, {
          toValue: {x: 110, y: 0},
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(dotAnim3, {
          toValue: {x: 110, y: 0},
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(dotAnim4, {
          toValue: {x: 110, y: 0},
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(greenAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(checkMarkOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  };

  render() {
    const {
      opacity,
      dotAnim1,
      dotAnim2,
      dotAnim3,
      dotAnim4,
      textAnimValue,
      greenAnim,
      checkMarkOpacity,
    } = this.state;

    return (
      <View style={styles.buttonContainers}>
        <TouchableOpacity onPress={this.onPress} style={styles.paymentButton}>
          <Animated.View
            style={[
              styles.paymentButtonAnim,
              {
                backgroundColor: greenAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#23201F', '#41a612'],
                }),
              },
            ]}
          />

          <Animated.View style={[dotAnim1.getLayout(), {opacity: opacity}]}>
            <View style={styles.dot} />
          </Animated.View>

          <Animated.View style={[dotAnim2.getLayout(), {opacity: opacity}]}>
            <View style={styles.dot} />
          </Animated.View>

          <Animated.View style={[dotAnim3.getLayout(), {opacity: opacity}]}>
            <View style={styles.dot} />
          </Animated.View>

          <Animated.View style={[dotAnim4.getLayout(), {opacity: opacity}]}>
            <View style={styles.dot} />
          </Animated.View>

          <Animated.View style={textAnimValue.getLayout()}>
            <Text
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                textAlign: 'center',
                fontSize: 15,
              }}>
              Proceed Payment
            </Text>
          </Animated.View>
          <AnimatedIcon
            name="check"
            size={40}
            style={{
              position: 'absolute',
              color: 'white',
              left: 80,
              top: 10,
              opacity: checkMarkOpacity,
            }}
          />
        </TouchableOpacity>
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
  dot: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 40,
    top: 5,
    right: 0,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
  },
  followText: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 15,
  },
  paymentButton: {
    marginBottom: 100,
    borderRadius: 15,
    borderColor: 'black',
    margin: 10,
    width: 200,
    height: 60,
    justifyContent: 'center',
  },
  paymentButtonAnim: {
    position: 'absolute',
    backgroundColor: '#41a612',
    borderRadius: 15,
    width: 200,
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
