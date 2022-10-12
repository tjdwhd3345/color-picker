import React from 'react';
import { State } from './ColorContainer';

interface Props {
  index: number;
  state: State;
  handleChange: (value: string, index: number) => void;
}

const ColorPicker = ({ index, state, handleChange }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log({ value });
    handleChange(value, index);
  };

  return (
    <div className="color-picker">
      color picker
      <input type="color" onChange={onChange} value={state.color}></input>
    </div>
  );
};

export default ColorPicker;
