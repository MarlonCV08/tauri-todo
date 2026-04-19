import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { SidebarItem } from "./SidebarItem"
import { getProjects } from "../services/projects"

interface Project {
  id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export const Sidebar = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    getProjects().then((data) => setProjects(data as Project[]))
  }, [])

  return (
    <div className="w-64 h-screen bg-neutral-900 p-4 border-r border-neutral-800">
      <section className="flex items-center justify-between mb-4">
        <h1>Projects</h1>
        <button className='rounded p-1 bg-neutral-500 hover:bg-neutral-500/80 transition-colors cursor-pointer'>
          <Plus size={18} />
        </button>
      </section>
      <nav className="flex flex-col gap-2">
        <ul className="flex flex-col gap-1">
          {projects.map((project) => (
            <SidebarItem
              key={project.id}
              name={project.name}
              isActive={project.id === activeId}
              onClick={() => setActiveId(project.id)}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}