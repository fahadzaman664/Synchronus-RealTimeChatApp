import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useSelector } from "react-redux";

const PrivateRoute = ({children}) => {
  const user = useSelector((state) => state.user.userInfo);
  const isAuthenticated = !!user;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({children}) => {
  const user = useSelector((state) => state.user.userInfo);
  const isAuthenticated = !!user;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
