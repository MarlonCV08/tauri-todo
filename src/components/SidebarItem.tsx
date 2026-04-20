import { Folder, FolderOpen, Trash2 } from "lucide-react"
import { deleteProject } from "../services/projects";

interface Props {
    id: number;
    name: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const SidebarItem = ({ id, name, isActive = false, onClick }: Props) => {
    return (
        <li className={`flex items-center justify-between p-2 rounded-lg cursor-pointer group hover:bg-neutral-800 ${isActive ? 'bg-neutral-500/50' : ''}`} onClick={onClick}>
            <div className="flex items-center gap-2 text-sm">
                {isActive ?
                    <FolderOpen size={18} />
                    :
                    <Folder size={18} />
                }
                {name}
            </div>
            <button
                className='opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:text-red-500'
                onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(id)
                }}
            >
                <Trash2 size={16} />
            </button>
        </li>
    )
}