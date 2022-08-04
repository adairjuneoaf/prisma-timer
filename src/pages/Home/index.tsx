import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FiPlay } from 'react-icons/fi'
import { v4 as UUID } from 'uuid'
import {
  TaskInput,
  Separator,
  HomeContainer,
  FormContainer,
  CountdownContainer,
  MinutesAmountInput,
  StartCountdownButton,
  ErrorContainer,
} from './styles'
import { differenceInSeconds } from 'date-fns'

const newCycleSchemaFormValidations = zod.object({
  task: zod
    .string()
    .min(3, { message: 'Dê um nome a sua tarefa, o mínimo de caracteres é 3.' })
    .max(25, { message: 'O máximo de caracteres para suas tarefas é 25.' }),
  minutesAmount: zod
    .number()
    .min(5, { message: 'O valor mínimo de minutos por ciclo é 5.' })
    .max(60, { message: 'O valor máximo de minutos por ciclo é 60.' }),
})

type NewCycleFormData = zod.infer<typeof newCycleSchemaFormValidations>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedDate: Date
}

export const Home: React.FC = () => {
  const [cycles, setNewCycle] = useState<Array<Cycle>>([])
  const [activeCycleId, setNewActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, formState, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleSchemaFormValidations),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { errors, isSubmitting } = formState

  const createNewCycle = (data: NewCycleFormData) => {
    const newCycleData: Cycle = {
      id: UUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedDate: new Date(),
    }

    setNewCycle((prevState) => [...prevState, newCycleData])
    setNewActiveCycleId(newCycleData.id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesTotal = Math.floor(currentSeconds / 60)
  const secondsTotal = currentSeconds % 60

  const minutes = String(minutesTotal).padStart(2, '0')
  const seconds = String(secondsTotal).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startedDate))
      }, 1000)
    }
  }, [activeCycle])

  return (
    <HomeContainer>
      <form action='' onSubmit={handleSubmit(createNewCycle)}>
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em</label>
          <TaskInput
            id='task'
            type='text'
            list='taskSuggestions'
            placeholder='Dê um nome para essa tarefa'
            {...register('task')}
          />
          <datalist id='taskSuggestions'>
            <option value='Tarefa 01' />
            <option value='Tarefa option 02' />
            <option value='Tarefa 002' />
            <option value='Tarefa opção 0003' />
            <option value='Nova tarefa 8' />
            <option value='Tarefa pomofocus' />
          </datalist>

          <label htmlFor='minutesAmount'>durante</label>
          <MinutesAmountInput
            id='minutesAmount'
            type='number'
            placeholder='00'
            list='minutesOptions'
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <datalist id='minutesOptions'>
            <option value={5} />
            <option value={15} />
            <option value={25} />
            <option value={35} />
            <option value={45} />
            <option value={60} />
          </datalist>

          <span>minutos</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type='submit' disabled={isSubmitting}>
          <FiPlay size={24} />
          Começar
        </StartCountdownButton>
      </form>

      <ErrorContainer>
        <span>{errors.task?.message}</span>
        <span>{errors.minutesAmount?.message}</span>
      </ErrorContainer>
    </HomeContainer>
  )
}
