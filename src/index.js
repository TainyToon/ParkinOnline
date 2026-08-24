import express from 'express';
import { PORT } from './config.js';
import parkingRoutes from './routes/parking.routes.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use(parkingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});