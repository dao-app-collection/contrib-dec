import { Button } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import { Sun, Moon } from '@geist-ui/react-icons'
import { useRootStore } from '../context/RootStoreProvider'

const ToggleTheme: React.FC = () => {
  const { uiStore } = useRootStore()
  const newTheme = uiStore.selectedTheme === 'light' ? 'dark' : 'light'

  return (
    <Button
      auto
      iconRight={uiStore.selectedTheme === 'light' ? <Moon /> : <Sun />}
      onClick={(): void => {
        uiStore.setTheme(newTheme)
      }}
    />
  )
}

export default observer(ToggleTheme)
