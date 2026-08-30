import express from 'express';
import { PORT } from './config.js';
import parkingRoutes from './routes/parking.routes.js';
import parkingSpaceRoutes from './routes/parkingSpace.routes.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

//Parking routes
app.use('/api/parking', parkingRoutes);
//Parking Space routes
app.use('/api/parking-spaces', parkingSpaceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});