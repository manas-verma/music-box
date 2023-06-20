import React, { useEffect, useState } from "react";
import Box from "components/Box";
import { MusicEngine } from "app/music-engine";
import { useAudioEngine } from "./hooks/useAudioEngine";

const BAR_COUNT = 8;
const PITCH_COUNT = 10;

export default function App() {
  const [currBar, setCurrBar] = useState(0);
  const [musicEngine, setMusicEngine] = useState<MusicEngine | null>(null);

  const render = (context: AudioContext) => {
    setCurrBar((currBar + 1) % BAR_COUNT);
    musicEngine?.play(currBar, context);
  };
  const { onStart: startAudioEngine, onStop: stopAudioEngine } = useAudioEngine({ render });
  const onStart = () => {
    setCurrBar(0);
    startAudioEngine();
  }
  const onStop = () => {
    setCurrBar(0);
    stopAudioEngine();
  }

  useEffect(() => {
    setMusicEngine(new MusicEngine(BAR_COUNT, PITCH_COUNT));
  }, []);

  const toggle = (bar: number, pitch: number) =>
    musicEngine?.toggle(bar, pitch);

  const boxes = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    for (let j = 0; j < PITCH_COUNT; j++) {
      boxes.push(
        <Box
          key={i * PITCH_COUNT + j}
          currBar={currBar}
          bar={i}
          pitch={j}
          toggle={toggle}
        />
      );
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="grid grid-cols-10 gap-4">{boxes}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onStart}
      >
        Start
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onStop}
      >
        Stop
      </button>
    </main>
  );
}
