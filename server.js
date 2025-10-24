
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/api/doctors', (req, res) => {
  const search = req.query.search || '';
  const value = `%${search}%`;

  const query = `
    SELECT * FROM doctors
    WHERE name LIKE ? OR specialization LIKE ? OR location LIKE ?
  `;

  db.all(query, [value, value, value], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(rows);
    }
  });
});


const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
