

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProjectContext, { ProjectProvider } from './ProjectContext';
import ProjectSelector from './ProjectSelector';
import KanbanBoard from './KanbanBoard';
import AdminContext from '../context/AdminContext';
import logo from './logo.svg';
import './App.css';

function App() {
  const { currentProject, setCurrentProject, addProject,  updateProject, projects } = useContext(ProjectContext);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveCards = () => {
    if (currentProject) {
      updateProject(currentProject);
      axios
        .post('/taskboard/save', {
          data: JSON.stringify(projects),
        })
        .then(response => {
          if (response.data === 'success') {
            alert('保存成功');
          }
        })
        .catch(error => {
          // 处理错误
          alert('保存失败');
        });
    }
  };

  const handleAdd = (column, newCard) => {
    if (!currentProject) return;

    const updatedProject = { ...currentProject };

    if (column === 'todo') updatedProject.todoList.push(newCard);
    if (column === 'ongoing') updatedProject.ongoingList.push(newCard);
    if (column === 'done') updatedProject.doneList.push(newCard);

    updateProject(updatedProject);
  };

  const handleRemove = (column, cardToRemove) => {
    if (!currentProject) return;

    const updatedProject = { ...currentProject };

    if (column === 'todo') {
      updatedProject.todoList = updatedProject.todoList.filter(item => item.title !== cardToRemove.title);
    } else if (column === 'ongoing') {
      updatedProject.ongoingList = updatedProject.ongoingList.filter(item => item.title !== cardToRemove.title);
    } else if (column === 'done') {
      updatedProject.doneList = updatedProject.doneList.filter(item => item.title !== cardToRemove.title);
    }

    updateProject(updatedProject);
  };

  const handleToggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <ProjectProvider>
      <div className="App">
        <header className="App-header">
          <h1>
            我的看板
            <button onClick={handleSaveCards}>保存</button>
          </h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <AdminContext.Provider value={isAdmin}>
          <ProjectSelector 
            onAddProject={addProject} 
            onSelectProject={setCurrentProject} 
            projects={projects} 
            currentProject={currentProject} 
          />
          {currentProject && (
            <KanbanBoard
              loading={loading}
              todoList={currentProject.todoList}
              ongoingList={currentProject.ongoingList}
              doneList={currentProject.doneList}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          )}
        </AdminContext.Provider>
      </div>
    </ProjectProvider>
  );
}

export default App;
