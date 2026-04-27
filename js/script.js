let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 0;

function setDate() {
  const now = new Date();
  const day = now.toLocaleString('en', { weekday: 'long' });
  const date = now.getDate();
  const month = now.toLocaleString('en', { month: 'long' });
  document.getElementById('date-box').innerHTML = day + '<br>' + date + '<br>' + month;
}

setDate();

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  const list = document.getElementById('list');

  list.innerHTML = tasks.map(t => `
    <div class="task-item ${t.done ? 'done' : ''}">
      <img class="circle-img" src="${t.done ? 'circle-check.png' : 'circle.png'}" data-check="${t.id}" />
      <span class="task-text">${t.text}</span>
      <img class="del" src="del.png" data-del="${t.id}" />
    </div>
  `).join('');
  updateProgress();
}

function addTask() {
  const input = document.getElementById('inp');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ id: nextId++, text: text, done: false });
  input.value = '';
  saveTasks();
  render();
}

document.getElementById('add').addEventListener('click', addTask);

document.getElementById('inp').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addTask();
});

document.getElementById('list').addEventListener('click', function(e) {
  const checkId = e.target.dataset.check;
  const delId = e.target.dataset.del;

  if (checkId !== undefined) {
    const task = tasks.find(t => t.id == checkId);
    task.done = !task.done;
    saveTasks();
    render();
  }

  if (delId !== undefined) {
    tasks = tasks.filter(t => t.id != delId);
    saveTasks();
    render();
  }
});

function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-text').textContent = done + ' / ' + total + ' task done';
}

render();

