import { useEffect, useState, useRef } from "react"
import { getTasks } from "../services/tasks"
import { updateProject } from "../services/projects"
import { NewTask } from "./NewTask"
import { Task } from "./Task"
import { NavBar } from "./NavBar"
import { FolderOpen, Pen, Check, X } from "lucide-react"

type FilterStatus = 'all' | 'pending' | 'in_progress' | 'completed'

interface Task {
  id: number
  description: string
  status: 'pending' | 'in_progress' | 'completed'
}

export const ProjectView = ({
  project,
  onProjectRenamed,
  reloadProjects
}: {
  project: { id: number; name: string },
  onProjectRenamed?: (id: number, name: string) => void,
  reloadProjects: () => void
}) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(project.name)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadTasks = () => {
    getTasks(project.id).then((data) => setTasks(data as Task[]))
  }

  useEffect(() => {
    loadTasks()
  }, [project.id])

  useEffect(() => {
    if (isEditingName) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditingName])

  const handleStartEditing = () => {
    setEditedName(project.name)
    setIsEditingName(true)
  }

  const handleConfirm = async () => {
    const trimmed = editedName.trim()

    if (!trimmed || trimmed === project.name) {
      setIsEditingName(false)
      return
    }

    await updateProject(project.id, trimmed)

    // 🔥 sincroniza todo
    onProjectRenamed?.(project.id, trimmed)
    await reloadProjects()

    setIsEditingName(false)
  }

  const handleCancel = () => {
    setEditedName(project.name)
    setIsEditingName(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleConfirm()
    if (e.key === 'Escape') handleCancel()
  }

  const filteredTasks = activeFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === activeFilter)

  return (
    <div className="grid grid-cols-12 w-full h-full min-h-0">
      <div className="col-span-10 col-start-2 md:col-span-8 md:col-start-3 p-10 gap-8 flex flex-col min-h-0 h-full">
        <section className="flex w-full items-center gap-5">
          <div className="bg-neutral-100 rounded-lg p-2">
            <FolderOpen color="#262626" />
          </div>

          <div>
            <div className="flex gap-2 items-center">
              {isEditingName ? (
                <>
                  <input
                    ref={inputRef}
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ width: `${editedName.length}ch` }}
                    className="text-2xl font-normal leading-tight rounded outline-none bg-transparent min-w-8"
                  />
                  <button onClick={handleConfirm} className="text-green-600 hover:text-green-700">
                    <Check size={16} />
                  </button>
                  <button onClick={handleCancel} className="text-red-400 hover:text-red-500">
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl">{project.name}</h2>
                  <button onClick={handleStartEditing} className="hover:text-neutral-600 cursor-pointer">
                    <Pen size={14} />
                  </button>
                </>
              )}
            </div>

            <span className="text-neutral-500 text-sm">
              {tasks.length} Pendientes
            </span>
          </div>
        </section>

        <NewTask projectId={project.id} onTaskCreated={loadTasks} />

        <NavBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onClearCompleted={loadTasks}
        />

        {filteredTasks.length === 0 ? (
          <div className="text-neutral-500 flex-1 flex items-center justify-center">
            No hay tareas para este proyecto.
          </div>
        ) : (
          <ul className="w-full flex-1 flex flex-col gap-3 rounded-lg overflow-auto min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                status={task.status}
                description={task.description}
                onStatusChange={loadTasks}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}