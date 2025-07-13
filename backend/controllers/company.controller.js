import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


  
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
      // console.log(userIds);
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log("User ID:", userId);

    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found for this user.",
        success: false,
      });
    }
  //  console.log("Companies:", companies);
    return res.status(200).json({
      companies, // plural
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};




export const upsertCompany = async (req, res) => {
  try {
    const { name, description, website, location, userId } = req.body;
    // const userId =  created_by; // from isAuthenticated middleware
    const file = req.file;
    // console.log("File:", file);
    // console.log(req.body);
    // console.log("User ID:", userId);
    if (!name || !userId) {
      return res.status(400).json({
        message: "Company name and user ID are required.",
        success: false
      });
    }
 
    let company = await Company.findOne({ userId });

    let logo;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location };
    if (logo) updateData.logo = logo;

    if (company) {
      // Update existing company
      company = await Company.findByIdAndUpdate(company._id, updateData, { new: true });

      return res.status(200).json({
        message: "Company information updated successfully.",
        company,
        success: true,
      });
    } else {
      // Create new company
      company = await Company.create({
        name,
        description,
        website,
        location,
        logo,
        userId,
      });
      //  console.log("Company:", company);
      return res.status(201).json({
        message: "Company registered successfully.",
        company,
        success: true,
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    });
  }
};
