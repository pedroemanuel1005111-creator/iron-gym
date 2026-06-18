import { useState, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Music, X } from 'lucide-react';

// Generate a motivational gym beat using Web Audio API
function createGymBeat(audioCtx: AudioContext, volume: number): { gainNode: GainNode; stop: () => void } {
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = volume;
  masterGain.connect(audioCtx.destination);

  const intervals: ReturnType<typeof setInterval>[] = [];

  function playKick(time: number) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.15);
    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  function playHiHat(time: number) {
    const bufferSize = audioCtx.sampleRate * 0.05;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.start(time);
  }

  function playBass(time: number, freq: number) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  function playSynthPad(time: number) {
    const notes = [130.81, 164.81, 196.00, 220.00];
    notes.forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.03, time);
      gain.gain.setValueAtTime(0.03, time + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 2.0);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(time);
      osc.stop(time + 2.0);
    });
  }

  const bpm = 128;
  const beatTime = 60 / bpm;
  const bassNotes = [55, 55, 65.41, 73.42];
  let beatCount = 0;

  function scheduleLoop() {
    const now = audioCtx.currentTime;
    const offset = 0.05;
    playKick(now + offset);
    playKick(now + offset + beatTime * 2);
    for (let i = 0; i < 4; i++) {
      playHiHat(now + offset + beatTime * i);
      playHiHat(now + offset + beatTime * i + beatTime * 0.5);
    }
    for (let i = 0; i < 4; i++) {
      playBass(now + offset + beatTime * i, bassNotes[beatCount % bassNotes.length]);
      beatCount++;
    }
    if (beatCount % 8 === 0) {
      playSynthPad(now + offset);
    }
  }

  scheduleLoop();
  const loopInterval = setInterval(scheduleLoop, beatTime * 4 * 1000);
  intervals.push(loopInterval);

  return {
    gainNode: masterGain,
    stop: () => {
      intervals.forEach(clearInterval);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
    },
  };
}

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [isVisible, setIsVisible] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const beatRef = useRef<{ gainNode: GainNode; stop: () => void } | null>(null);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (beatRef.current) {
      beatRef.current.gainNode.gain.setValueAtTime(newVolume, audioCtxRef.current!.currentTime);
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (beatRef.current) {
      beatRef.current.stop();
      beatRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopMusic();
    } else {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const beat = createGymBeat(ctx, volume);
      beatRef.current = beat;
      setIsPlaying(true);
    }
  }, [isPlaying, volume, stopMusic]);

  const handleClose = useCallback(() => {
    // Just hide the player; keep the music playing
    setIsVisible(false);
  }, []);

  // Mini button to reopen
  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-iron-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 hover:border-iron-red/50 transition-all duration-300 cursor-pointer shadow-lg"
        aria-label="Abrir player de música"
      >
        <Music size={16} className={isPlaying ? 'text-iron-red animate-pulse' : 'text-gray-400'} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-iron-dark/90 backdrop-blur-md border border-white/10 rounded-full pl-4 pr-1 py-2 shadow-xl shadow-black/30">
      <Music size={16} className={isPlaying ? 'text-iron-red animate-pulse' : 'text-gray-500'} />
      <span className="text-gray-300 text-xs font-medium hidden sm:inline">
        {isPlaying ? 'Tocando' : 'Música'}
      </span>

      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full red-gradient flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
      >
        {isPlaying ? <Volume2 size={18} className="text-white" /> : <VolumeX size={18} className="text-white" />}
      </button>

      {isPlaying && (
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-20 accent-iron-red cursor-pointer hidden md:block"
          aria-label="Volume"
        />
      )}

      <button
        onClick={handleClose}
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-iron-red hover:bg-white/5 transition-all duration-200 cursor-pointer"
        aria-label="Fechar player"
      >
        <X size={16} />
      </button>
    </div>
  );
}
