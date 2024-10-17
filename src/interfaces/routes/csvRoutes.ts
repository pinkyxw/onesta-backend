import express from 'express';
import multer from 'multer';
import { parse } from 'csv-parse';
import fs from 'fs';
import { fruitRepository } from '../../infrastructure/repositories/fruitRepository';
import { varietyRepository } from '../../infrastructure/repositories/varietyRepository';

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
        
        for (const row of results) {
          console.log(row);

          // fruit
          let fruitResult: any = await fruitRepository.getByName(row.fruit);
          if (!fruitResult.length) {
            fruitResult = await fruitRepository.create({ name: row.fruit });
          }
          const fruit = fruitResult[0];

          // variety
          let varietyResult: any = await varietyRepository.getByName(row.variety);
          if (!varietyResult.length) {
            varietyResult = await varietyRepository.create({ name: row.variety, fruitId: fruit.id });
          }
          
        }
        res.status(200).json({ message: 'Data uploaded successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error processing CSV file' });
      } finally {
        fs.unlinkSync(req.file!.path);
      }
    });
});

export default router;
