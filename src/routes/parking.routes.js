import {Router} from 'express';
import {getParking, getParkingById, createParking, deleteParking, updateParking} from '../controllers/parking.controllers.js';

const router = Router();

//Get all information about parking
router.get('/', getParking);

//Get the  information about id_parking
router.get('/:id', getParkingById);

//Create a new parking
router.post('/', createParking); //This comand only will be used by the admin, so we need to implement a middleware to check if the user is an admin(future implementation)

//Delete a parking by id_parking
router.delete('/:id', deleteParking); //This comand only will be used by the admin, so we need to implement a middleware to check if the user is an admin(future implementation)

//Update a parking by id_parking
router.put('/:id', updateParking);

export default router;