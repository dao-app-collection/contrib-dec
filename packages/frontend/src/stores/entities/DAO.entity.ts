import { action, makeObservable, observable, runInAction } from 'mobx'
import { RootStore } from '../RootStore'

export class DAOEntity {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root

    makeObservable(this, {})
  }
}
