
import React, { useState, useEffect, useContext } from 'react'
import AdminContext from '../context/AdminContext'
import Modal from './Modal'

const MINUTE = 60 * 1000
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const YEAR = DAY * 365

export default function KanbanCard({ title, status, description, attachment, comments,dragStart, onRemove, onUpdate }) {
  const [displayTime, setDisplayTime] = useState(status)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDescription, setModalDescription] = useState(description)
  const [modalComment, setModalComment] = useState('')
  
  const [attachmentData, setAttachmentData] = useState(attachment)
  const isAdmin = useContext(AdminContext)

  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status)
      let relativeTime = '刚刚'
      if (timePassed > MINUTE && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)}分钟前`
      } else if (timePassed > HOUR && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)}小时前`
      } else if (timePassed > DAY && timePassed < YEAR) {
        relativeTime = `${Math.ceil(timePassed / DAY)}天前`
      } else if (timePassed > YEAR) {
        relativeTime = `${Math.ceil(timePassed / YEAR)}年前`
      }
      setDisplayTime(relativeTime)
    }

    const intervalId = setInterval(updateDisplayTime, MINUTE)

    updateDisplayTime()

    return function cleanup() {
      clearInterval(intervalId)
    }
  }, [status])

  useEffect(() => {
    setAttachmentData(attachment)
  }, [attachment])

  const handleDragStart = (evt) => {
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('text/plain', title)
    dragStart && dragStart(evt)
  }

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleCommentChange = (event) => {
    setModalComment(event.target.value)
  }

  const handleCommentSubmit = () => {
    // setComments([...comments, modalComment])
    comments.push(modalComment)
    setModalComment('')
  }

  const handleDownloadAttachment = () => {
    if (attachmentData) {
      // 创建一个临时链接来下载附件
      const tempLink = document.createElement('a')
      tempLink.href = attachmentData.downloadUrl
      tempLink.setAttribute('download', attachmentData.name)
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
    }
  }

  return (
    <li className="kanban-card" draggable onDragStart={handleDragStart}>
      <div className="card-title">{title}</div>
      <div className="card-status">
        {displayTime}
        {onRemove && (
          <button onClick={() => onRemove({ title })}>X</button>
        )}
      </div>
      <div className="card-detail">
        <button onClick={handleCardClick}>+</button>
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <h2>{title}</h2>
          <p>状态: {status}</p>
          <p>创建时间: {displayTime}</p>
          <p id="description">详细描述:{modalDescription}</p>
          {attachmentData && (
            <div>
              <h3>附件:</h3>
              <p>{attachmentData.name}</p>
              <button onClick={handleDownloadAttachment}>下载附件</button>
            </div>
          )}
          <h3>评论:</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <label htmlFor="comment">评论:</label>
          <textarea id="comment" value={modalComment} onChange={handleCommentChange}></textarea>
          <button onClick={handleCommentSubmit}>提交评论</button>
        </Modal>
      </div>
    </li>
  )
}

