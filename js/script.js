document.addEventListener('DOMContentLoaded', ()=>{
  let todoForm = document.querySelector('form');
  let todoList = document.querySelector('.todo-list');

  const createListItem = (todoObj) => {
    // Create the elements making up a todo item
    const listItem = document.createElement('li');
    const todoTitle = document.createElement('span');
    const deleteButton = document.createElement('button');

    // Add classes to elements for styling
    listItem.classList.add("todo-list__item");
    todoTitle.classList.add("todo-list__item__title");

    todoTitle.innerText = todoObj.title;

    deleteButton.classList.add("button");
    deleteButton.classList.add("button--todo");
    deleteButton.classList.add("button--delete");
    deleteButton.innerText = "Delete";

    // Add elements to listItem
    listItem.appendChild(todoTitle);
    listItem.appendChild(deleteButton);

    if(todoObj.completed) todoTitle.style.textDecoration = "line-through";

    // Add the list item to the todo-list on the DOM
    todoList.appendChild(listItem);

    // Add a click event listener to todoTitle
    todoTitle.addEventListener("click", () => {
      todoTitle.style.textDecoration = "line-through";

      fetch(`http://127.0.0.1:3000/todos/${todoObj.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          completed: true
        })
      })
    });

    // Add event listener to the deleteButton

  }

  // GET - Read
  fetch('http://127.0.0.1:3000/todos')
    .then(res => res.json())
    .then(todos => {
      todos.forEach(todo => {
        console.log(todo);
        createListItem(todo);
      });
    });

  
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputElem = document.getElementById('input--add');

    // createListItem(inputElem.value);
  
    // POST - Create
    // Add todo item to the database
    fetch('http://127.0.0.1:3000/todos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: inputElem.value,
        completed: false
      })
    }).then(res => res.json())
      .then(todo => createListItem(todo));

    todoForm.reset(); // Clears the form fields
  })

});