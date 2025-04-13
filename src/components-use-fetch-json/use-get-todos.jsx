import { useState, useEffect } from "react"

export const useGetTodoList = (flagLoading) => {

    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
      useEffect(()=>{
        setIsLoading(true)
        fetch('http://localhost:2016/todos')
              .then((loadedData)=> loadedData.json())
              .then((loadedProducts)=>{
                setTodoList(loadedProducts)
              })
              .finally(()=>setIsLoading(false))
      }, [flagLoading])

      return { todoList, isLoading}
}