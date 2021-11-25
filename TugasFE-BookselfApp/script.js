const LOCAL_STORAGE_KEY = 'BOOKSHELF_APPS';
let BOOKSHELF_APPS = [];
// let BOOKSHELF_STRINGFY = JSON.stringify(BOOKSHELF_APPS);

function CHECKSTORAGE() {
    return typeof Storage !== undefined;
}

if (CHECKSTORAGE()) {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null ) {
        BOOKSHELF_APPS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    }else {
        BOOKSHELF_APPS = [];
    }
    localStorage.setItem(localStorage, JSON.stringify(BOOKSHELF_APPS));
}


const incompleteBookshelfListId = 'incompleteBookshelfList';
const completeBookshelfListId = 'completeBookshelfList';
function BOOKDISPLAY(BOOKSHELF_APPS) {
    const incompleteBookshelfList = document.getElementById(incompleteBookshelfListId);
    const completeBookshelfList = document.getElementById(completeBookshelfListId);
    
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    for (const BOOK of BOOKSHELF_APPS.keys()) {
        const BOOKITEM = document.createElement('div');
        BOOKITEM.classList.add('book_item');

        const BOOKTITLE = document.createElement('h2');
        BOOKTITLE.innerHTML = BOOKSHELF_APPS[BOOK].title;
        
        const BOOKAUTHOR = document.createElement('p');
        BOOKAUTHOR.innerHTML = 'Penulis: '+BOOKSHELF_APPS[BOOK].author;
        
        const BOOKYEAR = document.createElement('h2');
        BOOKYEAR.innerHTML = 'Tahun: '+BOOKSHELF_APPS[BOOK].year;

        const BOOKACTION = document.createElement('div');
        BOOKACTION.classList.add('action');

        const BUTTONCOMPLETE = document.createElement('button');

        if (BOOKSHELF_APPS[BOOK].isComplete == true) {
            BUTTONCOMPLETE.classList.add("green");
            BUTTONCOMPLETE.setAttribute('id', BOOKSHELF_APPS[BOOK].id);
            BUTTONCOMPLETE.innerHTML = "Belum Selesai Dibaca";
            BUTTONCOMPLETE.addEventListener("click", function() {
                unfinishedRead(BOOK);
            });
        } else {
            BUTTONCOMPLETE.classList.add("green");
            BUTTONCOMPLETE.setAttribute('id', BOOKSHELF_APPS[BOOK].id);
            BUTTONCOMPLETE.innerHTML = "Selesai Dibaca";
            BUTTONCOMPLETE.addEventListener("click", function() {
                 finishedRead(BOOK);
            });
          }
        
        const BUTTONDELETE = document.createElement('button');
        BUTTONDELETE.setAttribute('id', BOOKSHELF_APPS[BOOK].id);
        BUTTONDELETE.classList.add('red');
        BUTTONDELETE.innerHTML = 'Hapus Buku';
        BUTTONDELETE.addEventListener("click", function (){
            DELETEBOOK(BOOK);
        })

        BOOKACTION.append(BUTTONCOMPLETE, BUTTONDELETE);
        BOOKITEM.append(BOOKTITLE, BOOKAUTHOR, BOOKYEAR, BOOKACTION);

        if (BOOKSHELF_APPS[BOOK].isComplete == true) {
            completeBookshelfList.append(BOOKITEM);
          } else {
            incompleteBookshelfList.append(BOOKITEM);
          }
    }
}

const BOOKSUBMIT = document.getElementById('bookSubmit');
BOOKSUBMIT.addEventListener('click', function(event){
    // e.preventDefault();

    const TITLE = document.getElementById('inputBookTitle').value;
    const AUTHOR = document.getElementById('inputBookAuthor').value;
    const YEAR = document.getElementById('inputBookYear').value;
    const ISCOMPLETE = document.getElementById('inputBookIsComplete').checked;

    let BOOKSHELF_OBJECT = {
        id: +new Date(),
        title: TITLE,
        author: AUTHOR,
        year: YEAR,
        isComplete: ISCOMPLETE
    }

    BOOKSHELF_APPS.push(BOOKSHELF_OBJECT);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(BOOKSHELF_APPS));

    BOOKDISPLAY(BOOKSHELF_APPS);
})

window.addEventListener("load", function () {
    if (CHECKSTORAGE) {
        BOOKDISPLAY(BOOKSHELF_APPS);
    } else {
      alert("Your browser isn't support web storage");
    }
});

const finishedRead = (BOOK) => {
    BOOKSHELF_APPS[BOOK].isComplete = true;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify (
        BOOKSHELF_APPS));
    BOOKDISPLAY(BOOKSHELF_APPS);
};

const unfinishedRead = (BOOK) => {
    BOOKSHELF_APPS[BOOK].isComplete = false;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(
        BOOKSHELF_APPS));
        BOOKDISPLAY(BOOKSHELF_APPS);
};

const DELETEBOOK = (BOOK) => {
    BOOKSHELF_APPS.splice(BOOK, 1);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify (BOOKSHELF_APPS));
    BOOKDISPLAY(BOOKSHELF_APPS);
};

const SEARCHBOOK = (kw) => {
    const FILTER = BOOKSHELF_APPS.filter(BOOK => BOOK.title.toLowerCase().includes(kw.toLowerCase()));
    BOOKDISPLAY(FILTER);
};

FORMSEACRHBOOK = document.getElementById("searchBook");
FORMSEACRHBOOK.addEventListener("submit", (event) => {
    const kw = document.querySelector("#searchBookTitle").value;
    event.preventDefault();
    SEARCHBOOK(kw);
})