"use client";
import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "../components";
import { io } from "socket.io-client";

// const socket = io("http://localhost:3001");
const socket = io("https://socketio-api-nwqu.onrender.com");

export type SocketType = typeof socket;
export interface ChatType {
  content: string;
  type: "text" | "server";
  own?: boolean;
  user?: { name: string; id: string };
}

export default function Home() {
  const [chat, setChat] = useState<ChatType[]>([]);
  const [typing, setTyping] = useState<string[]>([]);
  const [input, setInput] = useState("");

  console.log("CHAT", chat);
  console.log("TYPING", typing);
  console.log("INPUT", input);

  const user = useRef(null);

  useEffect(() => {
    socket.on("recieve_message", (msg) => {
      if (!user.current) return;
      setChat((prev) => [...prev, msg]);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      setTyping((prev) => {
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    });

    socket.on("new_user", (newUser) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: `${newUser} joined`, type: "server" },
      ]);
    });

    return () => {
      socket.off("recieve_message");
      socket.off("user_typing");
      socket.off("new_user");
    };
  });
  console.log(input);

  return (
    <main className="h-screen max-h-screeen max-w-screen mx-auto md:container md:p-20 md:pt-4">
      {user.current ? (
        <>
          <Chat user={user.current} chat={chat} typing={typing} />
          <Inputs setChat={setChat} user={user.current} socket={socket} />
        </>
      ) : (
        <SignUp user={user} socket={socket} input={input} setInput={setInput} />
      )}
    </main>
  );
}
