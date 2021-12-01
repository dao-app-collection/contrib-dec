import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'
import { SupportedThemes } from '../theme/theme.types'

export class UiStore {
  root: RootStore
  accountModalOpen = false
  toast: any

  constructor(root: RootStore, toast: any) {
    this.root = root
    this.toast = toast
    makeAutoObservable(this)
  }

  get selectedTheme(): SupportedThemes | undefined {
    return this.root.localStorageStore.storage.selectedTheme
  }

  setTheme(selectedTheme: SupportedThemes): void {
    this.root.localStorageStore.storage.selectedTheme = selectedTheme
  }

  successToast(text: string): void {
    this.toast({
      text,
      type: 'success',
    })
  }

  warningToast(text: string): void {
    this.toast({
      text,
      type: 'warning',
    })
  }

  errorToast(title: string, error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error type'
    // eslint-disable-next-line no-console
    console.error(error)
    this.toast({
      text: errorMessage,
      type: 'error',
    })
  }

  setAccountModalOpen(value: boolean): void {
    this.accountModalOpen = value
  }
}
