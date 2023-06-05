"use client";

import { useCallback, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || "", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log(`disconnect`);
});

export default function Home() {
  const [value, setValue] = useState("");
  const [list, setList] = useState<string[]>([]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      socket.emit("send_message", value);
    },
    [value]
  );

  socket.on("received_message", (data) => {
    console.log(data);
    setList([...list, data]);
  });

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
