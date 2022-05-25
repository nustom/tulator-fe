import { Button, Card, Checkbox, Form, Input } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import styles from "./Auth.module.css";
import { login } from "./authSlice";
import { ILoginPayload } from "./interface";


const Login: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: ILoginPayload): Promise<void> => {
    await dispatch(login(values));
    navigate("/");
  };

  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={styles.loginForm}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 4, message: "Please enter username at least 4 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Please enter password at least 6 characters" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
