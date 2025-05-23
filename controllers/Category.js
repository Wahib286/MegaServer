const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;
    //validation
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "All feilds are required.",
      });
    }
    //create entry in db
    const tagDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(tagDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "Tags created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wronng while creating tags",
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allTags = await Category.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      message: "All Categories returned",
      data: allTags,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wronng while getting tags",
      error,
    });
  }
};

//categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const { categoryId } = req.body;
    //get courses for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    //get coursesfor different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    //get top 10 selling courses
    //HW - write it on your own

    //return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
