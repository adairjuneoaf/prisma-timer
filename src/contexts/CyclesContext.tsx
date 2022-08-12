import { createContext, PropsWithChildren, useEffect, useReducer } from 'react'
import { v4 as UUID } from 'uuid'
import { ActionTypes } from '../reducers/cycles/actions'

import { Cycle, CyclesReducer } from '../reducers/cycles/reducer'

interface CyclesContextProps {
  cycles: Array<Cycle>
  activeCycle: Cycle | undefined
  totalSeconds: number
  activeCycleId: string | null
  createNewCycle: (cycleData: NewCycleFormData) => void
  completedCurrentCycle: (cycleId: string) => void
  interruptCurrentCycle: (cycleId: string) => void
}

type NewCycleFormData = {
  task: string
  minutesAmount: number
}

export const CyclesContext = createContext({} as CyclesContextProps)

export const CyclesContextProvider = ({ children }: PropsWithChildren) => {
  const [CyclesState, dispatch] = useReducer(
    CyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem('@prisma-timer-v1.0.0:cycles-list')

      const value = storedStateAsJSON ? JSON.parse(storedStateAsJSON) : {}

      return value
    },
  )

  const { cycles, activeCycleId } = CyclesState

  useEffect(() => {
    if (activeCycleId !== null) {
      dispatch({
        type: ActionTypes.INTERRUPT_CYCLE,
        payload: {
          cycleId: activeCycleId,
        },
      })
    }
  }, [])

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    const stateJSON = JSON.stringify(CyclesState)

    localStorage.setItem('@prisma-timer-v1.0.0:cycles-list', stateJSON)
  }, [CyclesState])

  const createNewCycle = (cycleData: NewCycleFormData) => {
    const cycle: Cycle = {
      id: UUID(),
      task: cycleData.task,
      minutesAmount: cycleData.minutesAmount,
      startedDate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_CYCLE,
      payload: {
        cycle,
      },
    })
  }

  const completedCurrentCycle = (cycleId: string) => {
    dispatch({
      type: ActionTypes.COMPLETED_CYCLE,
      payload: {
        cycleId,
      },
    })
  }

  const interruptCurrentCycle = (cycleId: string) => {
    dispatch({
      type: ActionTypes.INTERRUPT_CYCLE,
      payload: {
        cycleId,
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
