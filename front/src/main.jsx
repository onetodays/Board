import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import SignIn from './components/SignIn';
import './index.css';
import App from './components/App';
import HomePage from './index'
import { ProjectProvider } from './components/ProjectContext';

// ReactDOM.render(
//   <React.StrictMode>
//     <ProjectProvider>
//       <App />
//     </ProjectProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//         <App />
//   </React.StrictMode>
// );
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <HomePage />
  </React.StrictMode>
);