import { Card, Collapse, Comment, Spin } from "antd";
import { flatMapDeep } from "lodash";
import { FC } from "react";
import { AppCalculator } from "../../common/Calculator";
import { findAllParents, getChildren } from "../../common/utils";
import CommentEditor from "./CommentEditor";
import { ITopic } from "./interface";
import styles from "./Topic.module.css";
import { useGetTopics } from "./topicAPI";

const calculator = new AppCalculator();

const renderCommentTree = (
  topics: ITopic[],
  flattenedTopics: ITopic[],
  _prevResult?: number
): JSX.Element[] => {
  return topics.map((topic) => {
    let currentResult = 0;
    let prevResult = _prevResult;
    let listCurrentParents: ITopic[] = [];
    findAllParents(topic, flattenedTopics, listCurrentParents);
    if (listCurrentParents.length) {
      currentResult = calculator.calculateResultTopic(
        topic,
        listCurrentParents
      );
      const root = listCurrentParents.find((parent) => !parent.parentId)!;
      prevResult =
        _prevResult !== undefined ? _prevResult : parseFloat(root.content);
    }
    return (
      <Collapse key={topic.id}>
        <Collapse.Panel key={topic.id} header={<></>}>
          <Card>
            <Comment
              content={
                topic.parentId ? (
                  <h1 className={styles.content}>
                    <span>Last Result: {prevResult!.toFixed(2)}</span>
                    <span>Current Reply: {topic.content}</span>
                    <span>Result: {currentResult.toFixed(2)}</span>
                  </h1>
                ) : (
                  <h1>Topic: {topic.content}</h1>
                )
              }
            >
              {topic.topics.length &&
                renderCommentTree(topic.topics, flattenedTopics, currentResult)}
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
  return (
    <>
      {isLoading ? (
        <Spin size="large" className={styles.loadingSpin} />
      ) : (
        <>{topics ? renderCommentTree(topics, flattenedTopics) : null}</>
      )}
    </>
  );
};

export default Topics;
