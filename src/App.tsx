import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidedbar";
import { getDb } from "./lib/db";
import { ProjectView } from "./components/ProjectView";

function App() {

  useEffect(() => {
    getDb()
  }, [])

  const [activeProject, setActiveProject] = useState<{ id: number; name: string } | null>(null)

  return (
    <div className="flex h-screen bg-neutral-900 text-neutral-100">
      <Sidebar activeId={activeProject?.id ?? null} onSelect={setActiveProject} />
      <main className="flex-1">
        {activeProject ? (
          <ProjectView project={activeProject} />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500">
            Selecciona un proyecto
          </div>
        )}
      </main>
    </div>
  )
}

export default App;
