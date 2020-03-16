import React, { Component } from "react";
import { ErrorHandler} from 'universal-react-logger';
import "./App.css";
import getBooks from "./services/BookService";
import Book from "./components/Book";
import axios from "axios";

/*const client = require('prom-client');
const counter = new client.Counter({
  name: 'book_counter',
  help: 'book'
});
counter.inc(); // Inc with 1 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
      random : '', 
      counter: 0,
      error: this.props.error,
      errorInfo: this.props.errorInfo
    }
    axios
    .get(
      "http://localhost:8080/book"
  )
  .then(response =>
    {
    var randval =  response.data[Math.floor(Math.random() * response.data.length)];
  console.log(randval);
    this.setState({books: response.data, random: randval})
  })
  }
 
  chooseRandom = () => {
    var randval =  this.state.books[Math.floor(Math.random() * this.state.books.length)];
    //console.log(randval);
    this.setState({books: this.state.books, random: randval})
    //counter.inc()
    this.setState(({counter}) => ({
      counter: counter + 1
  }))
  }
  render() {
    if (this.state.counter === 50) {
      // Simulate a render error
      throw new Error('Error on render');
  }
    //console.log(this.state.books)
    //this.setState({books: getBooks})
    return(
      <div className= "table">
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
    <div className = "logger">
                <button onClick={this.chooseRandom}>Update counter: {this.state.counter}</button>
            </div>
    </div>
    
    )   
  }
}
export default ErrorHandler(App, true);
//export default App;