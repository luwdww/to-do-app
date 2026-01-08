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
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
}

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
}

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const text = input.value.trim();

  if (!text) return;

  addTask(text);

  input.value = '';

  renderTasks();
});
