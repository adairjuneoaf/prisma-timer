import { createContext, PropsWithChildren, useReducer } from 'react'
import { v4 as UUID } from 'uuid'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedDate: Date
  interruptedDate?: Date
  completedDate?: Date
}

interface CyclesReducerState {
  cycles: Array<Cycle>
  activeCycleId: string | null
}

interface CyclesContextProps {
  cycles: Array<Cycle>
  activeCycle: Cycle | undefined
  totalSeconds: number
  activeCycleId: string | null
  createNewCycle: (data: NewCycleFormData) => void
  completedCurrentCycle: () => void
  interruptCurrentCycle: () => void
}

type NewCycleFormData = {
  task: string
  minutesAmount: number
}

export const CyclesContext = createContext({} as CyclesContextProps)

export const CyclesContextProvider = ({ children }: PropsWithChildren) => {
  const [CyclesState, dispatch] = useReducer(
    (state: CyclesReducerState, action: any) => {
      if (action.type === 'ADD_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycleData],
          activeCycleId: action.payload.newCycleData.id,
        }
      }

      if (action.type === 'INTERRUPT_CYCLE') {
        const newStateCycles = state.cycles.map((cycle) => {
          if (cycle.id === action.payload.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        })

        return {
          ...state,
          cycles: newStateCycles,
          activeCycleId: null,
        }
      }

      if (action.type === 'COMPLETED_CYCLE') {
        const newStateCycles = state.cycles.map((cycle) => {
          if (cycle.id === action.payload.activeCycleId) {
            return { ...cycle, completedDate: new Date() }
          } else {
            return cycle
          }
        })

        return {
          ...state,
          cycles: newStateCycles,
          activeCycleId: null,
        }
      }

      return state
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const { cycles, activeCycleId } = CyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const createNewCycle = (data: NewCycleFormData) => {
    const newCycleData: Cycle = {
      id: UUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedDate: new Date(),
    }

    dispatch({
      type: 'ADD_CYCLE',
      payload: {
        newCycleData,
      },
    })
  }

  const completedCurrentCycle = () => {
    dispatch({
      type: 'COMPLETED_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  const interruptCurrentCycle = () => {
    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        totalSeconds,
        activeCycleId,
        createNewCycle,
        completedCurrentCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
