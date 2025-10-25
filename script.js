const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const themeToggle = document.getElementById('themeToggle');

const urgencySelect = document.getElementById('urgency');
const sortSelect = document.getElementById('sortSelect');
let editTodo = null;

//  Create a new task element
function createTodoElement(todo) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkTask');
  checkbox.checked = todo.done;
  li.appendChild(checkbox);

  const p = document.createElement('p');
  p.textContent = todo.text;
  li.appendChild(p);

  

  const urgency = document.createElement('span');
  urgency.classList.add('urgency', todo.urgency.toLowerCase());
  urgency.textContent = todo.urgency;
  li.appendChild(urgency);

  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.classList.add("btn", "editBtn");
  li.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.classList.add("btn", "deleteBtn");
  li.appendChild(deleteBtn);

  todoList.appendChild(li);

  checkbox.addEventListener('change', () => {
    saveCompletionState();
    updateCount();
    checkAllDone();
  });

  updateCount();
}

//  Add or edit a task
function addTodo() {
  const inputText = inputBox.value.trim();
  const urgency = urgencySelect.value;

  if (inputText.length <= 0) {
    alert('You must write something in your to-do list!');
    return;
  }

  if (addBtn.value === "Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.previousElementSibling.textContent);
    editTodo.target.previousElementSibling.previousElementSibling.textContent = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
    saveCompletionState();
    smartSort();
    return;
  }

  const newTodo = { text: inputText, done: false, category, urgency };
  saveLocalTodos(newTodo);
  inputBox.value = "";
  smartSort();
}

//  Handle edit/delete
function updateTodo(e) {
  if (e.target.innerHTML === "Delete") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
    updateCount();
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
}

//  Local storage helpers
function saveLocalTodos(todo) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todoList.innerHTML = '';
  todos.forEach(todo => createTodoElement(todo));
  updateCount();
}

function deleteLocalTodos(todo) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todoText = todo.querySelector('p').textContent;
  todos = todos.filter(t => t.text !== todoText);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function editLocalTodos(oldText) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const index = todos.findIndex(t => t.text === oldText);
  if (index !== -1) {
    todos[index].text = inputBox.value;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function saveCompletionState() {
  const todos = [];
  document.querySelectorAll('#todoList li').forEach(li => {
    const text = li.querySelector('p').textContent;
    const done = li.querySelector('.checkTask').checked;
    const urgency = li.querySelector('.urgency').textContent;
    todos.push({ text, done, urgency });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

//  Progress tracker
function updateCount() {
  const totalTasks = document.querySelectorAll('#todoList li').length;
  const completedTasks = document.querySelectorAll('.checkTask:checked').length;
  document.getElementById('completedCount').textContent = completedTasks;
  document.getElementById('totalCount').textContent = totalTasks;
}

//  Confetti alert
function checkAllDone() {
  const total = document.querySelectorAll('#todoList li').length;
  const done = document.querySelectorAll('.checkTask:checked').length;
  if (total > 0 && done === total) alert('🎉 All tasks completed!');
}

//  Urgency ranking
function urgencyRank(level) {
  switch (level) {
    case 'High': return 3;
    case 'Medium': return 2;
    case 'Low': return 1;
    default: return 0;
  }
}

//  Sorting logic
sortSelect.addEventListener('change', (e) => {
  const sortValue = e.target.value;
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  if (sortValue === 'highToLow') {
    todos.sort((a, b) => urgencyRank(b.urgency) - urgencyRank(a.urgency));
  } else if (sortValue === 'lowToHigh') {
    todos.sort((a, b) => urgencyRank(a.urgency) - urgencyRank(b.urgency));
  } else if (sortValue === 'category') {
    todos.sort((a, b) => a.category.localeCompare(b.category));
  }

  localStorage.setItem('todos', JSON.stringify(todos));
  todoList.innerHTML = '';
  todos.forEach(todo => createTodoElement(todo));
  updateCount();
});

//  Smart sort (auto-sort on add/edit)
function smartSort() {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.sort((a, b) => urgencyRank(b.urgency) - urgencyRank(a.urgency));
  localStorage.setItem('todos', JSON.stringify(todos));
  todoList.innerHTML = '';
  todos.forEach(todo => createTodoElement(todo));
  updateCount();
}

//  Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? ' Light Mode' : ' Dark Mode';
});

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = ' Light Mode';
}

//  Random motivational quote
const quotes = [
  "Keep going, you’re doing great!",
  "Progress, not perfection!",
  "Small steps every day!",
  "Stay focused and crush it today!",
  "Dream big, work hard, stay humble!"
];
document.getElementById('quote').textContent = quotes[Math.floor(Math.random() * quotes.length)];

//  Initialize
document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);