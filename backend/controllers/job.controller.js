import { Job } from "../models/job.model.js";


export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId,created_by} = req.body;
        const userId = created_by;
        // console.log(userId)
        // console.log(req.body)
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        // console.log(req)
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const { search, location, jobType, salary, experience } = req.query; // Extract search and filters from query params

        let query = {};

        // Search by title, company name, or job type
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { 'company.name': { $regex: search, $options: "i" } },
                { jobType: { $regex: search, $options: "i" } },
            ];
        }

        // Filter by location
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        // Filter by job type
        if (jobType) {
            query.jobType = { $regex: jobType, $options: "i" };
        }

        // Filter by salary
        if (salary) {
            query.salary = Number(salary);
        }

        // Filter by experience (corrected field name)
        if (experience) {
            query.experienceLevel = { $regex: experience, $options: "i" };
        }

        const jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });

        if (!jobs.length) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        console.log(jobId)
        console.log("post")
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.query.userId; 
        console.log(adminId)
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
