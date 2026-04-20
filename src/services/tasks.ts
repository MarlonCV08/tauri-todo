import { getDb } from "../lib/db"

export const getTasks = async (projectId: number) => {
    const db = await getDb()
    return await db.select('SELECT * FROM tasks WHERE project_id = ?', [projectId])
}

export const createTask = async (projectId: number, task: string) => {
    const db = await getDb()
    await db.execute('INSERT INTO tasks (project_id, description) VALUES (?, ?)', [projectId, task])
    return 'Task created successfully'
}