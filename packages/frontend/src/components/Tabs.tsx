import * as React from 'react'
import { FC } from 'react'
import { Tabs as GeistTabs } from '@geist-ui/react'
import styled from 'styled-components'

type Props = {
  tabs: {
    text: string
    id: string
  }[]
  padding?: string
  selected: string
  onChange: (id: any) => void
}

const Wrapper = styled(GeistTabs)`
  header {
    .scroll-container {
      border: none;
    }
  }
  div.content {
    padding-top: 0;
  }
`

const Tabs: FC<Props> = ({ tabs, selected, onChange, padding, ...props }) => {
  return (
    <Wrapper
      padding={padding}
      value={selected}
      onChange={(value: string) => {
        onChange(value)
      }}
      {...props}
    >
      {tabs.map((tab) => (
        <GeistTabs.Item label={tab.text} key={tab.id} value={tab.id} />
      ))}
    </Wrapper>
  )
}

export default Tabs
