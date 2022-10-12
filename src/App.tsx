import React, { useEffect, useState } from 'react';
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

  return (
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
  );
}

export default App;
