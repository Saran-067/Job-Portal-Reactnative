import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AppliedJob } from '../types/applicationTypes';

interface AppliedJobTableProps {
  appliedJobs: AppliedJob[];
}

const statusEmojiMap: Record<string, string> = {
  Accepted: '✅',
  Rejected: '❌',
  Pending: '⏳',
};

const AppliedJobTable: React.FC<AppliedJobTableProps> = ({ appliedJobs }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Applications</Text>

      <FlatList
        data={appliedJobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.job.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.status}>
                {statusEmojiMap[item.status] || '🟡'} {item.status}
              </Text>
              <Text style={styles.date}>
                📅 {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6', // gray-100
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a', // blue-900
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#6366f1', // indigo-500
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827', // gray-900
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb', // blue-600
  },
  date: {
    fontSize: 13,
    color: '#6b7280', // gray-500
  },
});

export default AppliedJobTable;
