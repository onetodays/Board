

import React, { useState} from 'react';
export default function ProjectSelector({ onAddProject, onSelectProject, projects, currentProject }) {
  const [newProjectName, setNewProjectName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      onAddProject(newProjectName.trim()); // 调用 addProject 函数
      setNewProjectName('');
      setIsModalOpen(false); // 添加项目后关闭弹窗
    }
  };



  return (
    <div className="project-selector">
      <h2>选择或添加项目</h2>
      <button onClick={() => setIsModalOpen(true)} className="open-modal-button">选择项目</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>选择一个项目</h3>
            <ul>
              {projects.map(project => (
                <li
                  key={project.name}
                  onClick={() => {
                    onSelectProject(project);
                    setIsModalOpen(false); // 选择项目后关闭弹窗
                  }}
                  className={currentProject?.name === project.name ? 'selected' : ''}
                >
                  {project.name}
                
                </li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)} className="close-modal-button">关闭</button>
          </div>
        </div>
      )}

      <input
        type="text"
        value={newProjectName}
        onChange={e => setNewProjectName(e.target.value)}
        placeholder="新项目名称"
      />
      <button onClick={handleAddProject}>添加项目</button>
    </div>
  );
}
