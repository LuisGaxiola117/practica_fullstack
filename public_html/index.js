const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public_html'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public_html/to_do_list.html'));

const tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { description } = req.body;
  const taskId = Date.now().toString(); 
  tasks.push({ id: taskId, description, completed: false });
  res.status(201).json({ message: 'Tarea agregada correctamente' });
});

app.put('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }
  task.completed = true;
  res.json({ message: 'Tarea marcada como completada' });
});

app.delete('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }
  tasks.splice(index, 1);
  res.json({ message: 'Tarea eliminada correctamente' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
