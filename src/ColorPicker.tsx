import React, { Dispatch } from 'react';
import { Action, State } from './App';

interface Props {
  state: State;
  setState: Dispatch<Action>;
}

const ColorPicker = ({ state, setState }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState({ type: 'setColor', payload: { color: value } });
  };

  return (
    <div className="color-picker">
      color picker
      <input type="color" onChange={handleChange} value={state.color}></input>
    </div>
  );
};

export default ColorPicker;
