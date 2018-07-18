import React, { Component } from "react";
import { StyleSheet, Text, View, Image, StatusBar, CameraRoll } from "react-native";

import WeatherUI from "./WeatherUI";

const API_KEY = "7b8eada924faa1e7d9061d7612e910a3";
const API_STEM = "https://api.openweathermap.org/data/2.5/weather?";



class Weather extends Component {
    state = {
        isLoaded: false,
        error: null,
        temperature: null,
        name: null,
        area: null,
        myphotoSource: null,
    };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                //console.log(position);
                this._getWeather(position.coords.latitude, position.coords.longitude);
            },
            error => {
                this.setState({ error: error });
            }
        );


        CameraRoll.getPhotos({ first: 5 }).then(data => {
            this.setState({ myphotoSource: { uri: data.edges[2].node.image.uri } });
          }, error => {
            console.warn(error);
          });

    }
    _getWeather = (lat, lon) => {
        fetch(`${API_STEM}lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                        temperature: json.main.temp,
                        name: json.weather[0].main,
                        area: json.name,
                        isLoaded: true
                    })                
            });
    };
    render() {
        const { isLoaded, error, temperature, name, area, myphotoSource } = this.state;
        return (
            <View style={styles.container}>
                
                <View><Image style={styles.backdrop} resizeMode='cover' source={myphotoSource} style={{width: 200, height: 200}}  /></View>
                <StatusBar barstyle="light-content" />
                {/*
                     <Text style={styles.loadingText}>{area}</Text>
                */}
                    

                    {isLoaded ?
                    (<WeatherUI areaName={area} weatherName={name} temp={Math.floor(temperature - 273.15)} />) : (
                    <View style={styles.loading}>
                            <Text style={styles.loadingText}>Getting the weather infor...</Text>
                            {error ? <Text style={styles.errorText}>{name}{error}</Text> : null}
                    </View>
                    )}  


                
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    },
  errorText: {
      color: 'red',
      backgroundColor: 'transparent',
      marginBottom: 40
  },
  loading: {
      flex: 1,
      backgroundColor: '#FDF6AA',
      justifyContent: 'flex-end',
      paddingLeft:15
  },
  loadingText: {
      fontSize: 38,
      marginBottom: 100,
  },
  backdrop: {
    flex: 1,
    flexDirection: "column",
  },
});

export default Weather;