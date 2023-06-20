import { useEffect, useRef } from "react";

const makeTimestamp = () => ({
  timestamp: 0,
});

type Args = {
  render: (context: AudioContext) => void;
};

const context = new window.AudioContext();

export function useAudioEngine(args: Args) {
  const { render } = args;
  const audioContextContainer = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextContainer.current = context;

    const t = makeTimestamp();
    const loop = (now: number) => {
      const diff = now - t.timestamp;
      console.log(diff);
      if (diff < 7000) return window.requestAnimationFrame(loop);
      if (context) render(context);
      t.timestamp = now;
      window.requestAnimationFrame(loop);
    };
    loop(t.timestamp);
  }, [render]);

  const onStart = () => {
    if (!context) return;
    if (context.state === "suspended") {
      context.resume();
    }
  };

  const onStop = () => {
    if (!context) return;
    if (context.state !== "suspended") {
      context.suspend();
    }
  };

  return { onStart, onStop };
}
