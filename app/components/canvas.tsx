"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import { Physics } from "@react-three/rapier";

// @ts-ignore
import Ecctrl from "ecctrl";
import { Scene } from "./scene";
import { Character } from ".";
import { Environment } from "@react-three/drei";
import { Html, useProgress } from "@react-three/drei";
import { useStore } from "../utils";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html className="z-50" center>
      {progress} % loaded
    </Html>
  );
}
export function Game() {
  const store = useStore();
  const [answer, setAnswer] = useState("");
  const [q, setQ] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <div className="main">
      {store.selected && (
        <div className="absolute bottom-0 left-0  w-full p-4 z-50">
          <div className="w-full bg-black  min-h-52 p-4 bg-opacity-80 flex flex-col rounded-lg">
            <div>{store.selected}</div>
            <div className="text-gray-400 my-3">
              {q ?? "How can i help you?"}
            </div>
            {loading && (
              <div className="text-gray-400 animate-pulse">{"Thinkin.."}</div>
            )}
            {!loading && <div className="text-gray-400">{answer}</div>}
            <div className=" my-2 border-white border-opacity-40 w-full border-b" />
            <form
              className="mt-auto flex gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const q = e.currentTarget.q.value;
                setQ(q);
                const backStory = e.currentTarget.backStory.value;
                e.currentTarget.q.value = "";
                setLoading(true);
                fetch("/api", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ q, backStory }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    setAnswer(res.message);
                    setLoading(false);
                  });
              }}
            >
              <input
                required
                placeholder="back story npc"
                defaultValue="Backstory: You are a kind farmer that the demon killed your family and you are seeking revenge"
                name="backStory"
                className=" w-full p-2 rounded-lg bg-opacity-20 bg-white"
              />
              <input
                required
                placeholder="Ask me anything"
                name="q"
                className=" w-full p-2 rounded-lg bg-opacity-20 bg-white"
              />
              <button className=" p-2 rounded-lg">Ask</button>
            </form>
          </div>
        </div>
      )}
      <Canvas dpr={[1, 2]} shadows>
        <Environment background preset="night" />
        <Physics>
          <Suspense fallback={<Loader />}>
            <Scene />
          </Suspense>
          <Ecctrl mode="PointToMove">
            <Character />
          </Ecctrl>
        </Physics>
      </Canvas>
    </div>
  );
}
