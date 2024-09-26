import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { fetchCurrentUser } from 'utils/api'

const UserContext = createContext<{
  userId: number | null
}>({
  userId: null,
})

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)

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
  }, [currentUserData?.user_id])

  return (
    <UserContext.Provider value={{ userId: currentUserId }}>
      {children}
    </UserContext.Provider>
  )
}
