export interface JobType {
  
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
