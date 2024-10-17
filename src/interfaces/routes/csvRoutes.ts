import express from 'express';
import multer from 'multer';
import { parse } from 'csv-parse';
import fs from 'fs';
import { fruitRepository } from '../../infrastructure/repositories/fruitRepository';
import { varietyRepository } from '../../infrastructure/repositories/varietyRepository';
import { clientRepository } from '../../infrastructure/repositories/clientRepository';
import { farmerRepository } from '../../infrastructure/repositories/farmerRepository';
import { fieldRepository } from '../../infrastructure/repositories/fieldRepository';
import { harvestRepository } from '../../infrastructure/repositories/harvestRepository';

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
          const variety = varietyResult[0];

          // client
          let clientResult: any = await clientRepository.getByEmail(row.clientEmail);
          if (!clientResult.length) {
            clientResult = await clientRepository.create({ name: row.clientName, email: row.clientEmail });
          }
          const client = clientResult[0];

          // farmer 
          let farmerResult: any = await farmerRepository.findByEmail(row.farmerEmail);
          if (!farmerResult.length) {
            farmerResult = await farmerRepository.create({ name: row.farmerName, email: row.farmerEmail });
          }
          const farmer = farmerResult[0];

          // field
          let fieldResult: any = await fieldRepository.findByNameAndLocation(row.fieldName, row.fieldLocation);
          if (!fieldResult.length) {
            fieldResult = await fieldRepository.create({ name: row.fieldName, location: row.fieldLocation, farmerId: farmer.id });
          }
          const field = fieldResult[0];

          // harvest
          await harvestRepository.create({ 
            date: row.date,
            amount: row.amount,
            varietyId: variety.id,
            fieldId: field.id,
            clientId: client.id
          });
          
        }
        res.status(200).json({ message: 'Data uploaded successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing CSV file' });
      } finally {
        fs.unlinkSync(req.file!.path);
      }
    });
});

export default router;
