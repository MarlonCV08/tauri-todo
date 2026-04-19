import { getDb } from "../lib/db"

export const getProjects = async () => {
    const db = await getDb()
    return await db.select('SELECT * FROM projects')
}

export const createProject = async (name: string) => {
    const db = await getDb()
    await db.execute('INSERT INTO projects (name) VALUES (?)', [name])
    return 'Project created successfully'
}

export const updateProject = async (id: number, name: string) => {
    const db = await getDb()
    await db.execute('UPDATE projects SET name = ?, updated_at = datetime("now") WHERE id = ?', [name, id])
    return 'Project updated successfully'
}

export const deleteProject = async (id: number) => {
    const db = await getDb()
    await db.execute('DELETE FROM projects WHERE id = ?', [id])
    return 'Project deleted successfully'
}