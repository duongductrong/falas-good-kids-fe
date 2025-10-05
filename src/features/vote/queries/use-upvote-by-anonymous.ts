import { http } from "@/lib/http";
import { createMutation } from "react-query-kit";

export interface UpvoteRequest {
  topicId: number | string;
  receiverId: number | string;
  anonymous: string;
  email?: string;
  message?: string;
}

export const useUpvoteByAnonymous = createMutation({
  mutationKey: ["upvote-by-anonymous"],
  mutationFn: (data: UpvoteRequest) => {
    return http.post("votes/anonymous", data);
  },
});