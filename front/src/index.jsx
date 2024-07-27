import React from 'react';

import './index.css';
import App from './components/App';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectContext, { ProjectProvider } from './components/ProjectContext';
// import reportWebVitals from './reportWebVitals';


  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
const HomePage = () => {

    return (
        <Router>
             {/* <ProjectProvider> */}
          <Routes>
            <Route path="/" exact element={<SignIn />} />
         
              <Route path="/home" exact element={
                <ProjectProvider>
                <App />
                </ProjectProvider>
                } />
                
          </Routes>
          {/* </ProjectProvider> */}
        </Router>
      );

};

export default HomePage;




