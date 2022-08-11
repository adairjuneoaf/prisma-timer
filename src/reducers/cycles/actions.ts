import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_CYCLE = 'ADD_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  COMPLETED_CYCLE = 'COMPLETED_CYCLE',
}

export const actionAddNewCycle = (cycleData: Cycle) => {
  return {
    type: ActionTypes.ADD_CYCLE,
    payload: {
      cycle: cycleData,
    },
  }
}

export const actionCompletedCurrentCycle = (cycleId: string) => {
  return {
    type: ActionTypes.COMPLETED_CYCLE,
    payload: {
      cycleId,
    },
  }
}

export const actionInterruptedCurrentCycle = (cycleId: string) => {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
    payload: {
      cycleId,
    },
  }
}
