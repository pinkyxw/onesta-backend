import express from 'express';
import farmerRoutes from './interfaces/routes/farmerRoutes';
import fruitRoutes from './interfaces/routes/fruitRoutes';
import varietyRoutes from './interfaces/routes/varietyRoutes';
import clientRoutes from './interfaces/routes/clientRoutes';
import harvestRoutes from './interfaces/routes/harvestRoutes';
import csvRoutes from './interfaces/routes/csvRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => { res.send('Hello farmer!'); });
app.use('/api/farmers', farmerRoutes);
app.use('/api/fruits', fruitRoutes);
app.use('/api/varieties', varietyRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/harvest', harvestRoutes);
app.use('/api/csv', csvRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
