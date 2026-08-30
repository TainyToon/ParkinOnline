import {
  findAllParkingSpacesService,
  findParkingSpaceByIdService,
  createParkingSpaceService,
  deleteParkingSpaceService,
  updateParkingSpaceService,
  updateParkingSpaceStatusService,
} from "../services/parkingSpace.service.js";

export const getParkingSpace = async (req, res) => {
  const parkingSpace = await findAllParkingSpacesService();
  return res.json(parkingSpace);
};

export const getParkingSpaceById = async (req, res) => {
  const { id } = req.params;
  const parkingSpace = await findParkingSpaceByIdService(id);
  if (!parkingSpace) {
    return res.status(404).json({
      message: "Parking space not found",
    });
  }
  return res.json(parkingSpace);
};

export const createParkingSpace = async (req, res) => {
  const { parking_lot_id, space_number, type, status } = req.body;
  const parkingSpace = await createParkingSpaceService(
    parking_lot_id,
    space_number,
    type,
    status,
  );
  return res.json(parkingSpace);
};

export const deleteParkingSpace = async (req, res) => {
  const { id } = req.params;
  const parkingSpace = await deleteParkingSpaceService(id);
  if (!parkingSpace) {
    return res.status(404).json({
      message: "Parking space not found",
    });
  }
  console.log(parkingSpace);
  return res.status(201).json(parkingSpace);
};

export const updateParkingSpace = async (req, res) => {
  const { id } = req.params;
  const { parking_lot_id, space_number, type, status } = req.body;
  const parkingSpace = await updateParkingSpaceService(
    id,
    parking_lot_id,
    space_number,
    type,
    status,
  );

  if (!parkingSpace) {
    return res.status(404).json({ message: "Parking space not found" });
  }

  return res.json(parkingSpace);


  
};

export const updateParkingSpaceStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updatedParkingSpace = await updateParkingSpaceStatusService(
        id,
        status
    );

    if (!updatedParkingSpace) {
        return res.status(404).json({
            message: "Parking space not found"
        });
    }

    return res.json(updatedParkingSpace);
};
