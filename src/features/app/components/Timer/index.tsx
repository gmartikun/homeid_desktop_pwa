import { FC, useState, useEffect, useMemo, memo } from "react";
import format from "date-fns/format";
import addSeconds from "date-fns/addSeconds";

const TimerRaw: FC<TimerProps> = (props) => {
  const { time = 1, className, onTimerOver, isPlus = false } = props;
  const [counter, setCounter] = useState(time);

  const counterTime = useMemo(() => {
    return format(addSeconds(new Date(0), counter), "mm:ss");
  }, [counter]);

  useEffect(() => {
    if (counter === 0 && onTimerOver) onTimerOver();
  }, [counter, onTimerOver]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (isPlus) {
        setCounter((prevState) => prevState + 1);
      } else {
        setCounter((prevState) => prevState - 1);
      }

      setTimeout(tick, 1000);
    };

    tick();

    return () => clearTimeout(timer);
  }, [time, isPlus]);

  return <span className={className}>{counterTime}</span>;
};

type TimerProps = {
  time: number;
  className?: string;
  isPlus?: boolean;
  onTimerOver?: () => void;
};

export const Timer = memo(TimerRaw);
export default Timer;
