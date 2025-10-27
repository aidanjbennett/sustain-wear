import { db } from './prisma'

export async function getUsers() {
  const users = await db.user.findMany()

  return users
}
