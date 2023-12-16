import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import db from './dbConfig.mjs';

const router = express.Router();

// Endpoint untuk menambahkan data pekerjaan ke database
router.post('/pekerjaan', (req, res) => {
  const { Job_name, Location, Description, Requirements, Salary, Company } = req.body;
  const insertQuery = `INSERT INTO pekerjaan (Job_name, Location, Description, Requirements, Salary, Company) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    insertQuery,
    [Job_name, Location, Description, Requirements, Salary, Company],
    (err, result) => {
      if (err) {
        console.error('Error adding job:', err);
        res.status(500).send('Terjadi kesalahan saat menambahkan data pekerjaan');
      } else {
        res.status(201).send('Data pekerjaan berhasil ditambahkan');
      }
    }
  );
});

// Endpoint untuk mendapatkan semua data pekerjaan
router.get('/pekerjaan', (req, res) => {
  const query = 'SELECT * FROM pekerjaan';

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

export default router;