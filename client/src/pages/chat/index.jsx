import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import ChatContainer from "@/components/chat-container";
import ContactsContainer from "@/components/contacts-container";
import EmptyChatContainer from "@/components/empty-chat-container";
const Chat = () => {
  const { selectedChatType, selectedChatMessages, selectedChatData } =
    useSelector((state) => state.chat);

    // const selectedChatType = useSelector((state)=>state.chat.selectedChatType);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!user.profileSetup) {
      navigate("/profile");
      toast.error("Please complete your profile setup first.");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-[100vh]  text-white  overflow-hidden ">
      <ContactsContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
