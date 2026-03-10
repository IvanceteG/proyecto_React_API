import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = './src/data/alumnos.json';

function loadData() {
  const raw = readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw).alumnos;
}

function saveData(alumnos) {
  writeFileSync(DB_PATH, JSON.stringify({ alumnos }, null, 2));
}

app.get('/api/alumnos', (req, res) => {
  res.json(loadData());
});

app.get('/api/alumnos/:id', (req, res) => {
  const alumnos = loadData();
  const alumno = alumnos.find(a => a.id == req.params.id);
  if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
  res.json(alumno);
});

app.post('/api/alumnos', (req, res) => {
  const alumnos = loadData();
  const nuevo = {
    id: alumnos.length > 0 ? Math.max(...alumnos.map(a => a.id)) + 1 : 1,
    ...req.body
  };
  alumnos.push(nuevo);
  saveData(alumnos);
  res.status(201).json(nuevo);
});

app.put('/api/alumnos/:id', (req, res) => {
  const alumnos = loadData();
  const index = alumnos.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Alumno no encontrado' });
  alumnos[index] = { ...alumnos[index], ...req.body };
  saveData(alumnos);
  res.json(alumnos[index]);
});

app.delete('/api/alumnos/:id', (req, res) => {
  const alumnos = loadData();
  const index = alumnos.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Alumno no encontrado' });
  const eliminado = alumnos.splice(index, 1)[0];
  saveData(alumnos);
  res.json({ mensaje: 'Alumno eliminado', alumno: eliminado });
});

app.listen(3000, () => {
  console.log('Servidor funcionando en http://localhost:3000');
});