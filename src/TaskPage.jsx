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
  const { todoList, isLoading } = useGetTodoList(flagLoading)
  
  const [task, setTask] = useState(null)

  useEffect(() => {
    if (todoList.length > 0) {
      const foundTask = todoList.find(t => t.id.toString() === id)
      if (foundTask) {
        setTask(foundTask)
      } else {
        navigate('/404')
      }
    }
  }, [todoList, id, navigate])

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
          onClick={() => {
            if (window.confirm('Вы уверены, что хотите удалить это дело?')) {
              onDelete(task.id)
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