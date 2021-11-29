import { makeAutoObservable } from 'mobx'
import { DefaultTheme } from 'styled-components'
import { RootStore } from './RootStore'
import { SupportedThemes } from '../theme/theme.types'
import { darkTheme } from '../theme/dark-theme'

export class UiStore {
  root: RootStore
  accountModalOpen = false
  selectedTheme: SupportedThemes
  // message: typeof message

  constructor(root: RootStore) {
    this.root = root
    // this.message = message
    this.selectedTheme = 'dark'
    makeAutoObservable(this)
  }

  setTheme(selectedTheme: SupportedThemes): void {
    this.selectedTheme = selectedTheme
    // this.root.localStorageStore.setLocalStorage<{ [key: string]: SupportedThemes }>({
    //   selectedTheme,
    // })
  }

  get themeObject(): DefaultTheme {
    return darkTheme
  }

  successToast(description: string): void {
    // this.message.success(description)
  }

  warningToast(description: string): void {
    // this.message.warning(description)
  }

  errorToast(title: string, error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error type'
    // eslint-disable-next-line no-console
    console.error(error)
    // this.message.error(errorMessage)
  }

  setAccountModalOpen(value: boolean): void {
    this.accountModalOpen = value
  }
}
