//Global HTML Elements
const addToDoButtonElement = document.getElementById("addToDo");
const toDoContainerElement = document.getElementById("toDoContainer");
const inputElement = document.getElementById("input");
let tasks = [];
let done;

//localStorage.clear();

//Create a new to do item on click
addToDoButtonElement.addEventListener("click", () => {
  if (inputElement.value.length > 0) {
    createToDo();
  }
});

function createToDo() {
  //creating a container for each element
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("to-do-div");
  toDoContainerElement.appendChild(toDoElement);

  //creating to do element for the text
  const toDoTextElement = document.createElement("p");
  toDoTextElement.classList.add("to-do-item");
  toDoTextElement.innerText = inputElement.value;
  toDoElement.appendChild(toDoTextElement);
  saveToDoList(inputElement.value);

  //creating remove button
  const removeButtonElement = document.createElement("button");
  removeButtonElement.classList.add("remove-button");
  removeButtonElement.innerText = "⌫";
  toDoElement.appendChild(removeButtonElement);

  //empty input after button has been pressed
  input.value = "";

  //Make the text have a line trough it to mark it as done
  toDoTextElement.addEventListener("click", () => {
    if (toDoTextElement.style.textDecoration !== "line-through") {
      toDoTextElement.style.textDecoration = "line-through";
      done = true;
    } else if (toDoTextElement.style.textDecoration === "line-through") {
      toDoTextElement.style.textDecoration = "none";
      done = false;
    }
  });

  //delete to-do items
  removeButtonElement.addEventListener("click", () => {
    toDoContainerElement.removeChild(toDoElement);

    //localstorage
    let deleteTaskValue = JSON.parse(localStorage.getItem("task"));
    deleteTaskValue.splice(
      deleteTaskValue.indexOf({ text: inputElement.value })
    );
    localStorage.setItem("task", JSON.stringify(deleteTaskValue));
    displayToDoList();
  });
}

function saveToDoList(text) {
  const task = {
    text: text,
    //done:
    //made it an object cause it might be useful for future additions
    //(e.g edit button or similar)
  };

  //Error checking
  if (localStorage.task === undefined) {
    localStorage.task = JSON.stringify([]);
  }

  //we save it here
  tasks = JSON.parse(localStorage.getItem("task"));
  tasks.push(task);
  localStorage.setItem("task", JSON.stringify(tasks));
  displayToDoList();
}

function displayToDoList() {
  if (localStorage.task !== undefined) {
    //remove it before displaying so we dont get doubles
    toDoContainerElement.innerHTML = "";

    let taskFromLS = JSON.parse(localStorage.getItem("task"));

    for (let task of taskFromLS) {
      //creating a container for each element
      const toDoElement = document.createElement("div");
      toDoElement.classList.add("to-do-div");
      toDoContainerElement.appendChild(toDoElement);

      //creating to do element for the text
      const toDoTextElement = document.createElement("p");
      toDoTextElement.classList.add("to-do-item");

      toDoTextElement.innerText = task.text;
      toDoElement.appendChild(toDoTextElement);

      //creating remove button
      const removeButtonElement = document.createElement("button");
      removeButtonElement.classList.add("remove-button");
      removeButtonElement.innerText = "⌫";
      toDoElement.appendChild(removeButtonElement);

      removeButtonElement.addEventListener("click", () => {
        toDoContainerElement.removeChild(toDoElement);

        //localstorage
        let deleteTaskValue = JSON.parse(localStorage.getItem("task"));
        deleteTaskValue.splice(
          deleteTaskValue.indexOf({ text: inputElement.value })
        );
        localStorage.setItem("task", JSON.stringify(deleteTaskValue));
        displayToDoList();
      });
    }
  }
}

function LoadHandler() {
  displayToDoList();
}
window.addEventListener("load", LoadHandler);
