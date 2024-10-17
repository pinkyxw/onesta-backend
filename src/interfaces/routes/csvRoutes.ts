import express from 'express';
import multer from 'multer';
import { parse } from 'csv-parse';
import fs from 'fs';
import { db } from '../../infrastructure/database/connection';
import * as schema from '../../infrastructure/database/schema';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const results: any[] = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        // Aquí deberías procesar los datos y guardarlos en la base de datos
        // Este es solo un ejemplo simplificado
        for (const row of results) {
          if (row.type === 'farmer') {
            await db.insert(schema.farmers).values(row);
          }
          // Añadir lógica similar para otros tipos de datos
        }
        res.status(200).json({ message: 'Data uploaded successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error processing CSV file' });
      } finally {
        // Eliminar el archivo temporal
        fs.unlinkSync(req.file!.path);
      }
    });
});

export default router;
