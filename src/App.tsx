import React, { useReducer } from 'react';
import './App.css';
import ColorPicker from './ColorPicker';
import ColorPreview from './ColorPreview';

export type Action = {
  type: 'setColor';
  payload: { color: string };
};
export type State = {
  color: string;
};

const initialState: State = {
  color: '#373eff',
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
function App() {
  const [state, setState] = useReducer(reducer, initialState);

  return (
    <div className="container">
      <ColorPicker state={state} setState={setState} />
      <ColorPreview state={state} />
    </div>
  );
}

export default App;
