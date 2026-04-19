import { Folder, FolderOpen } from "lucide-react"

export const SidebarItem = ({ name, isActive = false, onClick } : { name: string, isActive?: boolean, onClick?: () => void }) => {
    return (
        <li className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-neutral-800 ${isActive ? 'bg-neutral-500/50' : ''}`} onClick={onClick}>
            <div className="flex items-center gap-2 text-sm">
                {isActive ?
                    <FolderOpen size={18} />
                :
                    <Folder size={18} />
                }
                {name}
            </div>
        </li>
    )
}