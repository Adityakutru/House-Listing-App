import House from '../models/house.model.js'


export const addHouse = async (req, res) => {
  // safer logging (stringify)
  console.log("🔥 req.user =", JSON.stringify(req.user, null, 2));
  console.log("🔥 req.body =", JSON.stringify(req.body, null, 2));
  console.log("🔥 req.files =", JSON.stringify(req.files, null, 2));

  try {
    const imageUrls = (req.files || []).map((file) => file.path);

    // Validate required fields before saving
    const { title, description, price, location, ownerName, ownerPhone } = req.body;
    if (!title || !description || !price || !location || !ownerName || !ownerPhone) {
      return res.status(400).json({ message: "Missing required house fields" });
    }

    const newHouse = new House({
      title,
      description,
      price,
      location,
      ownerName,
      ownerPhone,
      images: imageUrls,
      owner: req.user?.id, // safer access
    });

    await newHouse.save();

    res.status(201).json({ message: "House added successfully!", house: newHouse });
  } catch (error) {
    console.error("🔥 ERROR in addHouse:", error);
    res.status(500).json({ message: "Error adding house", error: error.message });
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
