const newBookBtn = document.getElementById("new-book-button");
const submitBtn = document.getElementById("submit-button");
const formContainer =  document.querySelector("div.form-container");

newBookBtn.addEventListener("click", () => {
    showBookForm();
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
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead);
    library.push(newBook);
    console.table(library);
    formContainer.style.display = "none";
}

