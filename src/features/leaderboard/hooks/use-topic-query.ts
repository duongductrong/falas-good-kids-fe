import { useQueryState } from "nuqs";



export const useTopicQuery = () => {
  const [topic, setTopic] = useQueryState("topic", {
    defaultValue: ""
  });

  return [topic, setTopic] as const;
};