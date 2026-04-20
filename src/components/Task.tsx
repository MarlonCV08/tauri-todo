interface Props {
    status: boolean;
    description: string;
}
export const Task = ({ status, description }: Props) => {
    return (
        <li className="p-4 rounded-lg bg-neutral-800">
            <input type="checkbox" checked={status} />
            <span> {description} </span>
        </li>
    )
}