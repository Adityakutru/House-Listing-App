import House from '../models/house.model.js'


export const addHouse = async (req, res) => {
  try {
    const imageUrls = (req.files || []).map((file) => file.path);

    const {
      title,
      description,
      price,
       listingType,
      bhk,
      bathrooms,
      furnishing,
      listedBy,
      parking,
      facing,
      totalFloors,
      area,
      city,
      state,
      ownerName,
      ownerPhone,
      latitude,
      longitude,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !area ||
      !city ||
      !state ||
      !ownerName ||
      !ownerPhone ||
      !latitude ||
      !longitude
    ) {
      return res.status(400).json({ message: "Missing required house fields" });
    }

    const location = `${area}, ${city}, ${state}`;

    const newHouse = new House({
      title,
      description,
      price,
      listingType,
      bhk: Number(bhk),
      bathrooms: Number(bathrooms),
      furnishing,
      listedBy,
      parking: Number(parking),
      facing,
      totalFloors: Number(totalFloors),
      location,
      ownerName,
      ownerPhone,
      latitude,
      longitude,
      images: imageUrls,
      owner: req.user.id,
    });

    await newHouse.save();

    res.status(201).json({
      message: "House added successfully!",
      house: newHouse,
    });
  } catch (error) {
    console.error("🔥 ERROR in addHouse:", error);
    res.status(500).json({
      message: "Error adding house",
      error: error.message,
    });
  }
};




//Get all houses:
export const getHouses = async(req,res)=>{
    try {
        const houses = await House.find();
        res.status(200).json(houses);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching houses",
            error: error.message,
        })
    }
}

export const getHouseById = async(req, res)=>{
    try {
        const{id} = req.params;

        const house = await House.findById(id);

        if(!house){
            res.status(404).json({message: "House not found"});
        }

        res.status(200).json(house);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching house",
            error: error.message,
        });
    }
}

export const getMyHouses = async (req, res) => {
  try {
    const houses = await House.find({ owner: req.user.id });
    res.json(houses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching your listings",
      error: error.message,
    });
  }
};

// DELETE HOUSE (only owner)
export const deleteHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    if (house.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await house.deleteOne();
    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

// UPDATE HOUSE (only owner)
export const updateHouse = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) return res.status(404).json({ message: "House not found" });
    if (house.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updateData = {
      ...req.body,
      price: req.body.price ? Number(req.body.price) : house.price,
      bhk: req.body.bhk ? Number(req.body.bhk) : house.bhk,
      bathrooms: req.body.bathrooms
        ? Number(req.body.bathrooms)
        : house.bathrooms,
      parking: req.body.parking ? Number(req.body.parking) : house.parking,
      totalFloors: req.body.totalFloors
        ? Number(req.body.totalFloors)
        : house.totalFloors,
    };

    const updated = await House.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};


