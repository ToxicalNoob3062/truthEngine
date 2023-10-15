"use client";

import { SessionProvider } from "next-auth/react";
import Application from "./components/hasSession";

export default function Home() {
  return (
    <SessionProvider>
      <div className="w-full">
        <h1 className="text-5xl mt-6 text-center p-3 text-blue-800 font-serif font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          The <span className="text-green-400">Truth</span> Engine🔥
        </h1>
        <Application />
      </div>
    </SessionProvider>
  );
}
