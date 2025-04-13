import { useState } from "react"

export const useDelete = (setFlags) => {
    const [isDelete, setIsDelete] = useState(false)
    const onDelete = (id) => {
        setIsDelete(true)
        fetch(`http://localhost:2016/todos/${id}`, {
            method: "DELETE",
        })
        .then((delResponse) => delResponse.json())
        .then((delResponse)=>{
            console.log('Дело удалено', delResponse)
            setFlags()
        })
        .finally(()=>setIsDelete(false))
    }

    return { isDelete, onDelete }
}