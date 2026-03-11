import { AudioSource, useAudioPlayer } from "expo-audio";
import { useCallback } from "react";

export const usePlaySound = () => {
  const player = useAudioPlayer(null); // No source at init time

  const playSound = useCallback(
    ({ soundSource, volume }: { soundSource: AudioSource; volume: number }) => {
      player.replace(soundSource); // Dynamically load the sound
      player.volume = volume;
      player.seekTo(0);
      player.play();
    },
    [player],
  );

  return { playSound };
};
