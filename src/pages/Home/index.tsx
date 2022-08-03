import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FiPlay } from 'react-icons/fi'
import {
  TaskInput,
  Separator,
  HomeContainer,
  FormContainer,
  CountdownContainer,
  MinutesAmountInput,
  StartCountdownButton,
} from './styles'

const newCycleSchemaFormValidations = zod.object({
  task: zod
    .string()
    .min(3, { message: 'O mínimo de caracteres é 3.' })
    .max(25, { message: 'O máximo de caracteres é 25.' }),
  minutesAmount: zod
    .number()
    .min(5, { message: 'O valor mínimo de minutos é 5.' })
    .max(60, { message: 'O valor máximo de minutos é 60.' }),
})

type NewCycleFormData = zod.infer<typeof newCycleSchemaFormValidations>

export const Home: React.FC = () => {
  const { register, handleSubmit, formState, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleSchemaFormValidations),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { errors, isSubmitting } = formState

  const createNewCycle = (data: NewCycleFormData) => {
    console.log(data)
    reset()
  }

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
        {errors.task && <span>{errors.task?.message}</span>}
        {errors.minutesAmount && <span>{errors.minutesAmount?.message}</span>}

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type='submit' disabled={isSubmitting}>
          <FiPlay size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
