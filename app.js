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
    const readStatusBtn = document.createElement('button');
    readStatusBtn.classList.add('read-button');
    readStatusBtn.textContent = "Edit";
    
    readStatusBtn.addEventListener("click", () => {
        if(book.isRead) {
            book.isRead = false;
            readStatusBtn.textContent = 'Not read';
            readStatusBtn.classList.remove('book-read');
        } else {
            book.isRead = true;
            readStatusBtn.textContent = 'Read';
            readStatusBtn.classList.add('book-read');
        }
    });
    
    if (book.isRead) {
        readStatusBtn.textContent = 'Read';
        readStatusBtn.classList.add('book-read');
    } else {
        readStatusBtn.textContent = 'Not read';
    }
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-style');
    deleteBtn.setAttribute('type','button');
    deleteBtn.textContent = "X";
    
    deleteBtn.addEventListener("click", () => {    
        const searchIndex = library.findIndex((el) => el.title === book.title);
        library.splice(searchIndex, 1);
        bookCard.remove();
    });
    
    readDiv.appendChild(readStatusBtn);
    bookCard.appendChild(titleHeader);
    bookCard.appendChild(authorText);
    bookCard.appendChild(pagesText);
    bookCard.appendChild(readDiv);
    bookCard.appendChild(deleteBtn);
    libraryGrid.appendChild(bookCard);
}

//generate books to populate the library
const tempBook1 = new Book('Beyond Good and Evil', 'Friedrich Nietzsche', 240, false);
library.push(tempBook1);
generateCard(library[0]);
const tempBook2 = new Book('Necronomicon: The Best Weird Tales of H.P. Lovecraft', 'H.P. Lovecraft', 878, true);
library.push(tempBook2);
generateCard(library[1]);
const tempBook3 = new Book('The Silence of the Lambs', 'Thomas Harris', 352, true);
library.push(tempBook3);
generateCard(library[2]);
