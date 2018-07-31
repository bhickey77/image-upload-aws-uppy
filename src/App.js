import React from 'react';
import UploadFile from './components/UploadFile/UploadFile';

import './styles/main.css';
import '@uppy/drag-drop/dist/style.css';

const App = () => (
  <div className="container">
    <UploadFile />
  </div>
);

export default App;

