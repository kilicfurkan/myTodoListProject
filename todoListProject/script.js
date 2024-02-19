document.getElementById("addButton").addEventListener("click", addTodo);
document.getElementById("cleanAllTodos").addEventListener("click", cleanAllTodos);
document.getElementById("searchTodos").addEventListener("keyup", search);
document.addEventListener("DOMContentLoaded", readFromStorage);

function createButton() {
    const newButton = document.createElement("button");

    newButton.innerHTML = "&#10006";
    newButton.className = "todoList-listTodos-todoList-todos-clearButton";
    newButton.id = "clearButton";
    newButton.addEventListener("click", removeTodo);

    return newButton;
}

function readCounter() {
    return parseInt(localStorage.getItem("Counter"));
}

function incrementCounter() {
    localStorage.setItem("Counter", readCounter() + 1);
}

function addToStorage(key, value) {
    localStorage.setItem(key, value);
}

function addListItem(parentElement, targetElement, childElement) {
    parentElement.appendChild(targetElement);
    targetElement.appendChild(childElement);
}

function addTodo() {
    const element = document.querySelector(".todoList-add-input");
    const add = element.value;

    if (add != "") {
        incrementCounter();

        const newElement = document.createElement("li");
        const addfrom = document.querySelector(".todoList-listTodos-todoList")
        const newButton = createButton();

        newElement.innerHTML = add;
        newElement.className = "todoList-listTodos-todoList-todos todoNo" + readCounter();

        addListItem(addfrom, newElement, newButton);

        let keyName = newElement.className.split(" ").slice(1);

        addToStorage(keyName[0], element.value);

        element.value = "";
        element.focus();
    }
    else {
        alert("You haven't added a task!");
    }
}

function removeTodo(e) {
    button = e.target;
    element = button.parentNode;
    element.remove();

    let keyName = element.className.split(" ").slice(1);

    localStorage.removeItem(keyName[0]);
}

function cleanAllTodos() {
    localStorage.clear();
    addToStorage("Counter", 0);
    document.querySelector(".todoList-listTodos-todoList").innerHTML = "";
    counter = 0;

}

function search(e) {
    let filterValue = e.target.value.toLowerCase().trim();
    let todoList = document.querySelectorAll(".todoList-listTodos-todoList-todos");

    if (todoList.length > 0) {
        todoList.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display: flex");
            }
            else {
                todo.setAttribute("style", "display: none");
            }
        });
    }
}

function readFromStorage() {

    if (isNaN(readCounter())) {
        addToStorage("Counter", 0);
    }

    let counter = readCounter();

    for (let i = 1; i < 1000; i++) {

        if (typeof localStorage.getItem("todoNo" + i) == "string") {

            const addfrom = document.querySelector(".todoList-listTodos-todoList")
            let newText = localStorage.getItem("todoNo" + i);
            const newElement = document.createElement("li");
            const newButton = createButton();

            newElement.innerHTML = newText;
            newElement.className = "todoList-listTodos-todoList-todos todoNo" + i;

            addListItem(addfrom, newElement, newButton);
        }
    }
}