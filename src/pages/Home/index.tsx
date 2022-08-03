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
            list='taskSuggestions'
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
            list='minutesOptions'
            type='number'
            placeholder='00'
            required
            min={5}
            max={60}
            step={5}
            maxLength={2}
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
