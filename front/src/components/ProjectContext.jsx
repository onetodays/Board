import React, { createContext, useState, useEffect ,useContext} from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  // const [user_id, setUserId] = useState(0);

  useEffect(() => {
   
      axios
      .get('/taskboard/get/')
      .then(response => {
        console.log(response.data);
        const savedProjects = JSON.parse(response.data) || [];
        console.log(savedProjects);
          setProjects(savedProjects);
          setCurrentProject(savedProjects[0]); // 设置第一个项目为当前项目
       
      })
      .catch(error => {
        console.log(error);
      });
      axios
      .get('/taskboard/getinfo/')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const addProject = (projectName) => {
    const newProject = {
      name: projectName,
      todoList: [],
      ongoingList: [],
      doneList: []
    };
    setProjects(prevProjects => {
      const updatedProjects = [...prevProjects, newProject];
      setCurrentProject(newProject);
      return updatedProjects;
    });
  };


  const updateProject = (updatedProject) => {
    const updatedProjects = projects.map(project =>
      project.name === updatedProject.name ? updatedProject : project
    );
    setProjects(updatedProjects);
    setCurrentProject(updatedProject);
  };

  return (
    <ProjectContext.Provider value={{ projects, currentProject, addProject, updateProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;

