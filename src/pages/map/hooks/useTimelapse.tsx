import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchMovesByDate, fetchPlayers, PlayerMovesResponse } from 'utils/api'
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
  followMode: boolean
  setFollowMode: (mode: boolean) => void
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
  followMode: true,
  setFollowMode: () => {},
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
  const [updatedPlayers, setUpdatedPlayers] = useState<Player[]>([])
  const [followMode, setFollowMode] = useState<boolean>(true)
  const [currentResponse, setCurrentResponse] =
    useState<PlayerMovesResponse | null>(null)

  const { data: movesByDay } = useQuery({
    queryKey: ['timelapse', selectedDate],
    queryFn: () => fetchMovesByDate(selectedDate),
    staleTime: 1000 * 60 * 5,
    enabled: openState !== 'closed',
    placeholderData: () => currentResponse,
  })

  useEffect(() => {
    if (movesByDay) {
      setCurrentResponse(movesByDay)
    }
  }, [movesByDay])

  const moves = useMemo(() => {
    const _moves = movesByDay?.moves || []
    return _moves.sort((a, b) => a.id - b.id)
  }, [movesByDay])

  let queryMoveId = movesByDay?.last_move_id
  if (moves.length > 0) {
    queryMoveId = moves[selectedMoveId - 1].id
  }

  const { data: playersData } = useQuery({
    queryKey: ['players_moves', selectedDate, queryMoveId],
    queryFn: () => {
      if (!queryMoveId) {
        return null
      }
      return fetchPlayers(queryMoveId)
    },
    staleTime: 1000 * 60 * 5,
    enabled: openState !== 'closed',
    placeholderData: () => ({
      players: updatedPlayers,
    }),
  })

  const players = useMemo(
    () => playersData?.players || [],
    [playersData?.players]
  )

  useEffect(() => {
    const editablePlayers = players.map((player) => ({
      ...player,
    }))
    const movesBefore = moves.slice(0, selectedMoveId)
    if (movesBefore) {
      for (const move of movesBefore) {
        const movePlayer = editablePlayers.find(
          (player) => player.id === move.player_id
        )
        if (movePlayer) {
          movePlayer.map_position = move.cell_to
        }
      }
      setUpdatedPlayers(editablePlayers)
    }
  }, [selectedMoveId, moves, players])

  // scroll to seleceted player move
  useEffect(() => {
    if (!followMode) {
      return
    }
    if (openState === 'closed') {
      return
    }
    const move = moves[selectedMoveId - 1]
    // console.log(move)
    if (move) {
      const cellFrom =
        move.cell_to > 0 ? `map-cell-${move.cell_to}` : 'map-cell-start'
      const element = document.getElementById(cellFrom)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - window.innerHeight / 2 + 300,
          behavior: 'smooth',
        })
        // element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [selectedMoveId, moves])

  return (
    <TimelapseContext.Provider
      value={{
        state: openState,
        setState: setOpenState,
        selectedDate,
        setSelectedDate,
        selectedMoveId,
        setSelectedMoveId,
        players: updatedPlayers,
        moves,
        followMode,
        setFollowMode,
      }}
    >
      {children}
    </TimelapseContext.Provider>
  )
}
