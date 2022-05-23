import { Avatar, Card, Comment } from "antd";
import { FC, PropsWithChildren } from "react";
import { AppCalculator } from "../../common/Calculator";
import CommentEditor from "./CommentEditor";
import { ITopic } from "./interface";
import styles from "./Topic.module.css";

interface RepliedCommentProps {
  item: ITopic;
  showReply: boolean;
  rootTopic: ITopic;
  currentIndex: number;
}
const calculator = new AppCalculator();

const RepliedComment: FC<PropsWithChildren<RepliedCommentProps>> = ({
  children,
  item,
  showReply,
  rootTopic,
  currentIndex,
}) => {
  const { author, content, parentId } = item;
  const result = calculator.calculateResultCurrentTopic(rootTopic, item);
  let prevResult = parseFloat(rootTopic.content);
  if (parentId && currentIndex) {
    const prevItem = rootTopic.topics[currentIndex - 1];
    prevResult = calculator.calculateResultCurrentTopic(rootTopic, prevItem);
  }

  return (
    <>
      <Card>
        <Comment
          author={<h2>{author}</h2>}
          avatar={
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              size="large"
              alt={author}
            />
          }
          content={
            parentId ? (
              <h1 className={styles.content}>
                <span>Last Result: {prevResult.toFixed(2)}</span>
                <span>Current Reply: {content}</span>
                <span>Result: {result.toFixed(2)}</span>
              </h1>
            ) : (
              <h1>{content}</h1>
            )
          }
        >
          {children}
        </Comment>
      </Card>

      {((showReply && parentId) ||
        (!parentId && rootTopic.topics.length === 0)) && (
        <Card>
          <CommentEditor rootTopic={rootTopic} />
        </Card>
      )}
    </>
  );
};

export default RepliedComment;
