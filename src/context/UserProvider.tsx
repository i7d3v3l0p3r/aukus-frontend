import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { fetchCurrentUser } from 'utils/api'

const UserContext = createContext<{
  userId: number | null
  role: 'player' | 'moder' | null
  moderFor: number | null
}>({
  userId: null,
  role: null,
  moderFor: null,
})

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const [userRole, setUserRole] = useState<'player' | 'moder' | null>(null)
  const [moderFor, setModerFor] = useState<number | null>(null)

  const { data: currentUserData } = useQuery({
    queryKey: ['current_user'],
    queryFn: fetchCurrentUser,
    enabled: !currentUserId,
    staleTime: 1000 * 30,
  })

  useEffect(() => {
    if (currentUserData?.user_id) {
      setCurrentUserId(currentUserData.user_id)
    }
    if (currentUserData?.role) {
      setUserRole(currentUserData.role)
    }
    if (currentUserData?.moder_for) {
      setModerFor(currentUserData.moder_for)
    }
  }, [
    currentUserData?.user_id,
    currentUserData?.role,
    currentUserData?.moder_for,
  ])

  return (
    <UserContext.Provider
      value={{ userId: currentUserId, role: userRole, moderFor }}
    >
      {children}
    </UserContext.Provider>
  )
}
