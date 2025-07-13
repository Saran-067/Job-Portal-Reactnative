import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setAllJobs } from '../redux/JobSlice';
import axios from 'axios';
import { JobType } from '../types/JobTypes'; // Correct import
import {JOB_API_END_POINT }from '../utils/constant'
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((store: RootState) => store.job);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get<{ success: boolean; jobs: JobType[] }>(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    setError('Failed to fetch jobs');
                }
            } catch (error) {
                setError('An error occurred while fetching jobs');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]);

    return { loading, error };
};

export default useGetAllJobs;