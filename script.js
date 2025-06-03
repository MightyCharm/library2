// grab buttons
const btnAddBook = document.querySelector(".btnAddBook");

// modal window
const modalWindow = document.querySelector("#modal");
const btnCloseModal = document.querySelector("#btnCloseModal");
const btnSubmitModal = document.querySelector("#btnSubmitModal");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const radioBtnFalse = document.querySelector("#radio-read-false");
const radioBtnsRead = document.getElementsByName("read");

// grab container for cards so cards can be appended later
const cardContainer = document.querySelector("#card-container");

// opens modal window
btnAddBook.addEventListener( "click", () => {
  console.log("btnAddBook works");
  modalWindow.showModal();
})

btnCloseModal.addEventListener("click", () => {
  console.log("btnCloseModal");
  modalWindow.close();
})

btnSubmitModal.addEventListener("click", (event) => {
  console.log("inside eventListener btnSubmitModal");
  event.preventDefault();
  main();
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
    return `${this.title} by ${this.author}, ${this.pages} pages ${this.read ? "already read" : "not read yet"} id: ${this.id} `;
  };
}

// function adds book objects to library
function addBookToLibrary(obj) {
  myLibrary.push(obj);
}

const createBook = ( (obj) => {
  const book = new Book(obj.title, obj.author, obj.pages, obj.read);
  addBookToLibrary(book);
})

//---------------------------------------------------------------------------------------------
const clearCards = () => {
  console.log("clearCards()");
  // cardContainer.innerHTML = "";
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    console.log(card);
  })
  cards.forEach(card => card.remove());
  
}

// create function that loops through array and displays books as cards
// called from main/removeCards
const displayCards = () => {
  console.log("function createCards()");
  // iterate through array and call createCard for every book object to create a card
  myLibrary.forEach( (book) => {
    // call function to create a card
    createCard(book)
  })
}

// remove card from library array and from gui
const removeCardFromDataGUI = (id) => {
  console.log("removeCard()");
  console.log(id);
  console.log("length myLibrary: " + myLibrary.length);
  // remove card from dataset
  for(let i = 0; i < myLibrary.length; i++) {
    console.log("Inside for loop");
    console.log(myLibrary[i].id + " : " + id);
    if(myLibrary[i].id === id) {
      myLibrary.splice(i, 1);
    }
  }
  const card = document.getElementById(id);
  cardContainer.removeChild(card);
};

// called from function displayCards to create a card for every book object
const createCard = (book) => {
  console.log("function createCard()");
  // create card
  //div class="card" main container
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
  const pRead = document.createElement("p");
  const btnRead = document.createElement("button");
  pRead.textContent = `${book.read === "yes" ? "already read" : "not read"}`;
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

  btnRemove.addEventListener("click", (e) => {
    const cardId = e.target.closest(".card").id;
    removeCardFromDataGUI(cardId);
    // console.log(cardId);
    
  })
}

const getUserInput = () => {
  console.log("function getUserInput()");
  const inputData = {
    title: undefined,
    author: undefined,
    pages: undefined,
    read: undefined
  }
  inputData.title = inputTitle.value;
  inputData.author = inputAuthor.value;
  inputData.pages = inputPages.value;
  inputData.read = getRadioBtnValueModal();
  console.log(`date get from modal: title: ${inputData.title} - author: ${inputData.author} - pages: ${inputData.pages} - read: ${inputData.read};`)
 
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

// checks which radio button in modal window is selected, called from getUserInput();
const getRadioBtnValueModal = () => {
  for(let i=0; i< radioBtnsRead.length; i++) {
    if (radioBtnsRead[i].checked) {
      return radioBtnsRead[i].value;
    }
  }
}

const resetModal = () => {
  console.log("function clearInputModal()");
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  radioBtnFalse.checked = true;
}


// main function should be the head of all functions because it was to
// confusing...
// main function called:
// 1. from Submit Button Modal Window
const main = () => {
  console.log("main()");
  const input = getUserInput();
  // if user entered data correct
  if(input !== false) { 
    resetModal();
    modalWindow.close();
    createBook(input);
    clearCards();
    displayCards();
  }
}
//---------------------------------------------------------------------------------------------