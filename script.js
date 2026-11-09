function Book(title, author, pages, read) {
  if(!new.target) {
    throw Error("You must use 'new' operator to call the constructor.");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = this.genID();
}

Book.prototype.genID = function() {
  return self.crypto.randomUUID();
}

Book.prototype.getInfo = function() {
  return `${this.title} by ${this.author} is ${this.pages} pages long. ${this.read}. ID: ${this.id}`;
}

const library = new Array();

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  library.push(book);

  return book;
}

addBookToLibrary("Catch-22", "Joseph Heller", 453, "Not yet read");

for (const book of library) {
  console.log(book.getInfo());
}

const table = document.querySelector("table");

for (const book of library) {
  const tr = document.createElement("tr");
  for (const detail in book) {
    if (book.hasOwnProperty(detail)) {
      const td = document.createElement("td");
      td.textContent = book[detail];
      tr.append(td);
    }
  }
  table.append(tr);
}

function addBookToTable(book) {
  const tr = document.createElement("tr");
  for (const detail in book) {
    if (book.hasOwnProperty(detail)) {
      const td = document.createElement("td");
      td.textContent = book[detail];
      tr.append(td);
    }
  }
  table.append(tr);
}

const body = document.querySelector("body");
const newBookButton = document.querySelector("#new-book");

newBookButton.addEventListener("click", newBookButtonClick);

function removeNewBookButton() {
  body.removeChild(newBookButton);
}

function addNewBookForm() {
  const form = document.createElement("form");
  form.setAttribute("action", "");
  form.setAttribute("method", "post");

  const fieldsetBook = document.createElement("fieldset");
  const legendBookInfo = document.createElement("legend");
  legendBookInfo.textContent = "Book Information";

  const labelTitle = document.createElement("label");
  labelTitle.setAttribute("for", "title");
  labelTitle.textContent = "Title: ";

  const inputTitle = document. createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("id", "title");
  inputTitle.setAttribute("name", "title");

  const labelAuthor = document.createElement("label");
  labelAuthor.setAttribute("for", "author");
  labelAuthor.textContent = "Author: ";

  const inputAuthor = document. createElement("input");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("id", "author");
  inputAuthor.setAttribute("name", "author");

  const labelPages = document.createElement("label");
  labelPages.setAttribute("for", "pages");
  labelPages.textContent = "Total pages: ";

  const inputPages = document. createElement("input");
  inputPages.setAttribute("type", "number");
  inputPages.setAttribute("id", "pages");
  inputPages.setAttribute("name", "pages");

  const fieldsetUserInvolvement = document.createElement("fieldset");
  const legendUserInvolvement = document.createElement("legend");

  legendUserInvolvement.textContent = "Personal Involvement with Book";
  
  const labelRead = document.createElement("label");
  labelRead.setAttribute("for", "read");

  const selectRead = document.createElement("select");
  selectRead.setAttribute("id", "read");
  selectRead.setAttribute("name", "read");

  const optionNo = document.createElement("option");
  optionNo.setAttribute("value", "Not yet read");
  optionNo.textContent = "No";

  const optionYes = document.createElement("option");
  optionYes.setAttribute("value", "Read");
  optionYes.textContent = "Yes";

  const buttonSubmit = document.createElement("button");
  buttonSubmit.setAttribute("id", "add-book");
  buttonSubmit.setAttribute("type", "submit");
  buttonSubmit.textContent = "Add Book";

  form.appendChild(fieldsetBook);
  fieldsetBook.appendChild(legendBookInfo);
  fieldsetBook.appendChild(labelTitle);
  fieldsetBook.appendChild(inputTitle);
  fieldsetBook.appendChild(labelAuthor);
  fieldsetBook.appendChild(inputAuthor);
  fieldsetBook.appendChild(labelPages);
  fieldsetBook.appendChild(inputPages);
  form.appendChild(fieldsetUserInvolvement);
  fieldsetUserInvolvement.appendChild(legendUserInvolvement);
  fieldsetUserInvolvement.appendChild(labelRead);
  fieldsetUserInvolvement.appendChild(selectRead);
  selectRead.appendChild(optionNo);
  selectRead.appendChild(optionYes);
  form.appendChild(buttonSubmit);

  body.prepend(form);
}

function addFormListener() {
  const addBookButton = document.querySelector("#add-book");
  addBookButton.addEventListener("click", addBookButtonClick);
}

function addBookButtonClick(event) {
  event.preventDefault();

  const form = document.querySelector("form");
  const userTitle = document.querySelector("#title");
  const userAuthor = document.querySelector("#author");
  const userPages = document.querySelector("#pages");
  const userRead = document.querySelector("#read");
  const buttonAddBook = document.querySelector("#add-book");

  const book = addBookToLibrary(userTitle.value,
                                userAuthor.value, 
                                userPages.value, 
                                userRead.options[userRead.selectedIndex].value);
  addBookToTable(book);

  body.removeChild(form);
  body.prepend(newBookButton);
}

function newBookButtonClick(event) {
  removeNewBookButton();
  addNewBookForm();
  addFormListener();
}

