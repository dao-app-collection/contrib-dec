import { action, makeAutoObservable, observable, runInAction } from 'mobx'
import { RootStore } from './RootStore'
import { TaskEntity } from './entities/Task.entity'
import ceramic from '../utils/services/ceramic'
import { notEmpty } from '../utils/array-utils'

export class TaskStore {
  root: RootStore
  tasks: TaskEntity[] = []
  loading = true

  constructor(root: RootStore) {
    this.root = root

    makeAutoObservable(this, {
      tasks: observable,
      loading: observable,
      init: action,
    })
  }

  init = async (): Promise<void> => {
    try {
      await ceramic.authenticate()
      this.fetchTasks()
    } catch (e) {
      console.error(e)
    }
  }

  fetchTasks = async (): Promise<void> => {}
}
