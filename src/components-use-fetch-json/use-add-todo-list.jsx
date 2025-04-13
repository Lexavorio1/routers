import { useState } from "react"

export const useAddTodoList = (setFlags) => {
    const [isCreating, setIsCreating] = useState(false)
    const onAdd = (title) => {
        setIsCreating(true)
        fetch('http://localhost:2016/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                title: title,
            }),
        })
        .then((response) => response.json())
        .then(()=>setFlags())
        .finally(()=>{
            setIsCreating(false)
        })
    }

    return {
        isCreating,
        onAdd,
    }
}