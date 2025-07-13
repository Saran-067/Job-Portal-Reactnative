import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Job as JobType } from '../redux/JobSlice';
import useApplyJob from '../hooks/useApplyJob';

interface JobProps {
  job: JobType;
}

const Job: React.FC<JobProps> = ({ job }) => {
  const { applyJob } = useApplyJob();

  const handleApply = () => {
    applyJob(job._id);
  };

  return (
    <View style={styles.card}>
      {/* Header Row with Logo & Title */}
      <View style={styles.header}>
        <Image
          source={{
            uri: job.company.logo || 'https://via.placeholder.com/50x50.png?text=Logo',
          }}
          style={styles.logo}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.company}>{job.company.name}</Text>
        </View>
      </View>

      <Text style={styles.info}>📍 {job.company.location}</Text>
      {job.company.website && (
        <Text style={styles.info}>🌐 {job.company.website}</Text>
      )}
      <Text style={styles.badge}>🛠 {job.jobType}</Text>
      <Text style={styles.salary}>💸 {job.salary} LPA</Text>
      <Text style={styles.experience}>🎓 {job.experienceLevel} Experience</Text>

      <TouchableOpacity style={styles.button} onPress={handleApply}>
        <Text style={styles.buttonText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eef2ff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    shadowColor: '#6b7280',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  company: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3b82f6',
    marginTop: 2,
  },
  info: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
  badge: {
    backgroundColor: '#c7d2fe',
    color: '#3730a3',
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    borderRadius: 12,
    fontSize: 13,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '500',
  },
  salary: {
    fontSize: 15,
    fontWeight: '500',
    color: '#059669',
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: '#f59e0b',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Job;
