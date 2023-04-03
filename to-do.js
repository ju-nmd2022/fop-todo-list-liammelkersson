//HTML Elements
const addToDoButtonElement = document.getElementById("addToDo");
const toDoContainerElement = document.getElementById("toDoContainer");
const inputElement = document.getElementById("input");

//Functionality
addToDoButtonElement.addEventListener("click", () => {
  //creating a container for each element
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("to-do-div");
  toDoContainerElement.appendChild(toDoElement);

  //creating to do element for the text
  const toDoTextElement = document.createElement("p");
  toDoTextElement.classList.add("to-do-item");
  toDoTextElement.innerText = inputElement.value;
  toDoElement.appendChild(toDoTextElement);

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
    } else if (toDoTextElement.style.textDecoration === "line-through") {
      toDoTextElement.style.textDecoration = "none";
    }
  });

  //delete to-do items
  removeButtonElement.addEventListener("click", () => {
    toDoContainerElement.removeChild(toDoElement);
  });
});
