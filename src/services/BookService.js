import axios from "axios";
import API_URL from "../ENV";
import USERNAME from "../ENV";
import PASSWORD from "../ENV"; 
/*export const getBooks = async () => {
  const response = await fetch("http://localhost:8080/book");
  const books = await response.json();
this.setState({books:books})
};*/

const backendurl = process.env.url

export const getBooks = async () => {
  return await axios
      .get(
        "http://localhost:8080/book" , {
          auth: {
            username: "sonia@neu.com",
            password: 123456789
          }
        }
    )
    .then(response => response.data)
    .catch(error => console.log(error)); 
    //return JSON.parse('[{"id": "3e78b47d-f747-4d06-bb5a-2aa96338fb1d", "title": "adv cloud", "author": "sonia", "quantity": 2, "isbn": 123213}]')
}; 
export default getBooks;
