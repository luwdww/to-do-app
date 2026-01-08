const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = [];

function addTask(text) {
  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });

  saveTasks();
};

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks();
};

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
};

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
};

function renderTasks() {
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;

    
    li.addEventListener('click', () => {
      toggleTask(task.id);
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(task.id);
      renderTasks();
    });

    li.append(span, deleteButton);
    list.appendChild(li);
  });
};

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const text = input.value.trim();

  if (!text) return;

  addTask(text);

  input.value = '';

  saveTasks();
  renderTasks();
});
