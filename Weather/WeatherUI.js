import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
 
const weatherCases = {
    Rain: {
        colors: '#00C6FB', 
        title: 'It\'s Raining',
        subtitle: 'For more info, look outside',
        icon: 'ios-rainy'
    },
    Clear: {
        colors: '#FEF253', 
        title: 'It\'s Sunny',
        subtitle: 'For more info, go outside',
        icon: 'ios-sunny'
    },
    Thunderstorm: {
        colors: '#00ECBC',
        title: 'Thungderstorms in the house',
        subtitle: 'Actually, outside of the house',
        icon: 'ios-thunderstorm'
    },
    Clouds: {
        colors: '#D7D2CC',
        title: 'Clouds',
        subtitle: 'I know, I like it',
        icon: 'ios-cloudy'
    },
    Snow: {
        colors: '#7DE2FC',
        title: 'Very Cold & Snowy',
        subtitle: 'Do you want to build a snowman?',
        icon: 'ios-snow'
    },
    Drizzle: {
        colors: '#89F7FE',
        title: 'Drizzle',
        subtitle: 'Is like rain',
        icon: 'ios-rainy-outline'
    },
    Haze: {
        colors: '#D7D2CC',
        title: 'Haze',
        subtitle: 'I know, I like it',
        icon: 'ios-haze'
    },
    Fog: {
        colors: '#D7D2CC',
        title: 'Fog',
        subtitle: 'Drive safely.',
        icon: 'ios-haze'
    },
    Mist: {
        colors: '#D7D2CC',
        title: 'Mist',
        subtitle: 'Drive safely.',
        icon: 'ios-haze'
    },
}



class WeatherUI extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            photoSource: null,
            myphotoSource: null,
            backColors: '#FFFFFF'
        };
      }

    componentDidMount() {
        this.setState({ photoSource: this._getImage(this.props.weatherName) });



      }

    render() {
        return (
            
            <View
                style={ {flex: 1, flexDirection: 'column', backgroundColor: `${weatherCases[this.props.weatherName].colors}` } }
            >
                
                <View style={styles.upper}>{this.state.photoSource}</View>
               
                   
                <View style={styles.lower}>
                    <Text style={styles.subtitle}>The temperature in {this.props.areaName} is {this.props.temp} 
                        </Text>
                    <Text style={styles.title}>{weatherCases[this.props.weatherName].title}</Text>
                    <Text style={styles.subtitle}>
                        {weatherCases[this.props.weatherName].subtitle}
                    </Text>
                </View>

            </View>
        );
    }

    _getImage = (text) => {
        switch(text) {
            case 'Rain':
                return <Image source={require('../images/rain.png')} style={{width: 200, height: 200}}  />;
            case 'Clear':
                return <Image source={require('../images/Clear.png')} style={{width: 200, height: 200}}  />;
            case 'Thunderstorm':
                return <Image source={require('../images/Thunderstorm.png')} style={{width: 200, height: 200}}  />;
            case 'Clouds':
                return <Image source={require('../images/Clouds.png')} style={{width: 200, height: 200}}  />;
            case 'Snow':
                return <Image source={require('../images/Snow.png')} style={{width: 200, height: 200}}  />;
            case 'Drizzle':
                return <Image source={require('../images/Drizzle.png')} style={{width: 200, height: 200}}  />;
            case 'Haze':
                return <Image source={require('../images/Haze.png')} style={{width: 200, height: 200}}  />;
            case 'Fog':
                return <Image source={require('../images/Fog.png')} style={{width: 200, height: 200}}  />;
            case 'Mist':
                return <Image source={require('../images/Mist.png')} style={{width: 200, height: 200}}  />;
            default:
                return null;
        }
    }
}
/*

WeatherUI.prototype = {
    temp: PropTypes.number.isRequired,
    weatherName: PropTypes.string.isRequired
}
*/


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    upper: {
        flex: 2 ,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    temp: {
        fontSize: 35,
        backgroundColor: 'transparent',
        color: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lower: {
        flex: 2,
        alignItems: 'flex-start',
        paddingLeft: 30
    },
    title: {
        fontSize: 35,
        backgroundColor: 'transparent',
        color: '#000'
    },
    subtitle: {
        fontSize: 24,
        backgroundColor: 'transparent',
        color: '#000'
    },
    backdrop: {
        flex: 1,
        flexDirection: "column",
        width: 200,
        height: 200
      },
});

export default WeatherUI;
