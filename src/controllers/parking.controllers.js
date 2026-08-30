import {
  findAllParkings,
  findParkingById,
  createParkingService,
  deletedParkingService,
  updatedParkingService,
} from "../services/parking.service.js";

export const getParking = async (req, res) => {
  const parking = await findAllParkings();
  return res.json(parking);
};

export const getParkingById = async (req, res) => {
  const { id } = req.params;
  const parking = await findParkingById(id);
  if (!parking) {
    return res.status(404).json({
      message: "Parking lot not found",
    });
  }

  return res.json(parking);
};

export const createParking = async (req, res) => {

    const {
        name,
        address,
        total_spaces
    } = req.body;

    const result = await createParkingService(
        name,
        address,
        total_spaces
    );

    if (result.error) {
        return res.status(400).json({
            message: result.error
        });
    }

    return res.status(201).json(result.parking);
};

export const deleteParking = async (req, res) => {
  const { id } = req.params;
  const deletedParking = await deletedParkingService(id);
  if (!deletedParking) {
    return res.status(404).json({ message: "Parking lot not found" });
  }
  console.log(deletedParking);
  return res.status(200).json({
    message: "Parking lot deleted successfully",
  });
};

export const updateParking = async (req, res) => {
  const { id } = req.params;
  const { name, address, total_spaces } = req.body;
  const updatedParking = await updatedParkingService(
    id,
    name,
    address,
    total_spaces,
  );
  if (!updatedParking) {
    return res.status(404).json({ message: "Parking lot not found" });
  }
  return res.json(updatedParking);
};
