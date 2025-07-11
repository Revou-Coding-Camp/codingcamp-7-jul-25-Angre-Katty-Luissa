const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const statusFilter = document.getElementById("statusFilter");
const filterDateInput = document.getElementById("filterDateInput");
const searchInput = document.getElementById("searchInput");

let todos = [];

function renderTodos(data = todos) {
  todoList.innerHTML = "";
  if (data.length === 0) {
    todoList.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
    return;
  }

  data.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "Done" : "Pending"}</td>
      <td>
        <button class="check-btn" onclick="toggleStatus(${index})">✔</button>
        <button class="edit-btn" onclick="editTodo(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteTodo(${index})">🗑️</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function addTodo() {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Task and Date must be filled!");
    return;
  }

  todos.push({ task, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function editTodo(index) {
  const newTask = prompt("Edit task name:", todos[index].task);
  const newDate = prompt("Edit due date (yyyy-mm-dd):", todos[index].date);

  if (newTask && newDate) {
    todos[index].task = newTask.trim();
    todos[index].date = newDate;
    renderTodos();
  } else {
    alert("Edit cancelled or invalid input.");
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteAll() {
  todos = [];
  renderTodos();
}

function filterTodos() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  const selectedDate = filterDateInput.value;

  let filtered = todos;

  if (selectedStatus === "done") {
    filtered = filtered.filter(todo => todo.done);
  } else if (selectedStatus === "pending") {
    filtered = filtered.filter(todo => !todo.done);
  }

  if (selectedDate) {
    filtered = filtered.filter(todo => todo.date === selectedDate);
  }

  if (keyword) {
    filtered = filtered.filter(todo =>
      todo.task.toLowerCase().includes(keyword)
    );
  }

  renderTodos(filtered);
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterTodos);

renderTodos();
