import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import Canvas from './components/Canvas';
import { Provider } from 'react-redux';
import store from './utils/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Canvas />
      <ToastContainer autoClose={5000} />
    </Provider>
  );
}

export default App;