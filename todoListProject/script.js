let counter = 0;
document.getElementById("addButton").addEventListener("click", addTodo);
document.getElementById("cleanAllTodos").addEventListener("click", cleanAllTodos);
document.getElementById("searchTodos").addEventListener("keyup", search);
document.addEventListener("DOMContentLoaded", readToStorage);

function addTodo() {
    const element = document.querySelector(".todoList-add-input");
    const add = element.value;

    if (add != "") {
        counter++;
        const newElement = document.createElement("li");
        const addfrom = document.querySelector(".todoList-listTodos-todoList")
        const newButton = document.createElement("button");

        newButton.innerHTML = "&#10006";
        newButton.className = "todoList-listTodos-todoList-todos-clearButton";
        newButton.id = "clearButton"
        newButton.addEventListener("click", removeTodo);

        newElement.innerHTML = add;
        newElement.className = "todoList-listTodos-todoList-todos todoNo" + counter;

        addfrom.appendChild(newElement);
        newElement.appendChild(newButton);

        localStorage.setItem("Sayaç", counter);
        localStorage.setItem("Görev" + counter, element.value);

        element.value = "";
        element.focus();
    }
    else {
        alert("Bir görev eklemediniz!");
    }
}

function removeTodo(e) {
    button = e.target;
    element = button.parentNode;
    element.remove();

    let keyNo = element.className.charAt(element.className.length - 1);

    counter--;

    localStorage.setItem("Sayaç", counter);
    localStorage.removeItem("Görev" + keyNo);
}

function cleanAllTodos() {
    localStorage.clear();
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

function readToStorage() {
    let storageCounter = parseInt(localStorage.getItem("Sayaç"));
    for (let i = 1; i < 1000; i++) {
        if (typeof localStorage.getItem("Görev" + i) == "string") {
            const addfrom = document.querySelector(".todoList-listTodos-todoList")
            let newText = localStorage.getItem("Görev" + i);
            const newElement = document.createElement("li");
            const newButton = document.createElement("button");
            newButton.innerHTML = "&#10006";
            newButton.className = "todoList-listTodos-todoList-todos-clearButton";
            newButton.id = "clearButton";
            newButton.addEventListener("click", removeTodo);
            newElement.innerHTML = newText;
            newElement.className = "todoList-listTodos-todoList-todos todoNo" + i;
            addfrom.appendChild(newElement);
            newElement.appendChild(newButton);
        }
    }
}