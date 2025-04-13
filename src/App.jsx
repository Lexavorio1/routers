import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import { HomePage } from './HomePage'
import { TaskPage } from './TaskPage'
import { NotFoundPage } from './NotFoundPage'
import styles from './App.module.css'

export const App = () => {

  const routes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/task/:id', element: <TaskPage /> },
    { path: '/404', element: <NotFoundPage />},
    { path: '*', element: <Navigate to="/404" replace /> },
])

  return (
    <div className={styles.app}>
      {routes}
    </div>
  )
}