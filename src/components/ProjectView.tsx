import { useEffect, useState } from "react"
import { getTasks } from "../services/tasks"
import { NewTask } from "./NewTask"
import { Task } from "./Task"
import { NavBar } from "./NavBar"

type FilterStatus = 'all' | 'pending' | 'in_progress' | 'completed'

interface Task {
    id: number
    description: string
    status: 'pending' | 'in_progress' | 'completed'
}

export const ProjectView = ({ project }: { project: { id: number; name: string } }) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')

    const loadTasks = () => {
        getTasks(project.id).then((data) => setTasks(data as Task[]))
    }

    useEffect(() => {
        loadTasks()
    }, [project.id])

    const filteredTasks = activeFilter === 'all'
        ? tasks
        : tasks.filter((task) => task.status === activeFilter)

    return (
        <div className="grid grid-cols-12 w-full h-screen">
            <div className="col-span-8 col-start-3 p-10 gap-8 flex flex-col items-center min-h-0">
                <h2 className="text-lg font-medium">{project.name}</h2>

                <NewTask projectId={project.id} onTaskCreated={loadTasks} />
                <NavBar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    onClearCompleted={loadTasks}
                />

                {filteredTasks.length === 0 ? (
                    <div className="text-neutral-500 h-full flex items-center justify-center">No hay tareas para este proyecto.</div>
                ) : (
                    <ul className="w-full flex flex-col gap-3 rounded-lg overflow-auto min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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