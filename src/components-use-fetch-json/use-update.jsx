import { useState } from "react"

export const useUpdate = (setFlags) => {
    const [isUpdate, setIsUpdate] = useState(false)
    const onUpdate = (id, title) => {
        setIsUpdate(true)
        const newTitle = prompt("Введите новый текст дела", title)
        if (newTitle && newTitle.trim() !== "") {
            fetch(`http://localhost:2016/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                title: newTitle,
            }),
            })
            .then((delResponse) => delResponse.data)
            .then((delResponse)=>{
            console.log('Дело удалено', delResponse)
            setFlags()
        })
        .finally(()=>setIsUpdate(false))
        }
    }

    return { isUpdate, onUpdate }
}