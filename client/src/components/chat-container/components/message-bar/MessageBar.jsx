import { useSocket } from "@/context/SocketContext";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const MessageBar = () => {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const emojiRef = useRef();
  const [emojiPickerOpen, SetEmojiPickerOpen] = useState(false);
  const { selectedChatType, selectedChatData } = useSelector(
    (state) => state.chat
  );
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        SetEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };
  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      console.log("sending message:", {
        sender: userInfo.userId,
        content: message,
        receipent: selectedChatData._id,
      });
      socket.emit("sendMessage", {
        sender: userInfo.userId,
        content: message,
        receipent: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
  };
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all cursor-pointer">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all cursor-pointer"
            onClick={() => SetEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className=" bg-[#8417ff] flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all cursor-pointer"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl " />
      </button>
    </div>
  );
};

export default MessageBar;
