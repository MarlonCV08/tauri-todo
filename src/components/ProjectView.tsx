// src/components/ProjectView.tsx
import { useEffect, useState } from "react"
import { getTasks } from "../services/tasks"
import { NewTask } from "./NewTask"
import { Task } from "./Task"
import { NavBar } from "./NavBar"

interface Task {
    id: number
    description: string
    status: boolean
}

export const ProjectView = ({ project }: { project: { id: number; name: string } }) => {
    const [tasks, setTasks] = useState<Task[]>([])

    const loadTasks = () => {
        getTasks(project.id).then((data) => setTasks(data as Task[]))
    }

    useEffect(() => {
        loadTasks()
    }, [project.id])

    return (
        <div className="grid grid-cols-12 w-full">
            <div className="col-span-8 col-start-3 p-10 gap-8 flex flex-col items-center">
                <h2 className="text-lg font-medium">{project.name}</h2>

                <NewTask projectId={project.id} onTaskCreated={loadTasks} />
                <NavBar />

                {tasks.length === 0 ? (
                    <div className="text-neutral-500">No hay tareas para este proyecto.</div>
                ) : (
                    <ul className="w-full flex flex-col gap-2">
                        {tasks.map((task) => (
                            <Task status={task.status} description={task.description}  />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}