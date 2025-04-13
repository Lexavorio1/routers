import { Link } from 'react-router-dom'
import styles from './App.module.css'

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 - Страница не найдена</h1>
      <p>Запрошенная страница не существует.</p>
      <Link to="/" className={styles.homeLink}>Вернуться на главную</Link>
    </div>
  )
}