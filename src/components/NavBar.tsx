import { BrushCleaning } from "lucide-react"
import { clearCompleteTask } from "../services/tasks"

type FilterStatus = 'all' | 'pending' | 'in_progress' | 'completed'

interface NavBarProps {
    activeFilter: FilterStatus
    onFilterChange: (filter: FilterStatus) => void
    onClearCompleted: () => void
}

export const NavBar = ({ activeFilter, onFilterChange, onClearCompleted }: NavBarProps) => {
    const filters: { label: string; value: FilterStatus }[] = [
        { label: "All", value: "all" },
        { label: "Pendents", value: "pending" },
        { label: "In progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
    ]

    const handleClear = () => {
        clearCompleteTask().then(onClearCompleted)
    }

    return (
        <nav className="w-full flex justify-between items-center py-2">
            <ul className="flex border bg-neutral-800 border-neutral-600 rounded-lg p-2 gap-2">
                {filters.map(({ label, value }) => (
                    <li
                        key={value}
                        onClick={() => onFilterChange(value)}
                        className={`rounded px-4 py-1 cursor-pointer transition-colors ${
                            activeFilter === value ? "bg-neutral-900" : "hover:bg-neutral-700/70"
                        }`}
                    >
                        {label}
                    </li>
                ))}
            </ul>
            <button
                className="flex items-center gap-2 bg-neutral-800 border border-neutral-600 px-5 py-3 rounded-lg cursor-pointer hover:bg-neutral-700/70"
                onClick={handleClear}
            >
                Clear Completed
                <BrushCleaning size={20} />
            </button>
        </nav>
    )
}