import { morphism, Schema } from "morphism";
import { ITopic, ITopicResponse } from "../features/topic/interface";
import _ from "lodash";

export const TOPIC_SCHEMA: Schema<ITopic | ITopic[], ITopicResponse> = {
  id: "id",
  author: "author",
  content: "content",
  createdAt: "createdAt",
  parentId: "parent.id",
  topics: source => {
    if (source?.topics?.length) {
      const items = _.orderBy(source.topics, item => new Date(item.createdAt));
      return morphism(TOPIC_SCHEMA, items);
    }
    return [];
  },
}