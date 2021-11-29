import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'

const UPDATE_INTERVAL = 1000

export class ClockStore {
  root: RootStore
  now: Date

  constructor(root: RootStore) {
    this.root = root
    this.now = new Date()
    makeAutoObservable(this)
    setInterval(this.updateNow.bind(this), UPDATE_INTERVAL)
  }

  updateNow(): void {
    this.now = new Date()
  }
}
