declare module 'react-speech-kit' {
  export interface SpeechSynthesisOptions {
    text: string;
    voice?: SpeechSynthesisVoice;
    rate?: number;
    pitch?: number;
    volume?: number;
  }

  export interface UseSpeechSynthesisResult {
    speak: (options: SpeechSynthesisOptions) => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
    cancel: () => void;
    pause: () => void;
    resume: () => void;
  }

  export function useSpeechSynthesis(options?: {
    onEnd?: () => void;
    onError?: (error: Error) => void;
    onPause?: () => void;
    onResume?: () => void;
    onStart?: () => void;
  }): UseSpeechSynthesisResult;
}
