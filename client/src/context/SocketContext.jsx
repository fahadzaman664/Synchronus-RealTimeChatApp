import { HOST } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { createContext, useContext, useRef, useEffect } from "react";
import { setAddMessage } from "@/features/user.slice";

const SocketContext = createContext(null);
export const useSocket = () => {
  return useContext(SocketContext);
};
export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { selectedChatData, selectedChatType } = useSelector(
    (state) => state.chat
  );
  const socket = useRef();

  // const chatDataRef = useRef({ selectedChatData, selectedChatType });
  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.userId },
      });
      socket.current.on("connect", () => {
        console.log("connect to socket server");
      });
      const handleReceiveMessage = (message) => {
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.receipent._id)
        ) {
          console.log("message recived", message);
          dispatch(setAddMessage(message));
        }
      };
      socket.current.on("receiveMessage", handleReceiveMessage);
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
