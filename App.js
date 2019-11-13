/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableHighlight } from 'react-native';

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
      <Text style={{fontSize: 20}}>{this.state.status == true ? new Date().toLocaleTimeString() + "" : ""}</Text>
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
//<Image style={{width: '100%', height: '100%', resizeMode: 'stretch'}} source={require('./jooj.png')}/>
  render() {
    return (
      <ImageBackground style={{width: null, height: null, flex: 1}} source={require('./jooj.png')}>
          <Text style={styles.instructions}>Aperte o botão para começar a gravar.</Text>
          <TouchableHighlight onPress={this._destroyRecognizer}>
            <Text style={styles.apagar}>Apagar</Text>
          </TouchableHighlight>
          <Text style={styles.resultado}>Resultado</Text>
          {this.state.results.map((result, index) => {
            return (
              <Text style={styles.resultado2} key={`result-${index}`} style={styles.stat}>
                {result}
              </Text>
            );
          })}
          <View style={styles.jooj}>
            <TouchableHighlight onPress={this._cancelRecognizing}>
              <Text style={styles.action}>Cancelar</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._startRecognizing}>
              <Image style={styles.button} source={require('./button.png')} />
            </TouchableHighlight>
            <TouchableHighlight onPress={this._stopRecognizing}>
              <Text style={styles.action}>Parar</Text>
            </TouchableHighlight>
          </View>
          <Clock/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  jooj: {
    position: "absolute",
    marginTop: 710,
    marginLeft: 0,
    marginBottom: 200,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  resultado: {
    padding: 30,
    marginTop: 35,
  },
  resultado2: {
    height: 200,
    padding: 30,
    marginTop: 10,
  },
  button: {
    width: 80,
    height: 80,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end", 
    marginTop: 5,
  },
  apagar: {
    marginLeft: 350,
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    paddingRight: 55,
    paddingLeft: 55
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginTop: 8,
  },
  stat: {
    textAlign: 'center',
    color: 'black',
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
