
export interface ITopicResponse {
  id: string;
  content: string;
  author: string;
  topics: ITopic[];
  createdAt: string;
  updatedAt: string;
  parentId?: string;
}

export interface ITopic {
  id: string;
  content: string;
  author: string;
  topics: ITopic[];
  createdAt: string;
  parentId?: string;
}

export type ICreateTopic = Pick<ITopic, "content" | "author" | "parentId">;