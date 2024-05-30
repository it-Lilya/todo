import React from 'react';
import { createRoot } from 'react-dom/client';
import Body from './components/Body/Body';
import './index.css'

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);
root.render(<Body />);