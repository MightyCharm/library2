// main window
const btnAddBook = document.querySelector(".btnAddBook");
const cardContainer = document.querySelector("#cardContainer");
// modal window
const modalWindow = document.querySelector("#modal");
const btnCloseModal = document.querySelector("#btnCloseModal");
const btnSubmitModal = document.querySelector("#btnSubmitModal");
const btnCancelModal = document.querySelector("#btnCancelModal");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const errorInputTitle = document.querySelector("#errorInputTitle");
const errorInputAuthor = document.querySelector("#errorInputAuthor");
const errorInputPages = document.querySelector("#errorInputPages");
const selectBookProgress = document.querySelector("#selectBookProgress");

// opens modal window
btnAddBook.addEventListener("click", (event) => {
  main(event);
});

btnCloseModal.addEventListener("click", (event) => {
  main(event);
});

btnSubmitModal.addEventListener("click", (event) => {
  event.preventDefault();
  main(event);
});

btnCancelModal.addEventListener("click", (event) => {
  event.preventDefault();
  main(event);
});

// removes error message if user enters something
inputTitle.addEventListener("input", (event) => {
  resetInputErrorMessage(event);
});

inputAuthor.addEventListener("input", (event) => {
  resetInputErrorMessage(event);
});

// prevents that number input gets to long
inputPages.addEventListener("input", (event) => {
  validateInputPages(event);
  resetInputErrorMessage(event);
});

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    if (id === undefined) {
      this.id = self.crypto.randomUUID();
    } else {
      this.id = id;
    }
  }
  info() {
    return `Book Object Info: ${this.title} by ${this.author}, ${this.pages} pages ${this.read} id: ${this.id} `;
  }

  updateRead(progress) {
    // console.log("Book.prototype.updateRead = function(progress)");
    this.read = progress;
    console.log(this.title, this.author, this.pages, this.read);
  }
}

// function adds book objects to array myLibrary
function addBookToLibrary(obj) {
  let myLibrary = getLocalStorageData();
  if(!myLibrary) {
    myLibrary = [];
  }
  myLibrary.push(obj);
  storeDataInLocalStorage(myLibrary);
}

const createBookObj = (input) => {
  const book = new Book(input.title, input.author, input.pages, input.read);
  addBookToLibrary(book);
};

const validateInputPages = (event) => {
  // prevent that input starts with a 0
  if (event.target.value.startsWith("0")) {
    inputPages.value = event.target.value.substring(1);
  }
  //const position = event.target.selectionStart;
  // prevent that non digits are entered
  inputPages.value = event.target.value.replace(/[^0-9]/g, "");
};

const getUserInput = () => {
  const inputData = {
    title: inputTitle.value,
    author: inputAuthor.value,
    pages: inputPages.value,
    read: selectBookProgress.value,
  };

  const checkInputTitle = inputData.title.trim() !== "";
  const checkInputAuthor = inputData.author.trim() !== "";
  const checkInputPages = inputData.pages.trim() !== "";
  if (checkInputTitle && checkInputAuthor && checkInputPages) {
    return inputData;
  }
  return false;
};

const removeBookObjectFromData = (id) => {
  // remove card from dataset
  const myLibrary = getLocalStorageData();
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      myLibrary.splice(i, 1);
    }
  }
  storeDataInLocalStorage(myLibrary);
};

const getBookObject = (id) => {
  const myLibrary = getLocalStorageData();
  const books = myLibrary.map(
    (book) => new Book(book.title, book.author, book.pages, book.read, book.id)
  );
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      return books[i];
    }
  }
};

const resetModal = () => {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  selectBookProgress.options[0].selected = true;
  errorInputTitle.textContent = "Input is required.";
  errorInputAuthor.textContent = "Input is required.";
  errorInputPages.textContent = "Input is required.";
};

const resetInputErrorMessage = (event) => {
  const inputId = event.target.id;
  if (event.target.value.length > 0) {
    // user entered something, remove error message
    switch (inputId) {
      case "title":
        errorInputTitle.textContent = "";
        break;
      case "author":
        errorInputAuthor.textContent = "";
        break;
      case "pages":
        errorInputPages.textContent = "";
        break;
      default:
        console.log(
          "Something went wrong! function resetInputErrorMessage, switch statement."
        );
    }
  } else {
    // input element is empty again, insert error message
    switch (inputId) {
      case "title":
        errorInputTitle.textContent = "Title is required.";
        break;
      case "author":
        errorInputAuthor.textContent = "Author is required.";
        break;
      case "pages":
        errorInputPages.textContent = "Pages are required.";
        break;
      default:
        console.log(
          "Something went wrong! function resetInputErrorMessage, switch statement 2."
        );
    }
  }
};

// creates cards from objects
const displayCards = () => {
  // first clear GUI from all cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.remove();
  });

  const myLibrary = getLocalStorageData();
  // iterate through array and call createCard for every book object to create a card
  myLibrary.forEach((book) => {
    // call function to create a card
    createCard(book);
  });
};

// called from function displayCards
const createCard = (book) => {
  // create card
  const divCard = document.createElement("div");
  divCard.classList.add("card");
  divCard.id = book.id;

  // create div for title
  const divTitle = document.createElement("div");
  const pTitle = document.createElement("p");
  const pUserTitle = document.createElement("p");
  pTitle.classList.add("pTitle");
  pUserTitle.classList.add("pUserTitle");
  divTitle.classList.add("cardDivTitle");
  pTitle.textContent = "Title:";
  pUserTitle.textContent = `${book.title}`;
  divTitle.appendChild(pTitle);
  divTitle.appendChild(pUserTitle);

  // create div for author
  const divAuthor = document.createElement("div");
  const pAuthor = document.createElement("p");
  const pUserAuthor = document.createElement("p");
  divAuthor.classList.add("cardDivAuthor");
  pAuthor.classList.add("pAuthor");
  pUserAuthor.classList.add("pUserAuthor");
  pAuthor.textContent = "Author:";
  pUserAuthor.textContent = `${book.author}`;
  divAuthor.appendChild(pAuthor);
  divAuthor.appendChild(pUserAuthor);

  // create div for pages
  const divPages = document.createElement("div");
  const pPages = document.createElement("p");
  const pUserPages = document.createElement("p");
  divPages.classList.add("cardDivPages");
  pPages.classList.add("pPages");
  pUserPages.classList.add("pUserPages");
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
  divRead.classList.add("cardDivRead");
  labelSelect.classList.add("labelSelect");
  labelSelect.htmlFor = `cardSelect-${book.id}`;
  labelSelect.textContent = "Book read?";
  select.id = `cardSelect-${book.id}`;
  select.classList.add("cardSelect");
  select.name = "progress";
  select.dataset.action = "selectProgress";
  option1.value = "notRead";
  option2.value = "inProgress";
  option3.value = "finished";
  option1.text = "not read";
  option2.text = "in progress";
  option3.text = "finished";
  // use data to change gui
  switch (book.read) {
    case "notRead":
      option1.selected = true;
      break;
    case "inProgress":
      option2.selected = true;
      break;
    case "finished":
      option3.selected = true;
      break;
    default:
      console.log(
        "Error: something went wrong in switch statement (createCard)"
      );
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
    main(event);
  });

  // append eventlistener to button
  btnRemove.addEventListener("click", (event) => {
    main(event);
  });
};

const getLocalStorageData = () => {
  return JSON.parse(localStorage.getItem("myLibrary"));
};

const storeDataInLocalStorage = (value) => {
  if (!Array.isArray(value)) {
    console.log(
      `$$ title: ${value.title} author: ${value.author} read: ${value.read} id: ${value.id}`
    );
    const myLibrary = getLocalStorageData();
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === value.id) {
        console.log("book found inside myLibrary");
        myLibrary[i].read = value.read;
      }
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  } else {
    localStorage.setItem("myLibrary", JSON.stringify(value));
  }
};

// main function
const main = (event) => {
  const action = event.target.getAttribute("data-action");
  if (action === "newBook") {
    modalWindow.showModal();
  } else if (action === "closeModal" || action === "cancelModal") {
    resetModal();
    modalWindow.close();
  } else if (action === "submitModal") {
    const inputObj = getUserInput();
    if (inputObj !== false) {
      resetModal();
      modalWindow.close();
      createBookObj(inputObj);
      displayCards();
    }
  } else if (action === "selectProgress") {
    const progress = event.target.value;
    const cardId = event.target.closest(".card").id;
    const book = getBookObject(cardId);
    book.updateRead(progress);
    storeDataInLocalStorage(book);
  } else if (action === "removeBook") {
    const cardId = event.target.closest(".card").id;
    removeBookObjectFromData(cardId);
    displayCards();
  }
};

/* creating a few examples, so it doesn't look so boring */
const createExamples = () => {
  const exampleBook1 = {
    title: "Lord of the Rings The Fellowship",
    author: "J.R.R. Tolkien",
    pages: 1546,
    read: "notRead",
  };
  const exampleBook2 = {
    title: "Lord of the Rings: The two Towers",
    author: "J.R.R. Tolkien",
    pages: 1678,
    read: "inProgress",
  };
  const exampleBook3 = {
    title: "Lord of the Rings: Return of the King",
    author: "J.R.R. Tolkien",
    pages: 1102,
    read: "finished",
  };
  const exampleBook4 = {
    title: 1984,
    author: "George Orwell",
    pages: 1102,
    read: "notRead",
  };
  const exampleBook5 = {
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    pages: 425,
    read: "inProgress",
  };
  const exampleBook6 = {
    title: "The Count of Monte Christo",
    author: "Alexandre Dumas",
    pages: 336,
    read: "finished",
  };
  const exampleBook7 = {
    title: "It",
    author: "Stephen King",
    pages: 500,
    read: "notRead",
  };
  createBookObj(exampleBook1);
  createBookObj(exampleBook2);
  createBookObj(exampleBook3);
  createBookObj(exampleBook4);
  createBookObj(exampleBook5);
  createBookObj(exampleBook6);
  createBookObj(exampleBook7);
  displayCards();
};

const initializeData = () => {
  if (!getLocalStorageData()) {
    createExamples();
  }
  
};

initializeData();
displayCards();