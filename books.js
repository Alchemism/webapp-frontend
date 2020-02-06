const books = document.getElementsByName('signup-form'); 
     books.onsubmit = function(e) {
        e.preventDefault();

        const id = books.id.value; 
        const title = books.title.value;
        const author = books.author.value;
        const quantity = books.quantity.value; 
        const isbn = books.isbn.value; 

        const book_list = {
            id, title, author, quantity, isbn,  
        }
          fetch('http://localhost:8080/book', {
              method: 'GET',
              body: JSON.stringify(book_list),
              headers:{
              'Content-Type': 'application/json'
              }
          }).then(res => {
             console.log(res); 
          })
          .catch(error => console.error('Error:', error));
         books.reset();
       }