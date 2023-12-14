import { useEffect, useState } from "react";

export const useCurrentTime = () => {
  const [hours, setHours] = useState(-1);
  const [minutes, setMinutes] = useState(-1);
  const [seconds, setSeconds] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      const time = new Date();
      setHours(time.getHours());
      setMinutes(time.getMinutes());
      setSeconds(time.getSeconds());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [seconds]);

  const isLoading = hours == -1 && minutes == -1 && seconds == -1;

  return { hours, minutes, seconds, isLoading };
};
