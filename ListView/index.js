import React, { Component } from "react";

import { StyleSheet, Text, View, Image, FlatList } from "react-native";

import BookItem from "./BookItem";
//import NYT from "./NYT";
import decode from 'unescape';

const API_HEADERS = {
  'method': 'list2'
};

//const API_URL = 'https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction?response-format=json&api-key=73b19491b83909c7e07016f4bb4644f9:2:60667290';
//const API_URL = 'http://www.tech2030.com/V2/inc/json.asp';
const API_URL = 'http://www.tech2030.com/V2/inc/JSON2.asp?method=list2';



class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this._refreshData();
  }

/*
  _renderItem = ({ item }) => {
    return (
      <BookItem
        coverURL={item.book_image}
        title={item.key}
        author={item.author}
      />
    );
  };
*/

  _renderItem = ({ item }) => {
    return (
      <BookItem
      coverURL={item.image_name}
      title={item.company}
      author={item.url}
      />
    );
  };

  _ListHeaderComponent() {
    return (
      <View>
          <Text>Top4</Text>
        </View>
    );

  }

  _ListFooterComponent() {
    return (
      <View>
          <Text>Bottom4</Text>
        </View>
    );

  }


  _addKeysToBooks = jsonData => {
    // Takes the API response from the NYTimes,
    // and adds a key property to the object
    // for rendering purposes
    return jsonData.map(jsonData => {
      return Object.assign(jsonData, { key: jsonData.url });
    });
  };

  _refreshData = () => {
    
    fetch(API_URL)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })

			//.then((response) => response.json())
			.then((responseData) => {
				this.setState({ data: this._addKeysToBooks(responseData.data) });

      })
      .catch(error => {
        console.error(error);
      });
    
  };



  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.data} 
          renderItem={this._renderItem} 
          ListHeaderComponent={this._ListHeaderComponent} 
          ListFooterComponent={this._ListFooterComponent}
          />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({ container: { flex: 1, paddingTop: 22 } });

export default ListView;