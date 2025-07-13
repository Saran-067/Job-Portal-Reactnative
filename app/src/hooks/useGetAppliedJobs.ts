import { setAllAppliedJobs } from "../redux/JobSlice";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import user from "../redux/authSlice";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.post(`${APPLICATION_API_END_POINT}/my`, { userId: user!._id });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log("Failed to fetch applied jobs:", error);
            }
        };

        if (user?._id) {
            fetchAppliedJobs();
        }
    }, [dispatch, user]);
};

export default useGetAppliedJobs;
