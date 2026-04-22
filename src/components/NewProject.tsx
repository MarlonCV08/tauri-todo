import { useEffect, useRef, useState } from "react"

interface Props {
  onSubmit: (name: string) => Promise<void>
  onCancel: () => void
}

export const NewProject = ({ onSubmit, onCancel }: Props) => {
  const [name, setName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async () => {
    const trimmed = name.trim()
    if (!trimmed) return
    await onSubmit(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit()
    if (e.key === "Escape") onCancel()
  }

  return (
    <li className="flex items-center gap-1">
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Project name..."
        className="flex-1 min-w-0 bg-neutral-800 text-sm text-white placeholder-neutral-500 rounded-lg px-2 py-1.5 outline-none border border-neutral-600 focus:border-neutral-400"
      />
    </li>
  )
}