document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    savedTodos.forEach(todo => {
        addTodoToDOM(todo);
    });

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodo = {
            text: todoInput.value,
            completed: false
        };
        savedTodos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(savedTodos));
        addTodoToDOM(newTodo);
        todoInput.value = '';
    });

    function addTodoToDOM(todo) {
        const todoItem = document.createElement('li');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        todoItem.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button class="complete">Complete</button>
                <button class="delete">Delete</button>
            </div>
        `;
        todoList.appendChild(todoItem);

        todoItem.querySelector('.complete').addEventListener('click', () => {
            todo.completed = !todo.completed;
            localStorage.setItem('todos', JSON.stringify(savedTodos));
            todoItem.classList.toggle('completed');
        });

        todoItem.querySelector('.delete').addEventListener('click', () => {
            const index = savedTodos.indexOf(todo);
            savedTodos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(savedTodos));
            todoList.removeChild(todoItem);
        });
    }
});