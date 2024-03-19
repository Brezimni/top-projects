let myLibrary = [];

function Book(title, author, year) {
this.title = title;
this.author = author;
this.year = year;
}

function toggleModal(toggle) {
    const modal = document.querySelector('.overlay');
    if(toggle === 'on') {
        const inputFocus = document.getElementById('book-title');
        modal.classList.remove('closed');
        inputFocus.focus();
    } else if(toggle === true || toggle.target.classList.contains('overlay')) {
        modal.classList.add('closed');
    } else {
        return;
    }
}

function setTableStats(library = myLibrary) {
    const [titles, authors] = [document.getElementById('num-titles'), document.getElementById('num-authors')];
    const uniqueAuthors = [];
    library.map(book => {
        if(uniqueAuthors.includes(book.author)) {return;}
        uniqueAuthors.push(book.author)
    });
    titles.textContent = `${library.length} books`;
    authors.textContent = `by ${uniqueAuthors.length} authors`;
}

function addBookToLibrary(submit) {
  submit.preventDefault();
  const table = document.getElementById('tbody');
  const bookData = new FormData(submit.target);
  const newBook = new Book(bookData.get('title'), bookData.get('author'), bookData.get('year'));
  myLibrary.push(newBook);
  if(document.getElementById('local').checked) {
    window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }
  table.appendChild(generateTableRow(newBook));
  submit.target.reset();
  toggleModal(true);
  setTableStats();
}

function removeBookFromLibrary(whatToDelete) {
    if(whatToDelete === 'clear') {
        if(!confirm('Do you wish to delete everything?')) {return;}
        window.localStorage.clear();
        myLibrary = [];
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        setTableStats();

    } else if(confirm('Do you wish to delete this book?')) {
        myLibrary.splice(whatToDelete.rowIndex-1, 1);
        window.localStorage.getItem('myLibrary') && window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary)); //Check if there even is local storage so that you don't unintentionally set it.
        whatToDelete.parentNode.removeChild(whatToDelete);
        setTableStats();
    }
}

/* Main functions responsible for building the table */
function generateTableRow(bookObject) {
    let newRow = document.createElement('tr');
        for (let [key, value] of Object.entries(bookObject)) {
            let newCell = document.createElement('td');
            newCell.textContent = value;
            newRow.appendChild(newCell);
        }
        let lastCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<img src="icons/trash.svg" alt="trash-icon">';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = (e) => removeBookFromLibrary(e.target.parentNode);
        newRow.appendChild(lastCell.appendChild(deleteButton));
        return newRow;
}

function buildTable(library) {
    const table = document.getElementById('tbody');
    table.innerHTML = '';
    for(let i = 0; i<library.length; i++) {
        table.appendChild(generateTableRow(library[i]));
    }
    setTableStats(library);
}

function filterLibrary(query) {
    const filteredLibrary = myLibrary.filter(book => {
        if(book.title.match(new RegExp(query, "i")) || book.author.match(new RegExp(query, "i")) || book.year.match(new RegExp(query, "i"))) {return true;
        } else {return false;}
    });
    buildTable(filteredLibrary);
}

let delayTimerId;

function delaySearch(search) {
    const table = document.getElementById('tbody');
    if(parseInt(search.value.length) === 0 && table.childNodes.length !== myLibrary.length) {buildTable(myLibrary)} // Rebuilds original table once search input is empty.
    if(parseInt(search.value.length) < 2 || myLibrary.length < 2) {return;}
    delayTimerId && clearTimeout(delayTimerId);
    delayTimerId = setTimeout(() => {
        filterLibrary(search.value)
        delayTimerId = null;
    }, 700);
}

(function initTable() {
    if(window.localStorage.getItem('myLibrary') === null) {return;}
    const libraryFromStorage = JSON.parse(window.localStorage.getItem('myLibrary'));
    myLibrary = [...libraryFromStorage];
    buildTable(myLibrary);
}());