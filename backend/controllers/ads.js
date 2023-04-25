const Ad = require('../models/Ad');

// Function to get all ads
const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to search for ads by keyword
const searchAds = async (req, res) => {
  const { keyword } = req.query;

  try {
    const ads = await Ad.aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: keyword,
            path: {
              wildcard: '*'
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          company: 1,
          primaryText: 1,
          headline: 1,
          description: 1,
          imageUrl: 1
        }
      }
    ]);

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAds,
  searchAds
};
