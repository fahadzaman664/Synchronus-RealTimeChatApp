import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Chat = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!user.profileSetup) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return <div></div>;
};

export default Chat;
