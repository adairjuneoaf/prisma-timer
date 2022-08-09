import React from 'react'

import { HomeContainer } from './styles'
import { NewCycleForm } from './components/NewCycleForm'

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <NewCycleForm />
    </HomeContainer>
  )
}
