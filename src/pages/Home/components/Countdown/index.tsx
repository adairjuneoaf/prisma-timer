import { differenceInSeconds } from 'date-fns'
import React, { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'

import { CountdownContainer, Separator } from './styles'

export const Countdown: React.FC = () => {
  const {
    activeCycle,
    totalSeconds,
    activeCycleId,
    handleCurrentCycle,
    amountSecondsPassed,
    handleActiveCycleId,
    handleAmountSecondsPassed,
  } = useContext(CyclesContext)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesTotal = Math.floor(currentSeconds / 60)
  const secondsTotal = currentSeconds % 60

  const minutes = String(minutesTotal).padStart(2, '0')
  const seconds = String(secondsTotal).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(new Date(), activeCycle.startedDate)

        if (secondsPassed >= totalSeconds) {
          handleCurrentCycle()

          handleAmountSecondsPassed(totalSeconds)
          handleActiveCycleId(null)
          clearInterval(interval)
        } else {
          handleAmountSecondsPassed(secondsPassed)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds, activeCycleId, handleAmountSecondsPassed, handleActiveCycleId])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
