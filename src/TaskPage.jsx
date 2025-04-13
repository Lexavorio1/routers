import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useUpdate, useDelete, useGetTodoList } from './components-use-fetch-json'
import styles from './App.module.css'

export const TaskPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [flagLoading, setFlagLoading] = useState(false)
  const setFlags = () => setFlagLoading(!flagLoading)
  
  const { isDelete, onDelete } = useDelete(setFlags)
  const { isUpdate, onUpdate } = useUpdate(setFlags)
  const { isLoading } = useGetTodoList(flagLoading)
  
  const [task, setTask] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:2016/todos/${id}`)
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        setTask(data)
      })
  }, [id])

  if (isLoading) {
    return <div className={styles.loader}></div>
  }

  if (!task) {
    return null
  }

  return (
    <div className={styles.taskPage}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Назад
      </button>
      
      <h1 className={styles.taskTitle}>{task.title}</h1>
      
      <div className={styles.taskActions}>
        <button 
          onClick={() => onUpdate(task.id, task.title)}
          disabled={isUpdate || isDelete}
          className={styles.updateButton}
        >
          {isUpdate ? 'Обновление...' : 'Изменить'}
        </button>
        
        <button
          disabled={isDelete || isUpdate}
          className={styles.deleteButton}
          onClick={async () => {
            if (window.confirm('Вы уверены, что хотите удалить это дело?')) {
              await onDelete(task.id)
              navigate('/')
            }
          }}
        >
          {isDelete ? 'Удаление...' : 'Удалить'}
        </button>
      </div>
    </div>
  )
}