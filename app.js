const newBookBtn = document.getElementById("new-book-button");
const submitBtn = document.getElementById("submit-button");
const formContainer =  document.querySelector("div.form-container");
const libraryContainer = document.querySelector("div.library-container");
const libraryGrid = document.querySelector("div.library-grid");

newBookBtn.addEventListener("click", () => {
    showBookForm();
  //  libraryContainer.style.display = "none";
});

submitBtn.addEventListener("click", (event) => {
    addBook();
    event.preventDefault();
});

function showBookForm() {
    formContainer.style.display = "block";
}

let library = [];

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead
}

const tempBook = new Book('Beyond Good and Evil', 'Friedrich Nietzsche', 240, false);
library.push(tempBook);
generateCard(library[0]);

function addBook() {
    const bookTitle = document.getElementById("title");
    const bookAuthor = document.getElementById("author");
    const bookPages = document.getElementById("pages");
    const checkBox = document.getElementById("read-toggle");
    let isRead = false;

    if (checkBox.checked) {
        isRead = true;
    }
    if (bookTitle.value !== '' && bookAuthor.value !== '' && bookPages.value !== '') {
        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead);
        library.push(newBook);
        generateCard(library[library.length - 1]);
        formContainer.style.display = "none";
        libraryContainer.style.display = "block";
    }
}

function generateCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    const titleHeader = document.createElement('h3');
    titleHeader.textContent = book.title;
    const authorText = document.createElement('p');
    authorText.textContent = book.author;
    const pagesText = document.createElement('p');
    if (parseInt(book.pages) > 1) {
        pagesText.textContent = `${book.pages} pages`;
    } else if (parseInt(book.pages) === 1) {
        pagesText.textContent = `${book.pages} page`;
    }
    const readDiv = document.createElement('div');
    readDiv.classList.add('read-div');
    const readText = document.createElement('p');

    const readStatusBtn = document.createElement('button');
    readStatusBtn.classList.add('read-button');
    readStatusBtn.textContent = "Edit";
    
    readStatusBtn.addEventListener("click", () => {
        if(book.isRead) {
            book.isRead = false;
            readText.textContent = 'Not read';
        } else {
            book.isRead = true;
            readText.textContent = 'Read';
        }
    });
    
    if (book.isRead) {
        readText.textContent = 'Read';
    } else {
        readText.textContent = 'Not read';
    }
    
    readDiv.appendChild(readText);
    readDiv.appendChild(readStatusBtn);
    bookCard.appendChild(titleHeader);
    bookCard.appendChild(authorText);
    bookCard.appendChild(pagesText);
    bookCard.appendChild(readDiv);
    libraryGrid.appendChild(bookCard);
}

