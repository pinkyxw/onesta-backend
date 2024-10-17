import express from 'express';
import farmerRoutes from './interfaces/routes/farmerRoutes';
import csvRoutes from './interfaces/routes/csvRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => { res.send('Hello world'); });
app.use('/api/farmers', farmerRoutes);
app.use('/api/csv', csvRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
