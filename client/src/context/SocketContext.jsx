import { HOST } from "@/utils/constant";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { createContext,useContext, useRef, useEffect } from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();

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
