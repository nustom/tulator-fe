import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./common/NotFound";
import DefaultLayout from "./container/Layout";
import Login from "./features/auth/Login";
import { PrivateRoute } from "./features/auth/PrivateRoute";
import Topic from "./features/topic/Topic";
import Topics from "./features/topic/Topics";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute component={Topics} />} />
        <Route path="/topic" element={<PrivateRoute component={Topic} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
