import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let alumnos = [];

app.get('/api/alumnos', (req, res) => {
  res.json(alumnos);
});

app.get('/api/alumnos/:id', (req, res) => {
  const alumno = alumnos.find(a => a.id == req.params.id);
  if (!alumno) return res.status(404).json({ error: 'No encontrado' });
  res.json(alumno);
});

app.post('/api/alumnos', (req, res) => {
  const nuevo = {
    id: alumnos.length + 1,
    nombre: req.body.nombre
  };
  alumnos.push(nuevo);
  res.status(201).json(nuevo);
});

app.put('/api/alumnos/:id', (req, res) => {
  const alumno = alumnos.find(a => a.id == req.params.id);
  if (!alumno) return res.status(404).json({ error: 'No encontrado' });
  alumno.nombre = req.body.nombre;
  res.json(alumno);
});

app.delete('/api/alumnos/:id', (req, res) => {
  alumnos = alumnos.filter(a => a.id != req.params.id);
  res.json({ mensaje: 'Eliminado' });
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});