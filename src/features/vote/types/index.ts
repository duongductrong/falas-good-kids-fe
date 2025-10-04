export interface VoteTopic {
  id: number;
  text: string;
  value: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}