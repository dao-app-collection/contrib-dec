import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'
import { SupportedThemes } from '../theme/theme.types'

const TOAST_SETTINGS = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}
export class UiStore {
  root: RootStore
  accountModalOpen = false
  toast: any

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
    this.toast(`✅ ${text}`, TOAST_SETTINGS)
  }

  warningToast(text: string): void {
    this.toast(`⚠️ ${text}`, TOAST_SETTINGS)
  }

  errorToast(title: string, error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error type'
    // eslint-disable-next-line no-console
    console.error(error)
    this.toast(`🚨 ${errorMessage}`, TOAST_SETTINGS)
  }

  setAccountModalOpen(value: boolean): void {
    this.accountModalOpen = value
  }
}
