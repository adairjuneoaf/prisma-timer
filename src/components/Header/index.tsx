import React from 'react'
import { LogoTimer } from './logo'
import { HeaderContainer } from './styles'
import { FiWatch, FiDatabase } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoTimer />
      <nav>
        <NavLink to='/' title='Home'>
          <FiWatch size={24} />
        </NavLink>
        <NavLink to='/history' title='Histórico'>
          <FiDatabase size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
