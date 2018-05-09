const API_KEY = "73b19491b83909c7e07016f4bb4644f9:2:60667290";
const LIST_NAME = "hardcover-fiction";
const API_STEM = "https://api.nytimes.com/svc/books/v3/lists";
const API_JSON = "https://www.tech2030.com:14318/V2/inc/JSON2.asp?method=list2";

// https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction?response-format=json&api-key=73b19491b83909c7e07016f4bb4644f9:2:60667290

function fetchBooks2(list_name = LIST_NAME) {
  let url = `${API_STEM}/${LIST_NAME}?response-format=json&api-key=${API_KEY}`;
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.results.books;
    })
    .catch(error => {
      console.error(error);
    });

    
}

function fetchBooks() {
  let url = `${API_JSON}`;
  //return fetch('https://www.tech2030.com:14318/V2/inc/JSON2.asp?method=list2')
  return fetch('http://kanbanapi.pro-react.com/cards/')
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.data;
    })
    .catch(error => {
      console.error(error);
    });

    
}

export default { fetchBooks: fetchBooks };