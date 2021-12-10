import styled from 'styled-components'

type TableItemProps = {
  label: string
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

const TaskTableItem: React.FC<TableItemProps> = ({ label, children }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Text>{children}</Text>
    </Wrapper>
  )
}

export default TaskTableItem
