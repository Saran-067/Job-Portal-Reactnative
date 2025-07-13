// src/hooks/useApplyJob.ts
import { Alert } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { RootState } from '../redux/store';        // 🔄 adjust import path

const useApplyJob = () => {
  // ✅ grab user from Redux
  const user = useSelector((state: RootState) => state.auth.user);
//    console.log(user); // Debugging line to check user object
  const applyJob = async (jobId: string) => {
    if (!user?._id) {
      Alert.alert('Error', 'You must be logged in to apply.');
      return;
    }

    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { userId: user._id },                    // ✅ send actual id
        { withCredentials: true }
      );

      if (res.data.success) {
        Alert.alert('Success', res.data.message);
      } else {
        Alert.alert('Error', res.data.message || 'Application failed');
      }
    } catch (err: any) {
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return { applyJob };
};

export default useApplyJob;
