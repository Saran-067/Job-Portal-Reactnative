import { useCallback, useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';   // make sure this action exists
import user from "../redux/authSlice"
/**
 * Hook returns:
 *   updateProfile(formData) – call with a FormData object
 *   loading                 – boolean
 *   error                   – string | null
 */
const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const dispatch  = useDispatch();

  const updateProfile = useCallback(
    async (formData: FormData) => {
      try {
        setLoading(true);
        setError(null);
        console.log(formData)
        const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        //   withCredentials: true,
        });

        if (res.data.success) {
          // update user in Redux so UI refreshes everywhere
          dispatch(setUser(res.data.user));
          return true;
        }
        setError(res.data.message || 'Update failed');
        return false;
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Network error');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { updateProfile, loading, error };
};

export default useUpdateProfile;
