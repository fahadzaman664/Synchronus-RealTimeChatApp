import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
const Chat = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!user.profileSetup) {
      navigate("/profile");
      toast.error("Please complete your profile setup first.");
    }
  }, [user, navigate]);

  return <div>chat</div>;
};

export default Chat;
