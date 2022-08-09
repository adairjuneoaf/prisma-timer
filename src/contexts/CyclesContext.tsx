import { createContext, PropsWithChildren, useState } from 'react'
import { v4 as UUID } from 'uuid'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedDate: Date
  interruptedDate?: Date
  completedDate?: Date
}

interface CyclesContextProps {
  cycles: Array<Cycle>
  activeCycle: Cycle | undefined
  totalSeconds: number
  activeCycleId: string | null
  amountSecondsPassed: number
  createNewCycle: (data: NewCycleFormData) => void
  handleCurrentCycle: () => void
  handleActiveCycleId: (id: string | null) => void
  interruptCurrentCycle: () => void
  handleAmountSecondsPassed: (seconds: number) => void
}

type NewCycleFormData = {
  task: string
  minutesAmount: number
}

export const CyclesContext = createContext({} as CyclesContextProps)

export const CyclesContextProvider = ({ children }: PropsWithChildren) => {
  const [cycles, setNewCycle] = useState<Array<Cycle>>([])
  const [activeCycleId, setNewActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const createNewCycle = (data: NewCycleFormData) => {
    const newCycleData: Cycle = {
      id: UUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedDate: new Date(),
    }

    setNewCycle((prevState) => [...prevState, newCycleData])
    setNewActiveCycleId(newCycleData.id)
  }

  const handleCurrentCycle = () => {
    setNewCycle((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, completedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const interruptCurrentCycle = () => {
    setNewCycle((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setNewActiveCycleId(null)
    setAmountSecondsPassed(0)
  }

  const handleAmountSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const handleActiveCycleId = (id: string | null) => {
    setNewActiveCycleId(id)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        totalSeconds,
        activeCycleId,
        createNewCycle,
        handleCurrentCycle,
        amountSecondsPassed,
        handleActiveCycleId,
        interruptCurrentCycle,
        handleAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
