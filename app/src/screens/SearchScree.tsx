import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Job from '../components/job';
import { debounce } from 'lodash';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Navbar from '../components/shared/Navbar';

// Job Type
export interface Job {
  _id: string;
  title: string;
  company: {
    name: string;
    location: string;
    website?: string;
  };
  location: string;
  jobType: string;
  salary: number;
  experienceLevel: string;
}

const filterOptions = {
  location: ['Mumbai', 'Chennai', 'Bangalore', 'Pune', 'Hyderabad', 'Delhi'],
  jobType: ['Frontend Developer', 'Backend Developer', 'Data Science', 'Graphic Designer', 'FullStack Developer'],
  salary: [5, 6, 7, 8, 12, 15, 20, 50],
  experienceLevel: ['Fresher', '1-2 years', '3-5 years', '5+ years'],
};

type FilterType = keyof typeof filterOptions;

const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchScreen = () => {
  const { allJobs } = useSelector((store: RootState) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType | ''>('');
  const [filterValue, setFilterValue] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
  };

  const handleSearch = useCallback(
    debounce((query) => {
      let filtered = allJobs;

      if (query) {
        filtered = filtered.filter(
          (job) =>
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.name.toLowerCase().includes(query.toLowerCase()) ||
            job.jobType.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (filterType && filterValue) {
        filtered = filtered.filter((job) => {
          if (filterType === 'salary') {
            return job.salary.toString() === filterValue;
          } else {
            return job[filterType].toLowerCase() === filterValue.toLowerCase();
          }
        });
      }

      setFilterJobs(filtered);
    }, 300),
    [allJobs, filterType, filterValue]
  );

  useEffect(() => {
    if (allJobs.length > 0) {
      setIsLoading(false);
      handleSearch(searchQuery);
    } else {
      setIsLoading(false);
    }
  }, [allJobs, searchQuery, filterValue, handleSearch]);

  useEffect(() => {
    setFilterValue('');
  }, [filterType]);

  const handleInputChange = (query: string) => setSearchQuery(query);
  const handleFilterTypeChange = (value: FilterType | '') => setFilterType(value);
  const handleFilterValueChange = (value: string) => setFilterValue(value);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <Navbar isVisible={isNavbarVisible} />

      {/* Toggle Button */}
      <TouchableOpacity onPress={toggleNavbar} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>≡</Text>
      </TouchableOpacity>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title, company, or job type..."
        value={searchQuery}
        onChangeText={handleInputChange}
        placeholderTextColor="#ccc"
      />

      {/* Filters */}
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filterType}
          style={styles.filterPicker}
          onValueChange={handleFilterTypeChange}
        >
          <Picker.Item label="Select Filter" value="" />
          <Picker.Item label="Location" value="location" />
          <Picker.Item label="Job Type" value="jobType" />
          <Picker.Item label="Salary" value="salary" />
          <Picker.Item label="Experience" value="experienceLevel" />
        </Picker>

        {filterType && (
          <Picker
            selectedValue={filterValue}
            style={styles.filterPicker}
            onValueChange={handleFilterValueChange}
          >
            <Picker.Item label={`Select ${filterType}`} value="" />
            {filterOptions[filterType].map((option) => (
              <Picker.Item key={option.toString()} label={option.toString()} value={option.toString()} />
            ))}
          </Picker>
        )}
      </View>

      {/* Job Results */}
      {filterJobs.length <= 0 ? (
        <View style={styles.noJobsContainer}>
          <Text style={styles.noJobsText}>No jobs found matching your criteria.</Text>
        </View>
      ) : (
        <FlatList
          data={filterJobs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Job job={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // Light gray background
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  searchInput: {
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  filterPicker: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  toggleButton: {
    position: 'absolute',
    top: 24,
    left: 16,
    zIndex: 10,
    backgroundColor: '#6366f1',
    padding: 10,
    borderRadius: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  noJobsText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default SearchScreen;
