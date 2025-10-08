export interface Vote {
  id: number;
  votedDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  topic?: {
    id: number;
    text: string;
    value: string;
    active: boolean;
  };
  votedBy?: {
    id: number;
    realName: string;
    email: string;
    avatar?: string;
  };
  votedFor?: {
    id: number;
    realName: string;
    email: string;
    avatar?: string;
  };
}

export interface VoteTopic {
  id: number;
  text: string;
  value: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
