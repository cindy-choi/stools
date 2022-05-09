import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div<{ disabled: boolean }>`
  ${props => props.disabled ? ' > * { color: var(--disable); cursor: default; }' : '' }

  .display {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 4rem;
    font-weight: 500;
    padding: 12px;
    text-align: center;

    p { margin: 0 8px; }
  }

  .actions {
    margin: 2rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
  }
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  border: 4px solid var(--black);
  padding: 36px;
  box-shadow: 7px 5px 0 0 var(--black);
  transition: .3s ease;
  margin-bottom: 12px;
  color: var(--black);

  &:hover:not(.disable) {
    transform: scale(1.2);
    background: var(--secondary);
  }
  &:focus:not(.disable), &:active:not(.disable) {
    transform: scale(1.1);
  }

  &.disable {
    border: 4px solid var(--disable);
    box-shadow: 7px 5px 0 0 var(--disable);
    color: var(--disable);
    cursor: default;
  }
`;

export function Timer({ disabled = false, onStart, onChange }: { disabled?: boolean, onChange: (counter: number, start: Date, end: Date) => void, onStart?: () => void }) {
  const [play, setPlay] = useState<boolean>(false);
  const [second, setSecond] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const [hour, setHour] = useState<string>('00');
  const [counter, setCounter] = useState<number>(0);
  const [start, setStart] = useState<Date>(new Date());

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (play) {
      onStart && onStart();
      intervalId = setInterval(() => {
        const _second = (counter % 60) + 1;
        const _minute = Math.floor(counter / 60);
        const _hour = Math.floor(counter / 3600);

        setSecond(_second >= 10 ? `${_second}` : `0${_second}`);
        setMinute(_minute >= 10 ? `${_minute}` : `0${_minute}`);
        setHour(_hour >= 10 ? `${_hour}` : `0${_hour}`);

        setCounter(counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [play, counter]);

  const handlePlay = () => {
    if (disabled) return;

    setPlay(!play);
    setStart(new Date());
  };

  const handleStop = () => {
    if (!counter) return;
    if (disabled) return;

    onChange && onChange(counter, start, new Date());

    setCounter(0);
    setSecond('00');
    setMinute('00');
    setHour('00');
    setPlay(false);
  };

  return (
    <TimerWrapper disabled={disabled}>
      <div className="display">
        <div className="hour">{ hour }</div>
        <p> : </p>
        <div className="minute">{ minute }</div>
        <p> : </p>
        <div className="second">{ second }</div>
      </div>

      <div className="actions">
        <IconButton className={(disabled) ? 'disable' : ''} onClick={handlePlay}>
          { !play ?  <span className="material-icons"> play_arrow </span> : <span className="material-icons"> pause </span> }
        </IconButton>

        <IconButton className={(!counter || disabled) ? 'disable' : ''} onClick={handleStop}>
          <span className="material-icons"> stop </span>
        </IconButton>
      </div>
    </TimerWrapper>
  );
};

export default Timer;
