import ColorPalette from 'ColorPalette';
import React from 'react';
import { State } from './ColorContainer';

interface Props {
  state: State;
}

const ColorPreview = ({ state }: Props) => {
  const { color } = state;

  return (
    <div className="color-preview">
      color preview
      <ColorPalette color={color} />
      <ColorPalette color={color} alpha={80} />
      <ColorPalette color={color} alpha={60} />
      <ColorPalette color={color} alpha={40} />
      <ColorPalette color={color} alpha={20} />
      <ColorPalette color={color} alpha={10} />
      <ColorPalette color={color} alpha={5} />
    </div>
  );
};

export default ColorPreview;
