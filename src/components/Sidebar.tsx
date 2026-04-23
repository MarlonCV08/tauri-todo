import { useState } from "react"
import { Plus } from "lucide-react"
import { SidebarItem } from "./SidebarItem"
import { NewProject } from "./NewProject"
import { createProject } from "../services/projects"

interface Project {
  id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

interface Props {
  projects: Project[]
  reloadProjects: () => void
  activeId: number | null
  activeProject: { id: number; name: string } | null
  onSelect: (project: { id: number; name: string }) => void
}

export const Sidebar = ({ projects, reloadProjects, activeId, onSelect }: Props) => {
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = async (name: string) => {
    await createProject(name)
    await reloadProjects()
    setIsCreating(false)
  }

  return (
    <div className="w-64 h-screen bg-neutral-900 p-4 border-r border-neutral-800">
      <section className="flex items-center justify-between mb-4">
        <h1>Projects</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="rounded p-1 bg-neutral-500 hover:bg-neutral-500/80 transition-colors cursor-pointer"
        >
          <Plus size={18} />
        </button>
      </section>

      <nav className="flex flex-col gap-2">
        <ul className="flex flex-col gap-1">
          {isCreating && (
            <NewProject
              onSubmit={handleCreate}
              onCancel={() => setIsCreating(false)}
            />
          )}

          {projects.map((project) => (
            <SidebarItem
              key={project.id}
              id={project.id}
              name={project.name}
              isActive={project.id === activeId}
              onClick={() => onSelect({ id: project.id, name: project.name })}
              onDelete={reloadProjects}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}