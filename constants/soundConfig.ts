import { AudioSource } from "expo-audio";
import AUDIO from "./audio";

type SoundType = {
  soundSource: AudioSource;
  volume: number;
};

export const MESSAGESOUND: SoundType = {
  soundSource: AUDIO?.message,
  volume: 0.02,
};

export const ERRORSOUND: SoundType = {
  soundSource: AUDIO?.error,
  volume: 0.4,
};

export const SUCCESSSOUND: SoundType = {
  soundSource: AUDIO?.success,
  volume: 0.4,
};
