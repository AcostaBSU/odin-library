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
