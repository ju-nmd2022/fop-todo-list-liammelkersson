//ADD BUTTON
const toDoListContainerElement = document.getElementById("toDoListContainer");
const addButtonElememnt = document.getElementById("addButton");
addButtonElememnt.addEventListener("click", function () {
  const inputElement = document.getElementById("input");

  //Here we create a div for each new to-do item
  const toDoItemDivElement = document.createElement("div");
  toDoItemDivElement.classList.add("to-do-item-div");

  //Here we create a new to-do item with the users input
  const toDoItemElement = document.createElement("div");
  toDoItemElement.classList.add("item-input");
  toDoItemElement.innerText = inputElement.value;
  toDoItemDivElement.appendChild(toDoItemElement);

  //Here we do the same but with a remove and done button for each item
  const doneItemElement = document.createElement("button");
  doneItemElement.classList.add("item-done-button");
  doneItemElement.innerText = "✅";
  toDoItemDivElement.appendChild(doneItemElement);

  const removeItemElement = document.createElement("button");
  removeItemElement.classList.add("item-remove-button");
  removeItemElement.innerText = "❌";
  toDoItemDivElement.appendChild(removeItemElement);

  //Add new to-do item to the actual list
  toDoListContainerElement.appendChild(toDoItemDivElement);

  //Reset the input fields value
  inputElement.value = "";
});

//CLEAR LIST
const clearButtonElement = document.getElementById("clearButton");
clearButtonElement.addEventListener("click", clearList());

function clearList() {
  const toDoListElement = document.querySelector(".to-do-list-container");
  toDoListElement.innerHTML = "";
}
