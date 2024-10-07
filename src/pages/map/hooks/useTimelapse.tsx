import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useState } from 'react'
import { fetchMovesByDate, fetchPlayers } from 'utils/api'
import { Player, PlayerMove } from 'utils/types'

type StateOption = 'closed' | 'date_selection' | 'move_selection'

type TimelapseState = {
  state: StateOption
  setState: (state: StateOption) => void
  selectedDate: string
  selectedMoveId: number
  setSelectedDate: (date: string) => void
  setSelectedMoveId: (moveId: number) => void
  players: Player[]
  moves: PlayerMove[]
}

const Today = new Date()
const TodayString = Today.toISOString().split('T')[0]

const TimelapseContext = createContext<TimelapseState>({
  state: 'closed',
  setState: () => {},
  selectedDate: TodayString,
  selectedMoveId: 1,
  setSelectedDate: () => {},
  setSelectedMoveId: () => {},
  players: [],
  moves: [],
})

export function useTimelapse() {
  return useContext(TimelapseContext)
}

export default function TimelapseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [openState, setOpenState] = useState<TimelapseState['state']>('closed')
  const [selectedDate, setSelectedDate] = useState<string>(TodayString)
  const [selectedMoveId, setSelectedMoveId] = useState<number>(1)

  const { data: movesByDay } = useQuery({
    queryKey: ['timelapse', selectedDate],
    queryFn: () => fetchMovesByDate(selectedDate),
    staleTime: 1000 * 60 * 5,
    enabled: openState !== 'closed',
  })

  const moves = movesByDay?.moves || []

  const { data: playersData } = useQuery({
    queryKey: ['players', selectedMoveId],
    queryFn: () => {
      if (!moves) {
        return null
      }
      const selectedMove = moves[selectedMoveId - 1]
      if (!selectedMove) {
        return null
      }
      return fetchPlayers(selectedMove.id)
    },
    staleTime: 1000 * 60 * 5,
    enabled: openState !== 'closed',
  })

  const players = playersData?.players || []

  return (
    <TimelapseContext.Provider
      value={{
        state: openState,
        setState: setOpenState,
        selectedDate,
        setSelectedDate,
        selectedMoveId,
        setSelectedMoveId,
        players,
        moves,
      }}
    >
      {children}
    </TimelapseContext.Provider>
  )
}
