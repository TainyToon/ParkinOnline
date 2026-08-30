import {Router} from 'express';
import {getParkingSpace, getParkingSpaceById, createParkingSpace, deleteParkingSpace, updateParkingSpace, updateParkingSpaceStatus } from '../controllers/parkingSpace.controllers.js';

const router = Router();

//Get all information about parking
router.get('/', getParkingSpace);

//Get the  information about id_parking
router.get('/:id', getParkingSpaceById);

//Create a new parking
router.post('/', createParkingSpace); //This command only will be used by the admin, so we need to implement a middleware to check if the user is an admin(future implementation)

//Delete a parking by id_parking
router.delete('/:id', deleteParkingSpace); //This command only will be used by the admin, so we need to implement a middleware to check if the user is an admin(future implementation)

//Update a parking by id_parking
router.put('/:id', updateParkingSpace);


router.patch('/:id/status', updateParkingSpaceStatus);

export default router;