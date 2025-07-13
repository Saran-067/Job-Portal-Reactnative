export interface AppliedJob {
  _id: string;
  job: {
      _id: string;
      title: string;
  };
  status: string;
  createdAt: string;
}