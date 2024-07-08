// app.js
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Obtener tareas existentes
fetch('/tasks')
  .then(response => response.json())
  .then(tasks => {
    tasks.forEach(task => {
      addTaskToList(task);
    });
  });

// Agregar tarea al formulario
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const description = taskInput.value.trim();
  if (description !== '') {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description })
    });
    if (response.ok) {
      const task = await response.json();
      addTaskToList(task);
      taskInput.value = '';
    }
  }
});

// Función para agregar tarea a la lista
function addTaskToList(task) {
  const li = document.createElement('li');
  li.textContent = task.description;
  if (task.completed) {
    li.classList.add('completed');
  }
  taskList.appendChild(li);
}
