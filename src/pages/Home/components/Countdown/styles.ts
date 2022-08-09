import styled from 'styled-components'

export const CountdownContainer = styled.div`
  width: 100%;

  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  pointer-events: none;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};

  flex: 1;

  width: 4rem;
  height: 100%;
  line-height: 65%;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
