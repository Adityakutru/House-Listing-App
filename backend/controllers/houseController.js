import House from '../models/house.model.js'


export const addHouse = async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path);

    const newHouse = new House({
      ...req.body,
      images: imageUrls,
      owner: req.user.id,   // ⭐ IMPORTANT
    });

    await newHouse.save();

    res.status(201).json({
      message: "House added successfully!",
      house: newHouse,
    });
  } catch (error) {
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