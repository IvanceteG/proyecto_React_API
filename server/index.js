import express from 'express';

// Importa CORS, que permite que tu frontend pueda llamar a esta API
import cors from 'cors';

// Importa funciones para leer y escribir archivos desde Node
import { readFileSync, writeFileSync } from 'fs';

// Crea la aplicación Express
const app = express();

// Activa CORS para permitir peticiones desde React
app.use(cors());
app.use(express.json());

// La ruta del archivo donde guardas los alumnos
const DB_PATH = './src/data/alumnos.json';

// Es la función que lee el archivo alumnos.json y devuelve el array de alumnos
function loadData() {
  // Lee el archivo como texto
  const raw = readFileSync(DB_PATH, 'utf-8');

  // Esto convierte el texto JSON en un objeto y devuelve solo el array "alumnos"
  return JSON.parse(raw).alumnos;
}

// Es la función que guarda el array de alumnos dentro del archivo alumnos.json
function saveData(alumnos) {
  // Convierte el array en JSON y lo escribe en el archivo
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