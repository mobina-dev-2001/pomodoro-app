import { useState, useEffect, useRef , useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Howl } from "howler";
import beepSound from "../assets/sounds/beep.mp3"; 

export default function Timer({ duration = 1500 }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const alarmSound = useRef(null);

  useEffect(() => {
    let startTime, intervalId;
    if (isRunning) {
      startTime = Date.now() - (duration - timeLeft) * 1000;
      intervalId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimeLeft(Math.max(0, duration - elapsed));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, duration]);

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(false);
  }, [duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Sound functions
  useEffect(() => {
    alarmSound.current = new Howl({
      src: [beepSound],
      volume: 1,
      html5: true,
      onloaderror: (id, err) => console.error('Load error:', err),
      onplayerror: (id, err) => console.error('Play error:', err)
    });

    return () => {
      if (alarmSound.current) {
        alarmSound.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && alarmSound.current) {
      try {
        alarmSound.current.play();
      } catch (error) {
        console.error('Sound play failed:', error);
      }
    }
  }, [timeLeft]);

  // Button functions
  const pauseTimer = () => { setIsRunning(false) };
  const startTimer = () => { setIsRunning(true) };
  const resetTimer = () => { setIsRunning(false); setTimeLeft(duration) };

  // Styling
  const { font } = useTheme();
  const conditionalStyles = useMemo(() => {
    switch (font) {
      case "Kumbh Sans": return "tracking-[-5px] font-bold";
      case "Roboto Slab": return "tracking-normal font-bold";
      case "Space Mono": return "tracking-[-10px] font-normal";
      default: return "";
    }
  }, [font]);

  const strokeDashoffset = (1 - timeLeft / duration) * 100;

  return (
    <div className="relative grid place-items-center w-[clamp(18.75rem,64vw,_25.625rem)] aspect-square bg-gradient-to-tl from-rhino to-ebony rounded-full before:content-[''] before:absolute before:size-full before:rounded-full before:shadow-[-50px_-50px_100px_0_var(--color-cloud-burst),50px_50px_100px_0_var(--color-ebony-dark)] before:-z-1">
      <div className="grid place-items-center size-[90.2%] bg-mirage rounded-full">
        <div className="relative size-full">
          <span className="sr-only">
            {`${minutes} minutes and ${seconds} seconds remaining`}
          </span>
          <svg
            className="size-full -rotate-90"
            viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-label="Timer progress" role="progressbar" aria-valuenow={Math.round((1 - strokeDashoffset / 100) * 100)} aria-valuemin={0} aria-valuemax={100}
          >
            <circle
              className="stroke-current text-theme transition-[stroke-dashoffset] duration-1000 ease-linear will-change-[stroke-dashoffset] motion-reduce:transition-none"
              cx="18" cy="18" r="16" fill="none" strokeWidth="1.15" strokeDasharray="100" strokeDashoffset={strokeDashoffset} strokeLinecap="round"
            ></circle>
          </svg>

          <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full">
            <div
              className={`grid grid-cols-[30%_5%_30%] grid-rows-1 justify-center my-[.65rem] text-[clamp(5rem,_15vw,_6.25rem)] font-theme ${conditionalStyles}`}
              role="timer" aria-live="polite" aria-atomic="true"
            >
              <span className="justify-self-center">
                {minutes.toString().padStart(2, "0")}
              </span>
              <span className="justify-self-center">:</span>
              <span className="justify-self-center">
                {seconds.toString().padStart(2, "0")}
              </span>
            </div>

            <button
              className="text-[clamp(.875rem,_2vw,_1rem)] font-theme font-bold uppercase tracking-[15px] max-sm:tracking-[13.13px] cursor-pointer transition duration-250 ease-in-out hover:text-theme"
              onClick={ timeLeft === 0 ? resetTimer : isRunning ? pauseTimer : startTimer }
              aria-label={ timeLeft === 0 ? "Restart timer" : isRunning ? "Pause timer" : "Start timer" } aria-pressed={isRunning}
            >
              {timeLeft === 0 ? "Restart" : isRunning ? "Pause" : "Start"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
