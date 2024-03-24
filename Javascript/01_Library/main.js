function Book(title, author, year) {
this.title = title;
this.author = author;
this.year = year;
}

const library = (function() {
    const myLibrary = {
        bookCollection: [],
        init: function() {
            this.cacheDom();
            if(window.localStorage.getItem('myLibrary') === null) {return;}
            const getLocalStorage = JSON.parse(window.localStorage.getItem('myLibrary'))
            this.bookCollection = [...getLocalStorage];
            this.render(this.bookCollection);
        },
        cacheDom: function() {
            this.tableContent = document.getElementById('table-content');
            [this.titles, this.authors] = [document.getElementById('num-titles'), document.getElementById('num-authors')];
            this.localStorageCheckbox = document.getElementById('local');
        },
        render: function(books) {
            this.tableContent.innerHTML = '';
            for(let i = 0; i<books.length; i++) {
            this.tableContent.appendChild(this.generateTableRow(books[i]));
            }
            this.setTableStats(books); 
        },
        generateTableRow: function(bookData) {
            let newRow = document.createElement('tr');
                Object.values(bookData).forEach(value => {
                    let newCell = document.createElement('td');
                    newCell.textContent = value;
                    newRow.appendChild(newCell);
                });
                let lastCell = document.createElement('td');
                let deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<img src="icons/trash.svg" alt="trash-icon">';
                deleteButton.classList.add('delete-button');
                deleteButton.onclick = (e) => this.removeBookFromLibrary(e.target.parentNode);
            newRow.appendChild(lastCell.appendChild(deleteButton));
            return newRow;
        },
        addBookToLibrary: function(newEntry, ) {
            newEntry.preventDefault();
                const bookData = new FormData(newEntry.target);
                const newBook = new Book(bookData.get('title'), bookData.get('author'), bookData.get('year'));
                this.bookCollection.push(newBook);
                if(this.localStorageCheckbox.checked) {
                    window.localStorage.setItem('myLibrary', JSON.stringify(this.bookCollection));
                }
                this.tableContent.appendChild(this.generateTableRow(newBook));
                newEntry.target.reset();
                toggleModal(true);
                this.setTableStats();
        },
        removeBookFromLibrary: function(toDelete) {
            if(toDelete === 'clear') {
                if(!confirm('Do you wish to delete everything?')) {return;}
                window.localStorage.clear();
                this.bookCollection = [];
                this.tableContent.innerHTML = '';
                this.setTableStats();
        
            } else if(confirm('Do you wish to delete this book?')) {
                this.bookCollection.splice(toDelete.rowIndex-1, 1);
                window.localStorage.getItem('myLibrary') && window.localStorage.setItem('myLibrary', JSON.stringify(this.bookCollection)); //Check if there even is local storage so that you don't unintentionally set it.
                toDelete.parentNode.removeChild(toDelete);
                this.setTableStats();
            }
        },
        setTableStats: function(books = this.bookCollection) {
            const uniqueAuthors = [];
                books.map(book => {
                    if(uniqueAuthors.includes(book.author)) {return;}
                    uniqueAuthors.push(book.author)
                });
                this.titles.textContent = `${books.length} books`;
                this.authors.textContent = `by ${uniqueAuthors.length} authors`;
        },
        delayTimerId: null,
        filterLibrary: function(search) {
            if(parseInt(search.value.length) === 0 && this.tableContent.childNodes.length !== this.bookCollection.length) {this.render(this.bookCollection)} // Rebuilds original table once search input is empty.
            if(parseInt(search.value.length) < 2 || this.bookCollection.length < 2) {return;}
            this.delayTimerId && clearTimeout(this.delayTimerId);
            this.delayTimerId = setTimeout(() => {
                console.log(this.bookCollection.filter(book => {
                    if(book.title.match(new RegExp(search.value, "i")) || book.author.match(new RegExp(search.value, "i")) || book.year.match(new RegExp(search.value, "i"))) {return true;
                    } else {return false;}
                }))
                this.render(this.bookCollection.filter(book => {
                    if(book.title.match(new RegExp(search.value, "i")) || book.author.match(new RegExp(search.value, "i")) || book.year.match(new RegExp(search.value, "i"))) {return true;
                    } else {return false;}
                }));
                this.delayTimerId = null;
    }, 700);
        }
    }
    myLibrary.init();
    return { addBookToLibrary: (book) => {myLibrary.addBookToLibrary(book)}, removeBookFromLibrary: (book) => {myLibrary.removeBookFromLibrary(book)}, filterLibrary: (query) => {myLibrary.filterLibrary(query)} };
})();

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