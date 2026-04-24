import { useState, useRef, useEffect } from "react"
import { BrushCleaning, ChevronDown } from "lucide-react"
import { clearCompleteTask } from "../services/tasks"

type FilterStatus = 'all' | 'pending' | 'in_progress' | 'completed'

interface NavBarProps {
    activeFilter: FilterStatus
    onFilterChange: (filter: FilterStatus) => void
    onClearCompleted: () => void
}

export const NavBar = ({ activeFilter, onFilterChange, onClearCompleted }: NavBarProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const filters: { label: string; value: FilterStatus }[] = [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "In progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
    ]

    const activeLabel = filters.find(f => f.value === activeFilter)?.label ?? "All"

    const handleClear = () => {
        clearCompleteTask().then(onClearCompleted)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <nav className="w-full flex justify-between items-center py-2 gap-2">

            {/* Dropdown — visible below 768px */}
            <div className="relative lg:hidden" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="flex items-center gap-2 text-xs bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 cursor-pointer hover:bg-neutral-700/70 transition-colors"
                >
                    {activeLabel}
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {dropdownOpen && (
                    <ul className="absolute top-full mt-1 left-0 z-10 bg-neutral-800 border border-neutral-600 rounded-lg p-1 flex flex-col gap-1 min-w-35">
                        {filters.map(({ label, value }) => (
                            <li
                                key={value}
                                onClick={() => {
                                    onFilterChange(value)
                                    setDropdownOpen(false)
                                }}
                                className={`rounded px-4 py-1.5 cursor-pointer transition-colors text-xs ${
                                    activeFilter === value ? "bg-neutral-900" : "hover:bg-neutral-700/70"
                                }`}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Pills — visible from 768px */}
            <ul className="hidden lg:flex border bg-neutral-800 border-neutral-600 rounded-lg p-2 gap-2">
                {filters.map(({ label, value }) => (
                    <li
                        key={value}
                        onClick={() => onFilterChange(value)}
                        className={`text-xs rounded px-4 py-1 cursor-pointer transition-colors ${
                            activeFilter === value ? "bg-neutral-900" : "hover:bg-neutral-700/70"
                        }`}
                    >
                        {label}
                    </li>
                ))}
            </ul>

            {/* Clear button */}
            <button
                className="flex items-center gap-2 text-xs bg-neutral-800 border border-neutral-600 px-5 py-3 rounded-lg cursor-pointer hover:bg-neutral-700/70 transition-colors whitespace-nowrap"
                onClick={handleClear}
                title="Clear Completed"
            >
                <span className="hidden xl:inline">Clear Completed</span>
                <BrushCleaning size={16} />
            </button>
        </nav>
    )
}