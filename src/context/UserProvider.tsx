import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { fetchCurrentUser } from 'utils/api'
import { CurrentUser } from 'utils/types'

const UserContext = createContext<CurrentUser | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [playerInfo, setPlayerInfo] = useState<CurrentUser | null>(null)

  const { data: currentUserData } = useQuery({
    queryKey: ['current_user'],
    queryFn: fetchCurrentUser,
    enabled: !playerInfo,
    staleTime: 1000 * 60,
  })

  useEffect(() => {
    if (currentUserData) {
      setPlayerInfo(currentUserData)
    }
  }, [currentUserData])

  return (
    <UserContext.Provider value={playerInfo}>{children}</UserContext.Provider>
  )
}
