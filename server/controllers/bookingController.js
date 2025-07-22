import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

//Function to check availability of car for a given Date
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: new Date(returnDate) },
    returnDate: { $gte: new Date(pickupDate) },
  });
  return bookings.length === 0;
};

// check availability of car for a given Date and location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    //fetch all available cars for the given location
    // Adding validation:
    if (!pickupDate || !returnDate || new Date(pickupDate) >= new Date(returnDate)) {
      return res.json({ success: false, message: "Invalid date range." });
    }
    const cars = await Car.find({ location, isAvailable: true }).lean();

    //check car availability for the given date range using promise
    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car, isAvailable};
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({ success: true, availableCars, message: "Available cars fetched successfully." });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Failed to fetch available cars." });
  }
};

//API to create booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    if (new Date(returnDate) <= new Date(pickupDate)) {
      return res.json({ success: false, message: "Invalid date range" });
    }

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is unavailable for the selected dates." });
    }

    const carData = await Car.findById(car);
    if (!carData) {
  return res.json({ success: false, message: "Car not found." });
}

    //calculate price based on pickupdate and returnDate
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({ success: true, message: "Booking successfully created." });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message:  "Failed to create booking." });
  }
};

//api to list user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings,message: "User bookings retrieved."  });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Unable to fetch user bookings." });
  }
};

//api to get owner bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Access denied. Only owners allowed." });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings, message: "Owner bookings retrieved."  });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Unable to fetch owner bookings."  });
  }
};

// api to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized access." });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Booking status updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Failed to update booking status." });
  }
};
