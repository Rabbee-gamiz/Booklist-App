// Book Class : Each Class Represents a book
const list = document.getElementById("#book-list");
class Book{
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}

//UI Class : Handles UI stuff

    class UI {
       

        static displayBooks() {
         
            const books = Store.getBooks();

            books.forEach((book) => UI.addBookToList(book));

            
        }
        static addBookToList(book) {
            
            const list = document.querySelector('#book-list');
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
            `;
            
            list.appendChild(row);
            
        }

           /* 

            This is Simply a Function which Serves a FontAwesome Icon
        
            I Scrapped it due to the Icon loading after the Div is shown to the user
        
            Which makes the whole Div blank for Users with a Slow Connection
        
             static showAlert(message, className, checkMark) {
        
       
            const div = document.createElement("div");
                    div.className = `alert alert-${className}`
                   div.appendChild(document.createTextNode(message));
                   div.innerHTML =`<i class=${checkMark}></i>`;
                    const container = document.querySelector(".container");
                    const form = document.querySelector("#book-form");
                container.insertBefore(div, form);
       }


       */

       // Shows Alers Dynamically

       static showAlert(message, className) {
            const div = document.createElement("div");
         div.className = `alert alert-${className}`
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector(".container");
            const form = document.querySelector("#book-form");
         container.insertBefore(div, form);

         // Vanish in 2.5 Seconds
         setTimeout(() => document.querySelector(".alert").remove(), 2500);
             
         
       }

       // Clears The Fields


        static clearFields() {
            document.querySelector("#title").value="";
            document.querySelector("#author").value="";
            document.querySelector("#pages").value="";
        }

        // Deletes a Book

        static deleteBook(el){
            if(el.classList.contains('delete')) {
                el.parentElement.parentElement.remove();
            }
        }
    }

//Storing Class : Self-Explanatory
class Store{
    static getBooks() {
        let books;

        if(localStorage.getItem("books") === null){
            books = []
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }
    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.title === title) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem("books", JSON.stringify(books));
    }

}


//Event : Displays Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event : Adds a Book
document.querySelector("#book-form").addEventListener("submit" , (e) =>{
    //Prevents Default
    
    e.preventDefault();

    // Gets form Values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;

    // Validation
    if (title === "" || author === "" || pages ==="") {
        UI.showAlert("Cannot Add a Book when a Field is Missing", "danger mt-2");

    } else{
         // Instantiates a book
         const book = new Book(title, author, pages);

         // Adds the Books to the UI
            UI.addBookToList(book);

        // Adds a Book to the Local Storage
        Store.addBook(book);

        // Success Message
        UI.showAlert("Book Added", "success");

           // Clears the Field
               UI.clearFields();}

    
})


//Event : Removes a Book

document.querySelector("#book-list").addEventListener("click", (e) =>{
    
    // Deletes Book from the UI
    UI.deleteBook(e.target);
    
    // Removes Book from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    
    // Brings up an Alert
    UI.showAlert("Book Removed", "info");
})