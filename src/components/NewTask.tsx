import { Plus } from "lucide-react"
import { useState } from "react"
import { createTask } from "../services/tasks"

export const NewTask = ({
  projectId,
  onTaskCreated,
}: {
  projectId: number
  onTaskCreated: () => void
}) => {
  const [task, setTask] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!task.trim()) return

        createTask(projectId, task)
        setTask("")
        onTaskCreated()
      }}
      className="w-full flex items-center bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 shadow-sm"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Añadir tarea a bandeja..."
        className="flex-1 bg-transparent text-sm text-white placeholder-neutral-400 outline-none"
      />

      <button
        type="submit"
        className="ml-2 flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors"
      >
        <Plus size={18} />
      </button>
    </form>
  )
}