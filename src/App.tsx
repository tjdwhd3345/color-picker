import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { getItemFromStorage, setItemToStorage } from './lib/storage';
import ColorContainer from './ColorContainer';

export type Action = {
  type: 'setColor';
  payload: { color: string };
};
export type State = {
  colors: string[];
};

const initialState: State = {
  colors: ['#373eff'],
};

function App() {
  const [state, setState] = useState(initialState);

  const handleClick = () => {
    setState((prev) => ({ colors: ['#373eff', ...prev.colors] }));
  };
  const handleDelete = (index: number) => {
    setState((prev) => ({ colors: prev.colors.filter((_, idx) => idx !== index) }));
  };
  const handleChange = (value: string, index: number) => {
    setState((prev) => ({
      colors: prev.colors.map((color, idx) => (idx === index ? value : color)),
    }));
  };

  useEffect(() => {
    setState(() => ({ colors: getItemFromStorage() }));
  }, []);
  useEffect(() => {
    setItemToStorage([...state.colors]);
  }, [state.colors]);

  const clearRipple = (rippleRef: HTMLDivElement) => {
    const circle = document.querySelectorAll('.ripple-circle');
    if (circle.length > 0) {
      if (timerId !== null) clearTimeout(timerId);
      timerId = setTimeout(() => {
        rippleRef.innerHTML = '';
      }, 2000);
    }
  };
  let timerId: NodeJS.Timeout | null = null;
  const rippleRef = useRef<HTMLDivElement>(null);
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleRef && rippleRef.current) {
      if (rippleRef.current.parentElement) {
        const { clientX, clientY } = e;
        console.log({ clientX, clientY });
        // button.ripple-button
        const button = rippleRef.current.parentElement;
        const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = button;
        console.log({ offsetLeft, offsetTop, offsetHeight, offsetWidth });

        const diameter = Math.max(offsetWidth, offsetHeight);
        const radius = diameter / 2;
        console.log({ diameter, radius });
        const circle = document.createElement('span');
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${clientX - offsetLeft - radius}px`;
        circle.style.top = `${clientY - offsetTop - radius}px`;
        circle.classList.add('ripple-circle');

        rippleRef.current.appendChild(circle);
        clearRipple(rippleRef.current);
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <button type="button" onClick={handleClick}>
          추가
        </button>
        {state.colors.map((color, index) => (
          <ColorContainer
            key={index}
            index={index}
            color={color}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
        ))}
      </div>
      <button className="ripple-button" onClick={handleRipple}>
        Click Me
        <div className="ripple-wrapper" ref={rippleRef} />
      </button>
    </>
  );
}

export default App;
