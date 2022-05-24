import { AxiosError } from "axios";
import { flatMapDeep } from "lodash";
import { ITopic } from "../features/topic/interface";

export function extractAxiosError(error: Error & AxiosError): string {
  let errorMessage = error.message;
  if (error.isAxiosError) {
    errorMessage = error.response?.data as string || error.message;
  }
  return errorMessage;
}

export function getChildren(
  member: ITopic
): (ITopic | ITopic[]) | (ITopic | ITopic[])[] {
  if (!member.topics || !member.topics.length) {
    return member;
  }
  return [member, flatMapDeep(member.topics, getChildren)];
};

export function findAllParents(
  currentTopic: ITopic,
  allTopics: ITopic[],
  data: ITopic[]
) {
  if (!currentTopic.parentId) {
    return;
  } else {
    const foundParent = allTopics.find(
      (el) => el.id.toString() === currentTopic.parentId?.toString()
    )!;
    data.push(foundParent);
    if (foundParent.parentId) {
      findAllParents(foundParent, allTopics, data);
    }
  }
}