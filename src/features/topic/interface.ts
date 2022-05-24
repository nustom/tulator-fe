
export interface ITopicResponse {
  id: string;
  content: string;
  author: string;
  topics: ITopic[];
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  children: ITopic[];
  parent: ITopic | null;
}

export interface ITopic {
  id: string;
  content: string;
  author: string;
  topics: ITopic[];
  createdAt: string;
  parentId?: string;
  parent: ITopic | null;
}

export type ICreateTopic = Pick<ITopic, "content" | "author" | "parentId">;