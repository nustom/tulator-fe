import { morphism } from "morphism";
import { ITopic, ITopicResponse } from "../features/topic/interface";
import { TOPIC_SCHEMA } from "./morphism-schema";

export const transformTopicResponse = (topics: ITopicResponse | ITopicResponse[]): ITopic | ITopic[] => {
  return morphism(TOPIC_SCHEMA, topics);
}