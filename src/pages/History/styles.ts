import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }
  }
`

export const DataBody = styled.tbody`
  td {
    background-color: ${(props) => props.theme['gray-700']};
    border-top: 4px solid ${(props) => props.theme['gray-800']};
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.6;

    &:first-child {
      width: 50%;
      padding-left: 1.5rem;
    }

    &:last-child {
      padding-right: 1.5rem;
    }
  }
`

export const EmptyBody = styled.tbody`
  td {
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      padding-top: 3.5rem;

      h3 {
        font-size: 0.875rem;
        color: ${(props) => props.theme['gray-500']};

        padding-top: 1.5rem;
      }
    }
  }
`

enum STATUS_COLORS {
  yellow = 'yellow-500',
  red = 'red-500',
  green = 'green-500',
}

interface StatusProps {
  statusTask: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusTask]]};
  }
`
