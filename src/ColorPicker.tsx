import React, { useEffect, useRef } from 'react';
import { State } from './ColorContainer';

interface Props {
  index: number;
  state: State;
  handleChange: (value: string, index: number) => void;
}

const ColorPicker = ({ index, state, handleChange }: Props) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log({ value });
    handleChange(value, index);
    if (labelRef && labelRef.current) {
      labelRef.current.style.backgroundColor = value;
    }
  };
  
  useEffect(() => {
    if (labelRef && labelRef.current) {
      labelRef.current.style.backgroundColor = state.color;
    }
  }, [state.color])
  
  return (
    <div className="color-picker">
      color picker
      <div>
        <input className="color-picker-input" id={`color-picker-${index}`} type="color" onChange={onChange} value={state.color}></input>
        <label ref={labelRef} htmlFor={`color-picker-${index}`}></label>
      </div>
    </div>
  );
};

export default ColorPicker;
