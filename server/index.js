import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '../src/data/alumnos.json');

const app = express();
app.use(cors());
app.use(express.json());

let nextId = null;

function loadData() {
  const raw = JSON.parse(readFileSync(DB_PATH, 'utf-8'));
  const alumnos = Array.isArray(raw) ? raw : (raw.alumnos ?? []);
  if (nextId === null) {
    nextId = alumnos.length > 0 ? Math.max(...alumnos.map((a) => a.id)) + 1 : 1;
  }
  return alumnos;
}

function saveData(alumnos) {
  writeFileSync(DB_PATH, JSON.stringify({ alumnos }, null, 2), 'utf-8');
}

app.get('/', (req, res) => {
  res.json({
    nombre: 'API de Gestió d\'Alumnes',
    version: '1.0.0',
    endpoints: [
      'GET    /api/alumnos',
      'GET    /api/alumnos/:id',
      'GET    /api/alumnos/buscar?q=texto',
      'GET    /api/alumnos/promocion/:promocion',
      'POST   /api/alumnos',
      'PUT    /api/alumnos/:id',
      'DELETE /api/alumnos/:id',
    ],
  });
});

app.get('/api/alumnos/buscar', (req, res) => {
  const q = (req.query.q ?? '').toLowerCase();
  if (!q) return res.status(400).json({ error: 'El paràmetre q és obligatori' });
  const alumnos = loadData();
  const resultats = alumnos.filter(
    (a) =>
      a.nombre.toLowerCase().includes(q) ||
      a.apellidos.toLowerCase().includes(q)
  );
  res.json(resultats);
});

app.get('/api/alumnos/promocion/:promocion', (req, res) => {
  const promo = req.params.promocion.toLowerCase();
  const alumnos = loadData();
  const resultats = alumnos.filter((a) =>
    a.promocion.toLowerCase().includes(promo)
  );
  res.json(resultats);
});

app.get('/api/alumnos', (req, res) => {
  res.json(loadData());
});

app.get('/api/alumnos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const alumno = loadData().find((a) => a.id === id);
  if (!alumno) return res.status(404).json({ error: 'Alumne no trobat' });
  res.json(alumno);
});

app.post('/api/alumnos', (req, res) => {
  const { nombre, apellidos, promocion, ciclo, urlImagen } = req.body;
  if (!nombre || !apellidos || !promocion || !ciclo || !urlImagen) {
    return res.status(400).json({ error: 'Tots els camps són obligatoris' });
  }
  const alumnos = loadData();
  const nou = { id: nextId++, nombre, apellidos, promocion, ciclo, urlImagen };
  alumnos.push(nou);
  saveData(alumnos);
  res.status(201).json(nou);
});

app.put('/api/alumnos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const alumnos = loadData();
  const index = alumnos.findIndex((a) => a.id === id);
  if (index === -1) return res.status(404).json({ error: 'Alumne no trobat' });
  alumnos[index] = { ...alumnos[index], ...req.body, id };
  saveData(alumnos);
  res.json(alumnos[index]);
});

app.delete('/api/alumnos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const alumnos = loadData();
  const index = alumnos.findIndex((a) => a.id === id);
  if (index === -1) return res.status(404).json({ error: 'Alumne no trobat' });
  const eliminat = alumnos.splice(index, 1)[0];
  saveData(alumnos);
  res.json({ missatge: 'Alumne eliminat correctament', alumne: eliminat });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});
