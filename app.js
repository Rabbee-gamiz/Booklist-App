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
            const StoredBooks = [
                {
                    title: "book one",
                    author: "author1",
                    pages: "69"
                },
                {
                    title: "book two",
                    author: "author2",
                    pages: "420"
                }
            ];
            const books = StoredBooks;

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
            console.log(row);
        }
        
    }

//Storing Class : Self-Explanatory



//Event : Displays Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event : Adds a Book



//Event : Removes a Book