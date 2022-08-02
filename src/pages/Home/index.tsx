import React from 'react'
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

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <form action='#'>
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em</label>
          <TaskInput
            id='task'
            type='text'
            required
            minLength={5}
            placeholder='Dê um nome para essa tarefa'
          />

          <label htmlFor='minutesAmount'>durante</label>
          <MinutesAmountInput
            id='minutesAmount'
            type='number'
            placeholder='00'
            required
            min={5}
            max={60}
            maxLength={2}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type='submit' disabled={false}>
          <FiPlay size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
