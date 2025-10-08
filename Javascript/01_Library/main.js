class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}
class Library {
    constructor(localSave) {
        this.bookCollection = Array.isArray(localSave) ? localSave : [...localSave];
    }
    addBook = (info) => {
        this.bookCollection.push(new Book(info.get('title'), info.get('author'), info.get('year')));
    }
    removeBook = (book) => {
        if(book == null) {
            this.bookCollection = []
        } else {
            this.bookCollection.splice(book, 1);
        }
    }
    get stats() {
        const uniqueAuthors = []
        this.bookCollection.map(book => {
            if(uniqueAuthors.includes(book.author)) {return;}
            uniqueAuthors.push(book.author)
        });
        return {titles: this.bookCollection.length, authors: uniqueAuthors.length}
    }
    #delayTimerId = null;
    filterLibrary = (search, currentRows) =>     {
        if(parseInt(search.value.length) === 0 && currentRows !== this.bookCollection.length) {return this.bookCollection} // Rebuilds original table once search input is empty.
        else if(parseInt(search.value.length) < 2 || this.bookCollection.length < 2) {return;}
        this.#delayTimerId && clearTimeout(this.#delayTimerId);
        this.#delayTimerId = setTimeout(() => {
            this.#delayTimerId = null;
            return this.bookCollection.filter(book => {
                if(book.title.match(new RegExp(search.value, "i")) || book.author.match(new RegExp(search.value, "i")) || book.year.match(new RegExp(search.value, "i"))) {return true;
                } else {return false;}
            });
    }, 700);
    }
}
class Table {
    constructor() {
        this.tableContent = document.getElementById('table-content');
        this.titles = document.getElementById('num-titles'),
        this.authors =  document.getElementById('num-authors');
        this.localStorageCheckbox = document.getElementById('local');
    }
    render = (books) => {
        this.tableContent.innerHTML = '';
        for(let i = 0; i<books.length; i++) {
            this.tableContent.appendChild(this.generateTableRow(books[i]));
        }
        this.setTableStats(books); 
    }
    updateTable = (book) => {
        this.tableContent.appendChild(this.generateTableRow(book));
    }
    generateTableRow = (bookData) => {
        const newRow = document.createElement('tr');
            Object.values(bookData).forEach(info => {
                const newCell = document.createElement('td');
                newCell.textContent = info;
                newRow.appendChild(newCell);
            });
            const lastCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<img src="icons/trash.svg" alt="trash-icon">';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = (e) => manage.removeBook(e.target.parentNode);
        newRow.appendChild(lastCell.appendChild(deleteButton));
        return newRow;
    }
    setTableStats = (stats) => {
        this.titles.textContent = `${stats.titles} books`;
        this.authors.textContent = `by ${stats.authors} authors`;
    }
}
class Main {
    constructor() {
        this.library = new Library(
            window.localStorage.getItem('myLibrary') === null
            ? [] 
            : JSON.parse(window.localStorage.getItem('myLibrary')))
        this.table = new Table()
    }
    addBook = (formData) => {
        formData.preventDefault();
        const bookData = new FormData(formData.target);
        this.library.addBook(bookData)
        if(this.table.localStorageCheckbox.checked) {
            window.localStorage.setItem('myLibrary', JSON.stringify(this.library.bookCollection));
        }
        this.table.updateTable(this.library.bookCollection.at(-1))
        formData.target.reset();
        toggleModal(true);
        this.updateStats();
    }
    removeBook = (bookRow) => {
        if(bookRow === 'clear') {
            if(!confirm('Do you wish to delete everything?')) {return;}
            window.localStorage.clear();
            this.library.removeBook(null)
            this.table.render()
            this.updateStats()
    
        } else if(confirm('Do you wish to delete this book?')) {
            window.localStorage.getItem('myLibrary') && window.localStorage.setItem('myLibrary', JSON.stringify(this.bookCollection)); //Check if there even is local storage so that you don't unintentionally set it.
            this.library.removeBook(bookRow.rowIndex-1)
            bookRow.parentNode.removeChild(bookRow);
            this.updateStats()
        }
    }
    updateStats = () => {
        this.table.setTableStats(this.library.stats)
    }
    queryTable = (searchQuery) => {
        table.render(library.filterLibrary(searchQuery, table.tableContent.childNodes.length))
    }
}

// DOM manipulation
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

const manage = new Main()