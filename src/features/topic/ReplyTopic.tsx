import { Button, Form, Input } from "antd";
import { FC } from "react";

interface ReplyTopicProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: (values: any) => void;
  submitting: boolean;
  value: string;
}

const ReplyTopic: FC<ReplyTopicProps> = ({
  onChange,
  onSubmit,
  submitting,
  value,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any): void => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="message"
        rules={[
          {
            pattern: new RegExp(/^[+\-*/]\d+$/),
            message: "Please enter a valid operator",
            required: true,
          },
        ]}
        hasFeedback
      >
        <Input onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReplyTopic;
