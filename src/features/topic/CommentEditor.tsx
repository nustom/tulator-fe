import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { Comment, notification } from "antd";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../auth/authSlice";
import { ICreateTopic, ITopic } from "./interface";
import ReplyTopic from "./ReplyTopic";
import { useCreateTopic, useGetTopics } from "./topicAPI";

interface CommentEditorProps {
  rootTopic: ITopic;
}

const CommentEditor: FC<CommentEditorProps> = ({ rootTopic }) => {
  const [createTopic, { isLoading, isSuccess, status, isError }] =
    useCreateTopic();

  const { refetch } = useGetTopics();

  const user = useAppSelector(selectCurrentUser);
  const [reply, setReply] = useState("");

  const handleReplyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setReply(event.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Reply successfully created.",
      });
      refetch();
    } else if (isError && status === QueryStatus.rejected) {
      notification.error({
        message: "Create topic failed.",
      });
    }
  }, [isSuccess, isError, status, refetch]);

  const handleSubmitReply = async (): Promise<void> => {
    const createReply: ICreateTopic = {
      author: user!.username,
      content: reply,
      parentId: rootTopic.id,
    };
    await createTopic(createReply);
    setReply("");
  };
  return (
    <Comment
      author={user!.username}
      content={
        <ReplyTopic
          onChange={handleReplyChange}
          onSubmit={handleSubmitReply}
          value={reply}
          submitting={isLoading}
        />
      }
    ></Comment>
  );
};

export default CommentEditor;
