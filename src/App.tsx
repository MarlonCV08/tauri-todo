import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { getDb } from "./lib/db";
import { ProjectView } from "./components/ProjectView";
import { getProjects } from "./services/projects";
import { AppHeader } from "./components/AppHeader";

interface Project {
  id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProject, setActiveProject] = useState<{ id: number; name: string } | null>(null)

  const loadProjects = async () => {
    const data = await getProjects()
    setProjects(data as Project[])
  }

  useEffect(() => {
    getDb()
    loadProjects()
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex h-full bg-neutral-900 text-neutral-100">
        <Sidebar
          projects={projects}
          reloadProjects={loadProjects}
          activeId={activeProject?.id ?? null}
          activeProject={activeProject}
          onSelect={setActiveProject}
        />

        <main className="flex-1">
          {activeProject ? (
            <ProjectView
              project={activeProject}
              reloadProjects={loadProjects}
              onProjectRenamed={(id, name) => setActiveProject({ id, name })}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-500">
              Selecciona un proyecto
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App;