import { useEffect } from "react";
import "./App.css";
import { Sidebar } from "./components/Sidedbar";
import { getDb } from "./lib/db";

function App() {

  useEffect(() => {
    getDb()
  }, [])

  return (
    <main className='bg-neutral-900 text-neutral-300'>
      <Sidebar />
    </main>
  );
}

export default App;
