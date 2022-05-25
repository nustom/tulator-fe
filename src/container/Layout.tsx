import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  authenticateUser,
  logout,
  selectIsAuthenticated,
} from "../features/auth/authSlice";
import NewTopicModal from "../features/topic/NewTopicModal";
const { Header, Content, Footer } = Layout;

export default function DefaultLayout({ children }: PropsWithChildren<{}>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect((): void => {
    console.log("---");

    // Check for authenticated user and update application state if required
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      dispatch(authenticateUser(user));
      navigate("/");
    }
  }, [dispatch, navigate]);

  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/login");
  };
  const openModal = (): void => {
    setShowModal(true);
  };
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
          <Menu.Item key="home">Home</Menu.Item>
          {isAuthenticated ? (
            <>
              <Menu.Item key="new-topic" onClick={openModal}>
                Create New Topic
              </Menu.Item>
              <Menu.Item
                key="logout"
                icon={<UserOutlined size={24} />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </>
          ) : null}
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        NUS Technology ©{new Date().getFullYear()} - Tweet tulator app - Created
        by TomNUS
      </Footer>
      <NewTopicModal visible={showModal} setVisible={setShowModal} />
    </Layout>
  );
}
