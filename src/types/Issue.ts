export type Issue = {
  id: string;
  title: string;
  status: 'created'|'processing'|'holding'|'finished';
  audits: Array<{ startDate: Date, endDate: Date }>;
  link?: string;
  estimatedTime?: string;
  projectId?: string;
};

export default Issue;
