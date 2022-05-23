import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { Form, InputNumber, Modal, notification } from "antd";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../auth/authSlice";
import { ICreateTopic } from "./interface";
import { useCreateTopic, useGetTopics } from "./topicAPI";

interface NewTopicModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTopicModal: FC<NewTopicModalProps> = ({ visible, setVisible }) => {
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const [createTopic, { isLoading, isSuccess, isError, status }] =
    useCreateTopic();
  const { refetch } = useGetTopics();

  const currentUser = useAppSelector(selectCurrentUser);

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

  const handleOk = async (): Promise<void> => {
    const createTopicPayload: ICreateTopic = {
      author: currentUser!.username,
      content,
    };
    await createTopic(createTopicPayload);
    setVisible(false);
  };
  const handleCancel = (): void => setVisible(false);

  const handleInputChange = (value: number): void => {
    if (value !== null) {
      setContent(value.toString());
    }
  };

  return (
    <Modal
      title="Create New Topic"
      visible={visible}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Form.Item
          label="Number"
          rules={[
            {
              required: true,
              message: "Please enter a number.",
            },
            {
              pattern: /\d+/g,
              message: "Please enter a valid number.",
            },
          ]}
          name="content"
        >
          <InputNumber onChange={handleInputChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTopicModal;
