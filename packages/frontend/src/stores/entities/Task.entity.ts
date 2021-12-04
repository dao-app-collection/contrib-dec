import { TheGraphTask } from '../../types/all-types'
import { RootStore } from '../RootStore'

export class TaskEntity {
  root: RootStore
  id: string

  constructor(root: RootStore, { task }: { task: TheGraphTask }) {
    this.root = root
    this.id = task.id
  }
}
