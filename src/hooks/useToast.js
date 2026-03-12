import { useState } from 'react'

const useToast = () => {
  const [list, setList] = useState([])

  const add = (msg, type = 'info') => {
    const id = Date.now() + Math.random()
    setList((prev) => [...prev, { id, msg, type }])
    setTimeout(() => {
      setList((prev) => prev.filter((t) => t.id !== id))
    }, 4200)
  }

  const remove = (id) => setList((prev) => prev.filter((t) => t.id !== id))

  const toast = {
    success: (msg) => add(msg, 'success'),
    info: (msg) => add(msg, 'info'),
    warn: (msg) => add(msg, 'warn'),
  }

  return { list, remove, toast }
}

export default useToast
