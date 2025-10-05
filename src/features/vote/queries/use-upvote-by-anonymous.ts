import { http } from "@/lib/http";
import { createMutation } from "react-query-kit";

export interface UpvoteRequest {
  topicId: number | string;
  receiverId: number | string;
  email: string;
  message?: string;
}

export const useUpvoteByAnonymous = createMutation({
  mutationFn: (data: UpvoteRequest) => {
    return http.post("votes/anonymous", data);
  },
});