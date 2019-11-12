/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

import Voice from 'react-native-voice';

import LinearGradient from 'react-native-linear-gradient';

// Within your render function

class Clock extends Component{
  constructor(props){
    super(props);

    this.state = {status: Voice.isRecognizing()};

    setInterval(
      () => {this.setState({status: Voice.isRecognizing()})},
      500
    );
  }

  render(){
    return(
      <Text style={{fontSize: 20}}> Status : {this.state.status == true ? new Date().toLocaleTimeString() + "True" : "False"}</Text>
    );
  }
}


class App extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    // eslint-disable-next-line
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {
    // eslint-disable-next-line
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = e => {
    // eslint-disable-next-line
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = e => {
    // eslint-disable-next-line
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = e => {
    // eslint-disable-next-line
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('pt-BR');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  render() {
    return (
      <View style={styles.container} >
        <LinearGradient colors={['#CB3BEB','#268BFF']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            Sign in with Facebook
          </Text>
          <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
          <Text style={styles.instructions}>Press the button and start speaking.</Text>
          <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
          <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
          <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
          <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
          <Text style={styles.stat}>Results</Text>
          {this.state.results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.stat}>
                {result}
              </Text>
            );
          })}
          <Text style={styles.stat}>Partial Results</Text>
          {this.state.partialResults.map((result, index) => {
            return (
              <Text key={`partial-result-${index}`} style={styles.stat}>
                {result}
              </Text>
            );
          })}
          <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
          <TouchableHighlight onPress={this._startRecognizing}>
            <Image style={styles.button} source={require('./button.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this._stopRecognizing}>
            <Text style={styles.action}>Stop Recognizing</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._cancelRecognizing}>
            <Text style={styles.action}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._destroyRecognizer}>
            <Text style={styles.action}>Destroy</Text>
          </TouchableHighlight>
          <Clock/>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
    fontWeight: 'bold',
    marginTop: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 1,
    marginTop: 10,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default App;
