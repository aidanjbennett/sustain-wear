import SignupForm from '@/components/SignupForm'
import { getUsers } from '@/lib/users'

export default async function Signup() {
  const users = await getUsers()

  return (
    <div>
      <h1>Signup</h1>
      <h2>Users {users.length}</h2>
      <SignupForm />
    </div>
  )
}
