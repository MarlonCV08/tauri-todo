import { BrushCleaning } from "lucide-react"

export const NavBar = () => {
    return (
        <nav className="w-full flex justify-between items-center p-2">
            <ul className="flex border bg-neutral-800 border-neutral-600 rounded-lg p-2 gap-2">
                <li className="rounded px-4 py-1 bg-neutral-900">All</li>
                <li className="rounded px-4 py-1 bg-neutral-900">Pendents</li>
                <li className="rounded px-4 py-1 bg-neutral-900">In progress</li>
                <li className="rounded px-4 py-1 bg-neutral-900">Completed</li>
            </ul>
            <button className="flex items-center gap-2 bg-neutral-800 px-5 py-3 rounded-lg cursor-pointer hover:bg-neutral-700">
                Clear Completed
                <BrushCleaning size={20}/>
            </button>
        </nav>
    )
}