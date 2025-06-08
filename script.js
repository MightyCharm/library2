// grab buttons
const btnAddBook = document.querySelector(".btnAddBook");
// modal window
const modalWindow = document.querySelector("#modal");
const btnCloseModal = document.querySelector("#btnCloseModal");
const btnSubmitModal = document.querySelector("#btnSubmitModal");
const btnCancelModal = document.querySelector("#btnCancelModal");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const selectBookProgress = document.querySelector("#selectBookProgress");
// grab container for cards so cards can be appended later
const cardContainer = document.querySelector("#cardContainer");

// opens modal window
btnAddBook.addEventListener( "click", (event) => {
  console.log("btnAddBook.addEventListener()");
  main(event);
})

btnCloseModal.addEventListener("click", (event) => {
  console.log("btnCloseModal.addEventListener()");
  main(event);
})

btnSubmitModal.addEventListener("click", (event) => {
  console.log("btnSubmitModal.addEventListener()");
  event.preventDefault();
  main(event)
})

btnCancelModal.addEventListener("click", (event) => {
  event.preventDefault();
  main(event)
})

// prevents that number input doesn't get to long
inputPages.addEventListener("input", (event) => {
  console.log("inputPages.addEventListener()");
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
  console.log("function Book(title, author, pages, read)");
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = self.crypto.randomUUID();
  this.info = function () {
    return `Book Object Info: ${this.title} by ${this.author}, ${this.pages} pages ${this.read} id: ${this.id} `;
  };
}

// should change read status of object (data)
Book.prototype.updateRead = function(progress) {
  console.log("Book.prototype.updateRead (changes this.read in object)");
  console.log(this.read);
  this.read = progress;
  console.log(this.read);
  console.log("====>");
  console.log(this.title, this.author, this.pages , this.read)
}

// function adds book objects to library
function addBookToLibrary(obj) {
  console.log("addBookToLibrary()")
  myLibrary.push(obj);
}

const createBookObj = ( (input) => {
  console.log("createBookObj()")
  const book = new Book(input.title, input.author, input.pages, input.read);
  addBookToLibrary(book);
})

// called from function displayCards to create a card for every book object
const createCard = (book) => {
  console.log("createCard()");
  // create card
  const divCard = document.createElement("div");
  divCard.classList.add("card");
  divCard.id = book.id;
  
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
  const labelSelect = document.createElement("label");
  const select = document.createElement("select");
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  const option3 = document.createElement("option");
  labelSelect.htmlFor = "cardSelect";
  labelSelect.textContent = "Book read?";
  select.id = "cardSelect";
  select.classList.add("cardSelect");
  select.name = "progress";
  select.dataset.action = "selectProgress";
  option1.value = "notYetRead";
  option2.value = "inProgress";
  option3.value = "finished";
  option1.text = "not yet read";
  option2.text = "in progress";
  option3.text = "finished";
  // use data to change gui
  switch(book.read) {
    case "notYetRead":
      option1.selected = true;
      break;
    case "inProgress":
      option2.selected = true;
      break;
    case "finished":
      option3.selected = true;
      break;
    default:
      console.log("Error: something went wrong in switch statement");
      break;
  }

  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);
  divRead.appendChild(labelSelect);
  divRead.appendChild(select);

  // create button remove
  const btnRemove = document.createElement("button");
  btnRemove.textContent = "REMOVE";
  btnRemove.classList.add("btn");
  btnRemove.classList.add("btnRemove");
  btnRemove.dataset.action = "removeBook";

  // append everything to divCard
  divCard.appendChild(divTitle);
  divCard.appendChild(divAuthor);
  divCard.appendChild(divPages);
  divCard.appendChild(divRead);
  divCard.appendChild(btnRemove);
  // append divCard to cardContainer
  cardContainer.appendChild(divCard);

  select.addEventListener("change", (event) => {
    console.log("select.addEventListener()");
    main(event);
  })

  // append eventlistener to button
  btnRemove.addEventListener("click", (event) => {
    console.log("btnRemove.addEventListener()");
    main(event);
  })
}

// create function that loops through array and displays books as cards
// called from main/removeCards
const displayCards = () => {
  console.log("displayCards()");
  // first clear GUI from all cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.remove();
  })
  // iterate through array and call createCard for every book object to create a card
  myLibrary.forEach( (book) => {
    // call function to create a card
    createCard(book)
  })
}

// remove card from library array and from gui
const removeCardFromData = (id) => {
  console.log("removeCardFromDataGUI()");
  // remove card from dataset
  for(let i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].id === id) {
      myLibrary.splice(i, 1);
    }
  }
};

const getBookObject = (id) => {
  console.log("getBookObject");
  for(let i= 0; i < myLibrary.length; i++) {
    if(myLibrary[i].id === id) {
      console.log("object found");
      return myLibrary[i];
    }
  }
  
}


const getUserInput = () => {
  console.log("getUserInput()");
  const inputData = {
    title: inputTitle.value,
    author: inputAuthor.value,
    pages: inputPages.value,
    read: selectBookProgress.value
  }
 
  const checkInputTitle = inputData.title !== "";
  const checkInputAuthor = inputData.author !== "";
  const checkInputPages = inputData.pages !== "";
  if(checkInputTitle && checkInputAuthor && checkInputPages) {
    return inputData;
  }
  if(checkInputTitle === false) {
    console.log("Enter something into title input");
  }
  if(checkInputAuthor === false) {
    console.log("Enter something into author input");
  }
  if(checkInputPages === false) {
    console.log("Enter something into pages input");
  }
  return false;
}


const resetModal = () => {
  console.log("resetModal()");
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  selectBookProgress.options[0].selected = true;
}

// gets called from all eventlistener
const main = (event) => {
  console.log("main function()");
  const action = event.target.getAttribute("data-action");
  if(action === "newBook") {
    console.log("newBook was clicked");
    modalWindow.showModal();
  }
  else if(action === "closeModal" || action === "cancelModal") {
    console.log("closeModal/cancelModal was clicked");
    resetModal();
    modalWindow.close();
  }
  else if(action === "submitModal") {
    console.log("submitModal was clicked");
    const inputObj = getUserInput();
    if(inputObj !== false) { 
      resetModal();
      modalWindow.close();
      createBookObj(inputObj);
      displayCards();
    }
  }

  // this option need overhaul
  else if(action === "selectProgress") {
    console.log("selectProgress was clicked");
    console.log(event.target.value);
    const progress = event.target.value;
    const cardId = event.target.closest(".card").id;
    const book = getBookObject(cardId);
    book.updateRead(progress);
    displayCards();
  }
  else if(action === "removeBook") {
    console.log("removeBook was clicked");
    const cardId = event.target.closest(".card").id;
    removeCardFromData(cardId);
    displayCards();
  }
}


const createOneCardDeleteLater = () => {
  console.log("createOneCardDeleteLater()");
  const inputData = {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: 2002,
    read: "inProgress"
  }
  createBookObj(inputData);
  displayCards();
}

createOneCardDeleteLater()