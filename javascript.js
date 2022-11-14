let library = [];
const libraryContainer = document.getElementById('bookTiles')
const addBook = document.getElementById('newBook');
const titleField = document.getElementById('title');
const authorField = document.getElementById('author');
const readField = document.getElementById('read')
const notesField = document.getElementById('notes');

addBook.addEventListener('click', (e) => {
  //this is testing content
  e.preventDefault();
  addToLibrary(new Book(titleField.value, authorField.value, readField.checked, notesField.value))
  titleField.value=''
   authorField.value=''
    readField.checked=false
     notesField.value=''
});

class Book {
  constructor(title, author, read, notes) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.notes = notes;
  }
}

function addToLibrary(book) {
  library.push(book)
  refreshTiles();
}

function refreshTiles() {
  //delete all tiles, then draw tiles for everything in library[]
  libraryContainer.replaceChildren();
  for (let i = 0; i < library.length; i++) {
    generateTile(i);
  }
}

function generateTile(i) {
  //draw a tile based on the properties of library[i]
  let book = library[i];
  let tile = document.createElement('div');
  tile.classList.add('bookTile');
  tile.id=('book'+i)


  //create control buttons
  let buttons = document.createElement('div');
  buttons.style.gridArea='1/2/2/3'
  buttons.style.display='flex'
  buttons.style.gap='8px'
  tile.append(buttons)
  let readButton = document.createElement('img');
  readButton.src='./images/book.svg';
  buttons.append(readButton)
  readButton.addEventListener('click', (e)=>{
    library[i].read=!library[i].read;
    refreshTiles();
  })
  let closeButton = document.createElement('img');
  closeButton.src='./images/close.svg';
  buttons.append(closeButton)
  closeButton.addEventListener('click', (e)=>{
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
    library.splice(i,1);
  })

  //create datadivs in tile
  let titleBox = document.createElement('div');
  titleBox.classList.add('dataRow');
  titleBox.style.gridArea='2/1/3/3'
  tile.append(titleBox);
  let titleLabel = document.createElement('div');
  titleLabel.innerText = "Title:";
  titleBox.append(titleLabel);
  let titleData = document.createElement('div');
  titleData.innerText = book.title;
  titleBox.append(titleData);

  let authorBox = document.createElement('div');
  authorBox.classList.add('dataRow');
  authorBox.style.gridArea='3/1/4/3'
  tile.append(authorBox);
  let authorLabel = document.createElement('div');
  authorLabel.innerText = "Author:";
  authorBox.append(authorLabel);
  let authorData = document.createElement('div');
  authorData.innerText = book.author;
  authorBox.append(authorData);

  let readBox = document.createElement('div');
  readBox.classList.add('dataRow');
  readBox.style.gridArea='4/1/5/3'
  tile.append(readBox);
  let readLabel = document.createElement('div');
  readLabel.innerText = "Read?:";
  readBox.append(readLabel);
  let readData = document.createElement('div');
  readData.innerText = book.read;
  readBox.append(readData);

  let notesBox = document.createElement('div');
  notesBox.classList.add('dataRow');
  notesBox.style.gridArea='5/1/6/3'
  tile.append(notesBox);
  let notesLabel = document.createElement('div');
  notesLabel.innerText = "Notes:";
  notesBox.append(notesLabel);
  let notesData = document.createElement('div');
  notesData.innerText = book.notes;
  notesBox.append(notesData);


  libraryContainer.append(tile);
}
