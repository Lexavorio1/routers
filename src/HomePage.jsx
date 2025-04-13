import { useState } from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import {
  useUpdate,
  useDelete,
  AddTodoListForm,
  useAddTodoList,
  useGetTodoList
} from './components-use-fetch-json'
import styles from './App.module.css'

export const HomePage = () => {
  const [showForm, setShowForm] = useState(false)
  const toggleFormVisibility = () => {
    setShowForm(!showForm)
  }

  const debouncedSetSearchPhrase = debounce((value) => {
    setSearchPhrase(value)
  }, 300)

  const [flagLoading, setFlagLoading] = useState(false)
  const setFlags = () => setFlagLoading(!flagLoading)

  const { isDelete, onDelete } = useDelete(setFlags)
  const { isUpdate, onUpdate } = useUpdate(setFlags)
  const { isCreating, onAdd } = useAddTodoList(setFlags)
  const { todoList, isLoading } = useGetTodoList(flagLoading)
  
  const [searchPhrase, setSearchPhrase] = useState('')
  const [isSorted, setIsSorted] = useState(false)

  const handleAddPerson = async (todo) => {
    onAdd(todo)
    setShowForm(false)
    setFlags()
  }

  const filteredTodos = todoList.filter(todo =>
    todo.title.toLowerCase().includes(searchPhrase.toLowerCase())
  )

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (isSorted) {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const toggleSort = () => {
    setIsSorted(!isSorted)
  }

  const truncateText = (text, maxLength = 30) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  return (
    <div>
      <button
        className={styles.addButton}
        onClick={toggleFormVisibility}
      >
        {showForm ? 'Скрыть форму' : 'Добавить дело'}
      </button>

      {showForm && (
        <AddTodoListForm
          onAdd={handleAddPerson}
          onCancel={toggleFormVisibility}
        />
      )}
      <input
        type="text"
        placeholder="Поиск..."
        value={searchPhrase}
        onChange={(e) => debouncedSetSearchPhrase(e.target.value)}
        className={styles.searchInput}
      />

      <button onClick={toggleSort} className={styles.sortButton}>
        {isSorted ? 'Выключить сортировку' : 'Включить сортировку'}
      </button>

      <ul>
        {isLoading
          ? <div className={styles.loader}></div>
          : sortedTodos.map(({ id, title }) => (
              <li className={styles.list} key={id}>
                <Link to={`/task/${id}`} className={styles.taskLink}>
                  {truncateText(title)}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  )
}