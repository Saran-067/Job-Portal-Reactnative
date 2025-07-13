import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './shared/Navbar';
import Job from './job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { debounce } from 'lodash'; // For debouncing the search input
import { RootState } from '../redux/store'; // Import RootState for useSelector
import { JobType } from '../types/JobTypes'; // Import Job type

const Jobs = () => {
    const { allJobs } = useSelector((store: RootState) => store.job); // Get all jobs from Redux store
    const [filterJobs, setFilterJobs] = useState<JobType[]>(allJobs); // State for filtered jobs
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search input
    const [filterType, setFilterType] = useState<string>(''); // State for selected filter type
    const [filterValue, setFilterValue] = useState<string>(''); // State for selected filter value

    // Predefined options for filters
    const filterOptions: { [key: string]: string[] | number[] } = {
        location: ['Mumbai', 'Chennai', 'Bangalore', 'Pune', 'Hyderabad', 'Delhi'],
        jobType: ['Frontend Developer', 'Backend Developer', 'Data Science', 'Graphic Designer', 'FullStack Developer'],
        salary: [5, 6, 7, 8, 12, 15, 20, 50], // Salary options in LPA
        experienceLevel: ['Fresher', '1-2 years', '3-5 years', '5+ years'], // Updated field name
    };

    // Debounced search function
    const handleSearch = useCallback(
        debounce((query: string) => {
            let filteredJobs = allJobs;
    
            // Filter by search query (title, jobType)
            if (query) {
                filteredJobs = filteredJobs.filter(
                    (job) =>
                        job.title.toLowerCase().includes(query.toLowerCase()) ||
                        job.jobType.toLowerCase().includes(query.toLowerCase())
                );
            }
    
            // Apply additional filter if selected
            if (filterType && filterValue) {
                filteredJobs = filteredJobs.filter((job) => {
                    const jobValue = job[filterType as keyof JobType];
    
                    if (filterType === 'salary') {
                        return jobValue.toString() === filterValue;
                    } else if (typeof jobValue === 'string') {
                        return jobValue.toLowerCase() === filterValue.toLowerCase();
                    }
                    return false;
                });
            }
    
            setFilterJobs(filteredJobs);
        }, 300),
        [allJobs, filterType, filterValue]
    );
    
    // Update filterJobs when searchQuery, allJobs, or filterValue changes
    useEffect(() => {
        if (allJobs.length > 0) {
            setIsLoading(false); // Data has been loaded
            handleSearch(searchQuery); // Apply search and filters
        } else {
            setIsLoading(false); // No jobs available
        }
    }, [allJobs, searchQuery, filterValue, handleSearch]);

    // Reset filter value when filter type changes
    useEffect(() => {
        setFilterValue('');
    }, [filterType]);

    // Handle search input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query); // Update search query state
    };

    // Handle filter type change
    const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(e.target.value); // Update filter type
    };

    // Handle filter value change
    const handleFilterValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(e.target.value); // Update filter value
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-lg font-semibold">Loading jobs...</span>
            </div>
        );
    }

    return (
        <div>
           

           
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    {/* Jobs List */}
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                        {/* Search Input */}
                        <div className="mb-5">
                            <input
                                type="text"
                                placeholder="Search jobs by title, company, or job type..."
                                value={searchQuery}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex gap-4 mb-5">
                            <select
                                value={filterType}
                                onChange={handleFilterTypeChange}
                                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Filter</option>
                                <option value="location">Location</option>
                                <option value="jobType">Job Type</option>
                                <option value="salary">Salary</option>
                                <option value="experienceLevel">Experience</option> {/* Updated field name */}
                            </select>

                            {filterType && (
                                <select
                                    value={filterValue}
                                    onChange={handleFilterValueChange}
                                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select {filterType}</option>
                                    {filterOptions[filterType].map((option) => (
                                        <option key={option.toString()} value={option.toString()}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Job Listings */}
                        {filterJobs.length <= 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <span className="text-lg font-semibold text-gray-600">
                                    No jobs found matching your criteria.
                                </span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job._id} // Ensure key is unique
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;