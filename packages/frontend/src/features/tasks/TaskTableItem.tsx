import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

type TableItemProps = {
  label: string
  loading?: boolean
}

const Wrapper = styled.div`
  text-align: left;
`

const Label = styled.div`
  color: ${({ theme }) => theme.text.accent};
  font-size: ${({ theme }) => theme.fontSize.xsm};
  font-weight: 600;
`

const Text = styled.div`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
`

const TaskTableItem: React.FC<TableItemProps> = ({ label, loading, children }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      {loading ? <Skeleton /> : <Text>{children}</Text>}
    </Wrapper>
  )
}

export default TaskTableItem
