import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <h1>Prisma Timer</h1>
      </div>

      <GlobalStyle />
    </ThemeProvider>
  )
}
