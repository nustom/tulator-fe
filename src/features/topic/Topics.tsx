import { Card, Collapse, Comment, Spin } from "antd";
import { flatMapDeep } from "lodash";
import { FC } from "react";
import CommentEditor from "./CommentEditor";
import { ITopic } from "./interface";
import styles from "./Topic.module.css";
import { useGetTopics } from "./topicAPI";

const getChildren = (
  member: ITopic
): (ITopic | ITopic[]) | (ITopic | ITopic[])[] => {
  if (!member.topics || !member.topics.length) {
    return member;
  }
  return [member, flatMapDeep(member.topics, getChildren)];
};

const renderCommentTree = (topics: ITopic[]): JSX.Element[] => {
  return topics.map((topic) => {
    return (
      <Collapse key={topic.id}>
        <Collapse.Panel key={topic.id} header={<h1>{topic.content}</h1>}>
          <Card>
            <Comment content={<h3>{topic.content}</h3>}>
              {topic.topics.length && renderCommentTree(topic.topics)}
            </Comment>
            <CommentEditor rootTopic={topic}></CommentEditor>
          </Card>
        </Collapse.Panel>
      </Collapse>
    );
  });
};

const Topics: FC<{}> = () => {
  const { data: topics, isLoading } = useGetTopics();
  /**
   * Flat all topics to find later
   */
  const flattenedTopics = flatMapDeep(topics, getChildren);
  console.log(`🚀 -> flattenedTopics`, flattenedTopics);

  return (
    <>
      {isLoading ? (
        <Spin size="large" className={styles.loadingSpin} />
      ) : (
        <>{topics ? renderCommentTree(topics) : null}</>
      )}
    </>
  );
};

export default Topics;
