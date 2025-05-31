// grab buttons
const btnAddBook = document.querySelector(".btnAddBook");
// const btnRead = document.querySelector(".btnRead");
// const btnRemove = document.querySelector(".btnRemove");
// modal window
const modalWindow = document.querySelector("#modal");
const btnCloseModal = document.querySelector("#btnCloseModal");
const btnSubmitModal = document.querySelector("#btnSubmitModal");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
// grab container for cards so cards can be appended later
const cardContainer = document.querySelector("#card-container");


btnAddBook.addEventListener( "click", () => {
  console.log("btnAddBook works");
  modalWindow.showModal();
})

// btnRead.addEventListener("click", () => {
//   console.log("btnRead works");
// })

// btnRemove.addEventListener("click", () => {
//   console.log("btnRemove works");
// })

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
  const NUMBER_MAX_LENGTH = 30;
  // 1. check that if user enters page number of book, this number isn't to long
  if(event.target.value.length > NUMBER_MAX_LENGTH) {
    event.target.value = event.target.value.slice(0, NUMBER_MAX_LENGTH);
  }
})

// initialize variable with an empty array
const myLibrary = [];

// constructor function for creating book objects
function Book(title, author, pages, read) {
  // console.log("Inside constructor");
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = self.crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages ${this.read ? "already read" : "not read yet"} id: ${this.id} `;
  };
}

// function adds book objects to library
function addBookToLibrary(obj) {
  myLibrary.push(obj);
}

const createBook = ( (title, author, pages, read) => {
  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
})

//---------------------------------------------------------------------------------------------
// create function that loops through array and displays books as cards
const displayCards = () => {
  console.log("function createCards()");
  // iterate through array and call createCard for every book object to create a card
  myLibrary.forEach( (book) => {
    // call function to create a card
    createCard(book)
  })
}

// called from function displayCards to create a card for every book object
const createCard = (book) => {
  console.log("function createCard()");
  console.log(book.title);

  // create card
  //div class="card" main container
  const divCard = document.createElement("div");
  divCard.classList.add("card");
  
  // create div for title
  const divTitle = document.createElement("div");
  const pTitle = document.createElement("p");
  const pUserTitle = document.createElement("p");
  pTitle.textContent = "Title:";
  pUserTitle.textContent = `${book.title}`;
  divTitle.appendChild(pTitle);
  divTitle.appendChild(pUserTitle);

  // create div for author
  const divAuthor = document.createElement("div");
  const pAuthor = document.createElement("p");
  const pUserAuthor = document.createElement("p");
  pAuthor.textContent = "Author:";
  pUserAuthor.textContent = `${book.author}`;
  divAuthor.appendChild(pAuthor);
  divAuthor.appendChild(pUserAuthor);

  // create div for pages
  const divPages = document.createElement("div");
  const pPages = document.createElement("p");
  const pUserPages = document.createElement("p");
  pPages.textContent = "Pages:";
  pUserPages.textContent = `${book.pages}`;
  divPages.appendChild(pPages);
  divPages.appendChild(pUserPages);
  
  // create div for read
  const divRead = document.createElement("div");
  const pRead = document.createElement("p");
  const btnRead = document.createElement("button");
  pRead.textContent = `${book.read ? "already read" : "not read"}`;
  btnRead.textContent = "READ";
  btnRead.classList.add("btn");
  btnRead.classList.add("btnRead");

  divRead.appendChild(pRead);
  divRead.appendChild(btnRead);

  // create button remove)
  const btnRemove = document.createElement("button");
  btnRemove.textContent = "REMOVE";
  btnRemove.classList.add("btn");
  btnRemove.classList.add("btnRemove");

  // append everything to divCard
  divCard.appendChild(divTitle);
  divCard.appendChild(divAuthor);
  divCard.appendChild(divPages);
  divCard.appendChild(divRead);
  divCard.appendChild(btnRemove);
  // append divCard to cardContainer
  cardContainer.appendChild(divCard);

  // append eventlistener to button
  btnRead.addEventListener("click", () => {
    console.log("btnRead works");
  })

  btnRemove.addEventListener("click", () => {
    console.log("btnRemove works");
  })
}


// create 5 books
createBook("Lord of the Rings 1", "J. R. R. Tolkien", 1000, true);
createBook("Lord of the Rings 2", "J. R. R. Tolkien", 1200, true);
createBook("Lord of the Rings 3", "J. R. R. Tolkien", 900, false);
createBook("Harry Potter 1", "J. K. Rowling", 1900, true);
createBook("1984", "Orwell", 600, true);


// console.log(book1.info());
// console.log(book2.info());
// console.log(book3.info());
// console.log(book4.info());
// console.log(book5.info());


displayCards();

//---------------------------------------------------------------------------------------------