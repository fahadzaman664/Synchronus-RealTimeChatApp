import {
  setSelectedChatMessages,
  useGetMessagesMutation,
} from "@/features/user.slice";
import moment from "moment/moment";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedChatData, selectedChatType, selectedChatMessages } =
    useSelector((state) => state.chat);
  const userInfo = useSelector((state) => state.user.userInfo);
  const scrollRef = useRef();
  const [getMessages] = useGetMessagesMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const response = await getMessages({
          id: selectedChatData._id,
        }).unwrap();
        if (response.messages) {
          dispatch(setSelectedChatMessages(response.messages));
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getAllMessages();
      }
    }
  }, [selectedChatData, selectedChatType]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && dmRenderMessages(message)}
        </div>
      );
    });
  };

  const dmRenderMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50 "
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 "
          } border inline-block rounded my-1 max-w-[50%] break-words `}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xlg:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageContainer;
