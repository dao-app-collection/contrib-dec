import * as React from 'react'
import { FC } from 'react'
import { TabsProps, Tabs as MantineTabs, Tab } from '@mantine/core'

type Props = {
  tabs: {
    text: string
    id: string
  }[]
  selected: string
  onChange: (id: string) => void
}

const Tabs: FC<Props> = ({ tabs, selected, onChange }) => {
  const active = tabs.findIndex((tab) => tab.id === selected)

  return (
    <MantineTabs active={active} onTabChange={(tabIndex) => onChange(tabs[tabIndex].id || '')}>
      {tabs.map((tab) => (
        <Tab label={tab.id} key={tab.id}>
          {tab.text}
        </Tab>
      ))}
    </MantineTabs>
  )
}

export default Tabs
