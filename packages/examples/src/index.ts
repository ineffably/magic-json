import React from 'react';
import ReactDOM from 'react-dom/client';
import { Examples } from './Examples';

// examples uses React 18 as a dependency
const container = document.getElementById('examples');
const element = React.createElement(Examples);
ReactDOM.createRoot(container).render(element);