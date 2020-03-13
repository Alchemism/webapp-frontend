import React, { Component } from "react";
import "./App.css";
import getBooks from "./services/BookService";
import Book from "./components/Book";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
      random : ''
    }
    axios
    .get(
      "http://abc82cc6ea0994a7da2af9e67d62fbd5-1834012967.us-east-1.elb.amazonaws.com:8080/book"
  )
  .then(response =>
    {
    var randval =  response.data[Math.floor(Math.random() * response.data.length)];
  //console.log(randval);
    this.setState({books: response.data, random: randval})
  })
  }

  chooseRandom = () => {
    var randval =  this.state.books[Math.floor(Math.random() * this.state.books.length)];
    //console.log(randval);
    this.setState({books: this.state.books, random: randval})
  }
  render() {
    //console.log(this.state.books)
    //this.setState({books: getBooks})
    return(
      <div>
      <table>
      <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Title
          </th>
          <th>
            Author
          </th>
          <th>
          Quantity
        </th>
        <th>
        ISBN
      </th>
        </tr>
      </thead>
      <tbody>
  
      {/*this.state.books.map((book, key) => <Book book={book} key={key}/>)*/} 
  
      <tr>
      <td>
      {this.state.random.id}
      </td>
      <td>
      {this.state.random.title}
      </td>
      <td>
      {this.state.random.author}
      </td>
      <td>
      {this.state.random.quantity}
      </td>
      <td>
      {this.state.random.isbn}
      </td>
      </tr>
      </tbody>
    </table>
    <button onClick={() => this.chooseRandom()}>
    Next
    </button>
    </div>
    )   
  }
}

export default App;