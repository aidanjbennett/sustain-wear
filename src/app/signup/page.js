import { getUsers } from '@/lib/users'

export default async function Signup() {
  const users = await getUsers()

  return (
    <div>
      <h1>Signup</h1>
      <p>{users.length}</p>
    </div>
  )
}
