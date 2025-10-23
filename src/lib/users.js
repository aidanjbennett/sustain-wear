import { db } from './prisma'

export async function getUsers() {
  const users = db.user.findMany()

  return await users
}
