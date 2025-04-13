import { useState } from 'react'
import styles from './Auth.module.css'


export const AddTodoListForm = ({ onAdd, onCancel }) => {
    const [todo, setTodo] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (todo.trim() === '') return
      onAdd(todo)
      setTodo('')
    }
  
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="todo">Дело:</label>
        <input
          type="text"
          id="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className={styles.input}
        />
        <div className={styles.btn}>
          <button type="submit" className={styles.button}>Добавить</button>
          <button type="button" className={styles.button} onClick={() => {
            onCancel();
            setTodo('');
          }}>Отмена</button>
        </div>
      </form>
    )
  }