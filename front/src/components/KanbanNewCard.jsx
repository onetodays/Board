

import { comment } from 'postcss'
import React, { useState, useEffect, useRef } from 'react'

export default function KanbanNewCard({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [comments, setComment] = useState([])
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleAttachmentChange = (event) => {
    setAttachment(event.target.files[0])
  }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newCard = { 
        title, 
        description,
        attachment,
        status: new Date().toString(),
        comments,
      }
      onSubmit(newCard)
      setTitle('')
      setDescription('')
      setAttachment(null)
      setComment([])
    }
  }
  const inputElement = useRef(null)
  useEffect(() => {
    inputElement.current.focus()
  }, [])

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input ref={inputElement} type="text" value={title} onChange={handleTitleChange} placeholder="卡片标题" />
      </div>
      <div className="card-description">
        <textarea value={description} onChange={handleDescriptionChange} placeholder="卡片描述" />
      </div>
      <div className="card-attachment">
        <input type="file" onChange={handleAttachmentChange} />
      </div>
      <button onClick={() => onSubmit({ title, description, attachment, status: new Date().toString() ,comments})}>添加卡片</button>
    </li>
  )
}