import {Router} from 'express';
import {getParking, getParkingById, createParking, deleteParking, updateParking} from '../controllers/parking.controllers.js';

const router = Router();

//Get all information about parking
router.get('/parking', getParking);

//Get the  information about id_parking
router.get('/parking/:id', getParkingById);

//Create a new parking
router.post('/parking', createParking);

//Delete a parking by id_parking
router.delete('/parking/:id', deleteParking);

//Update a parking by id_parking
router.put('/parking/:id', updateParking);

export default router;