import * as React from 'react'
import { FC } from 'react'
import { Tabs as GeistTabs } from '@geist-ui/react'

type Props = {
  tabs: {
    text: string
    id: string
  }[]
  selected: string
  onChange: (id: any) => void
}

const Tabs: FC<Props> = ({ tabs, selected, onChange, ...props }) => {
  return (
    <GeistTabs
      value={selected}
      onChange={(value: string) => {
        onChange(value)
      }}
      {...props}
    >
      {tabs.map((tab) => (
        <GeistTabs.Item label={tab.text} key={tab.id} value={tab.id} />
      ))}
    </GeistTabs>
  )
}

export default Tabs
