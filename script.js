
const btnAddBook = document.querySelector(".btnAddBook");
const btnRead = document.querySelector(".btnRead");
const btnRemove = document.querySelector(".btnRemove");
const btnCloseModal = document.querySelector("#btnCloseModal");
const btnSubmitModal = document.querySelector("#btnSubmitModal");

const modalWindow = document.querySelector("#modal");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");

const NUMBER_MAX_LENGTH = 30;

btnAddBook.addEventListener( "click", () => {
  console.log("btnAddBook works");
  modalWindow.showModal();
})

btnRead.addEventListener("click", () => {
  console.log("btnRead works");
})

btnRemove.addEventListener("click", () => {
  console.log("btnRemove works");
})

btnCloseModal.addEventListener("click", () => {
  console.log("btnCloseModal");
  modalWindow.close();
})

btnSubmitModal.addEventListener("click", () => {
  modalWindow.close();
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
})


inputPages.addEventListener("input", (event) => {
  // 1. check that if user enters page number of book, this number isn't to long
  if(event.target.value.length > NUMBER_MAX_LENGTH) {
    event.target.value = event.target.value.slice(0, NUMBER_MAX_LENGTH);
  }
})






const myLibrary = [];

function Book(title, author, pages, read) {
  console.log("Inside constructor");
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = self.crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author},
                ${this.pages} pages ${
      this.read ? "already read" : "not read yet"
    }
                id: ${this.id} `;
  };
}

function addBookToLibrary(obj) {
  myLibrary.push(obj);
}

for (let i = 0; i < myLibrary.length; i++) {
  console.log(myLibrary[i].title);
}


// let count = 5;
// while (count > 0) {
//   let title = prompt("Enter title of book: ");
//   let author = prompt("Enter name of author: ");
//   let pages = prompt("Enter total number of pages: ");
//   console.log(`pages typeof: ${typeof pages} `);
//   pages = parseInt(pages, 10);
//   console.log(`pages typeof: ${typeof pages} `);
//   let read = prompt("Did you read the book? Enter true/false");

//   console.log(
//     `user input: title: ${title} author: ${author} pages: ${pages} read: ${read}`
//   );

//   const book = new Book(title, author, pages, read);
//   addBookToLibrary(book);
//   count--;

// }

// myLibrary.forEach((book, index) => {
//     console.log(`Book Nr.${index} ${book.title} ${book.author} ${book.pages} ${book.read} ${book.id}`);
// });

console.log("Should be five books in array. Quit Program! Have a nice day!");
console.log("Over and out");