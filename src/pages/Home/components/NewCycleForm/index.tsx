import React, { useContext } from 'react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiPlay, FiStopCircle } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import {
  TaskInput,
  FormContainer,
  ErrorContainer,
  MinutesAmountInput,
  StopCountdownButton,
  StartCountdownButton,
} from './styles'
import { Countdown } from '../Countdown'

const newCycleFormSchemaValidation = zod.object({
  task: zod
    .string()
    .min(3, { message: 'Dê um nome a sua tarefa, o mínimo de caracteres é 3.' })
    .max(25, { message: 'O máximo de caracteres para suas tarefas é 25.' }),
  minutesAmount: zod
    .number()
    .min(5, { message: 'O valor mínimo de minutos por ciclo é 5.' })
    .max(60, { message: 'O valor máximo de minutos por ciclo é 60.' }),
})

type NewCycleFormData = zod.infer<typeof newCycleFormSchemaValidation>

export const NewCycleForm: React.FC = () => {
  const { activeCycle, activeCycleId, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const { register, handleSubmit, formState, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { errors, isSubmitting } = formState

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em</label>
          <TaskInput
            id='task'
            type='text'
            list='taskSuggestions'
            placeholder='Dê um nome para essa tarefa'
            {...register('task')}
            disabled={!!activeCycleId}
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
            disabled={!!activeCycleId}
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

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton
            type='button'
            onClick={() => {
              interruptCurrentCycle(activeCycle.id)
            }}
          >
            <FiStopCircle size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type='submit' disabled={isSubmitting}>
            <FiPlay size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>

      <ErrorContainer>
        <span>{errors.task?.message}</span>
        <span>{errors.minutesAmount?.message}</span>
      </ErrorContainer>
    </>
  )
}
