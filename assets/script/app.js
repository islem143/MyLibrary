// declaration
const addBookBtn = document.querySelector("#addBook");
const listOfbooks = [];
//Event Listner
addBookBtn.addEventListener("click", toggleModal);

function toggleModal() {
  const modalAddBtn = document.querySelector(".addBtn");
  const cancelModalBtn = document.querySelector(".cancelBtn");
  const modal = document.querySelector(".addModal");
  const overlay = document.querySelector(".modal-overlay");
  modalAddBtn.addEventListener("click", addBook);
  cancelModalBtn.addEventListener("click", cancel);
  overlay.classList.toggle("closed");
  modal.classList.toggle("closed");
}

function Book(title, author, nbrPages, url) {
  this.id = Math.random();
  this.title = title;
  this.author = author;
  this.nbrPages = nbrPages;
  this.url = url;
}

function clearInput() {
  const modalInputs = document.querySelectorAll(".addModal input");
  modalInputs.forEach((elem) => {
    elem.value = "";
  });
}

function addBook() {
  let bookInfoAraay;
  let isInputValid;
  let book;
  let deleteBookButton;
  isInputValid = checkUserInput();
  if (!isInputValid) {
    return;
  }
  bookInfoAraay = getUserInput();

  [title, author, nbrPages, url] = bookInfoAraay;

  book = new Book(title, author, nbrPages, url);
  listOfbooks.push(book);
  renderBook(book.id, title, author, nbrPages, url);
  clearInput();
  toggleModal();
}

function renderBook(id, title, author, nbrPages, url) {
  let bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.innerHTML = `
            <div class="image">
                <img src="${url}" alt="">
            </div>
            <div class="info">
                <p>Title:<span class="spanOutput title">${title}</span></p>
                <p>Author:<span class="author spanOutput">${author}</span></p>
                <p>Number Of Pages:<span class="spanOutput nbrPages">${nbrPages}</span></p>
                <button class="btn deleteBtn">Delete</button>  
            </div>

`;
  container.appendChild(bookDiv);
  addListenerToDelete(bookDiv, id);
}

function addListenerToDelete(bookDiv, id) {
  deleteBookButton = bookDiv.querySelector("button");
  deleteBookButton.addEventListener(
    "click",
    deleteMovie.bind(this, bookDiv, id)
  );
}

function deleteMovie(bookDiv, id) {
  bookDiv.remove();
  deleteMovieFromList(id);
}

function deleteMovieFromList(id) {
  let index;
  index = listOfbooks.findIndex((e) => {
    return e.id == id;
  });
  listOfbooks.splice(index, 1);
}

function checkUserInput() {
  let inputIsEmpty;
  const modalInputs = document.querySelectorAll(".addModal input");
  const error = document.querySelector("#error");
  const errorText = "Please Fill The Inputs!";
  for (element of modalInputs) {
    if (element.value.trim() == "") {
      inputIsEmpty == true;
      error.textContent = errorText;

      return;
    }
  }
  if (inputIsEmpty) return false;
  else {
    return true;
  }
}

function getUserInput() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const nbrPages = document.querySelector("#nbrPages").value;
  const url = document.querySelector("#url").value;

  return [title, author, nbrPages, url];
}

function cancel() {
  error.textContent = "";
  clearInput();
  toggleModal();
}
