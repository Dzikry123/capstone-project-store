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

// Endpoint untuk mengedit data pekerjaan berdasarkan ID
router.put('/pekerjaan/:id', (req, res) => {
  const jobId = req.params.id;
  const { Job_name, Location, Description, Requirements, Salary, Company } = req.body;
  const updateQuery = `
    UPDATE pekerjaan
    SET Job_name = ?, Location = ?, Description = ?, Requirements = ?, Salary = ?, Company = ?
    WHERE id = ?
  `;

  db.query(
    updateQuery,
    [Job_name, Location, Description, Requirements, Salary, Company, jobId],
    (err, result) => {
      if (err) {
        console.error('Error updating job:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Periksa apakah ada baris yang terupdate (affected rows > 0)
        if (result.affectedRows > 0) {
          res.json({ message: 'Data pekerjaan berhasil diperbarui' });
        } else {
          res.status(404).json({ error: 'Data pekerjaan tidak ditemukan' });
        }
      }
    }
  );
});


// Endpoint untuk menghapus data pekerjaan dari database berdasarkan ID
router.delete('/pekerjaan/:id', (req, res) => {
  const jobId = req.params.id;
  const deleteQuery = 'DELETE FROM pekerjaan WHERE id = ?';

  db.query(deleteQuery, [jobId], (err, result) => {
    if (err) {
      console.error('Error deleting job:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Periksa apakah ada baris yang terhapus (affected rows > 0)
      if (result.affectedRows > 0) {
        res.json({ message: 'Data pekerjaan berhasil dihapus' });
      } else {
        res.status(404).json({ error: 'Data pekerjaan tidak ditemukan' });
      }
    }
  });
});

export default router;
