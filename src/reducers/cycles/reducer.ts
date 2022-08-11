import { ActionTypes } from './actions'

export interface Cycle {
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

type CyclesReducerAction =
  | {
      type: ActionTypes.ADD_CYCLE
      payload: {
        cycle: Cycle
      }
    }
  | {
      type: ActionTypes.COMPLETED_CYCLE
      payload: {
        cycleId: string
      }
    }
  | {
      type: ActionTypes.INTERRUPT_CYCLE
      payload: {
        cycleId: string
      }
    }

export const CyclesReducer = (state: CyclesReducerState, action: CyclesReducerAction) => {
  switch (action.type) {
    case ActionTypes.ADD_CYCLE: {
      return {
        ...state,
        cycles: [...state.cycles, action.payload.cycle],
        activeCycleId: action.payload.cycle?.id,
      }
    }

    case ActionTypes.INTERRUPT_CYCLE: {
      const newStateCycles = state.cycles.map((cycle) => {
        if (cycle.id === action.payload.cycleId) {
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

    case ActionTypes.COMPLETED_CYCLE: {
      const newStateCycles = state.cycles.map((cycle) => {
        if (cycle.id === action.payload.cycleId) {
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

    default: {
      return state
    }
  }
}
