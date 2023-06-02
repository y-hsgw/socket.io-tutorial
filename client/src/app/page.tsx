"use client";

import { useCallback, useEffect } from "react";

export default function Home() {
  const fetchHello = useCallback(async () => {
    const res = await fetch("/api/hello");
    console.log(await res.json());
  }, []);

  useEffect(() => {
    fetchHello();
  }, [fetchHello]);

  return (
    <main>
      <div>
        <p>Get started by editing&nbsp;</p>
        <div></div>
      </div>
    </main>
  );
}
