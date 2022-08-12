import React, { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { CyclesContext } from '../../contexts/CyclesContext'
import { DataBody, EmptyBody, HistoryContainer, HistoryList, Status } from './styles'
import ptBR from 'date-fns/locale/pt-BR'
import { NoData } from '../../components/EmptyData'

export const History: React.FC = () => {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <EmptyBody>
            {cycles.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <div>
                    <NoData width={256} height={256} />
                    <h3>Você não possui histórico de ciclos...</h3>
                  </div>
                </td>
              </tr>
            )}
          </EmptyBody>
          <DataBody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startedDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.completedDate && <Status statusTask='green'>Concluído</Status>}
                  {cycle.interruptedDate && <Status statusTask='red'>Interrompido</Status>}
                  {!cycle.interruptedDate && !cycle.completedDate && (
                    <Status statusTask='yellow'>Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </DataBody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
