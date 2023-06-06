"use client";

import { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface ServerToClientEvent {
  receivedMessage: (message: string) => void;
}

interface ClientToServerEvent {
  sendMessage: (message: string) => void;
}

const socket: Socket<ServerToClientEvent, ClientToServerEvent> = io(
  process.env.NEXT_PUBLIC_API_BASE_URL || "",
  { withCredentials: true }
);

export default function Home() {
  const [value, setValue] = useState("");
  const [list, setList] = useState<string[]>([]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      socket.emit("sendMessage", value);
    },
    [value]
  );
  const changeList = useCallback((message: string) => {
    setList((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    socket.on("receivedMessage", changeList);

    return () => {
      socket.off("receivedMessage", changeList);
    };
  }, [changeList]);

  return (
    <main>
      <p>Get started by editing&nbsp;</p>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange} />
        <button type="submit">送信</button>
      </form>
      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
