import Button from 'Button';
import React, { useEffect, useReducer } from 'react';
import ColorPicker from './ColorPicker';
import ColorPreview from './ColorPreview';

export type Action = {
  type: 'setColor';
  payload: { color: string };
};
export type State = {
  color: string;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setColor':
      state = { ...state, ...action.payload };
      return state;
    default:
      return state;
  }
};

interface Props {
  index: number;
  color: string;
  handleDelete: (index: number) => void;
  handleChange: (value: string, index: number) => void;
}
const ColorContainer = ({ index, color, handleDelete, handleChange }: Props) => {
  const [state, setState] = useReducer(reducer, { color });
  const handleClick = () => {
    handleDelete(index);
  };
  useEffect(() => {
    setState({
      type: 'setColor',
      payload: { color },
    });
  }, [color]);

  return (
    <div className="container">
      <ColorPicker index={index} state={state} handleChange={handleChange} />
      <ColorPreview state={state} />
      <Button onClick={handleClick}>삭제</Button>
    </div>
  );
};

export default ColorContainer;
