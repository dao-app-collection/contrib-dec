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

  fetchTasks = async (): Promise<void> => {
    try {
      const events = await this.root.contribBucketFactoryContractStore.getTaskEvents()

      console.log({ events })
      const result: any[] = await Promise.all(
        events.map(async (event) => {
          if (!event.args) {
            return null
          }

          const data = await ceramic.read(event.args.data)

          return {
            owners: event.args.owners,
            id: event.args.bucket,
            name: event.args.name,
            token: event.args.token,
            parent: event.args.parent,
            data,
          }
        })
      )

      // const entities = result.filter(notEmpty).map(
      //   (task) =>
      //     new TaskEntity(this.root, {
      //       data: task,
      //     })
      // )

      // const tasks = buildBucketEntityStructure(entities)
      runInAction(() => {
        // this.tasks = tasks
        this.loading = false
      })
    } catch (e) {
      console.error(e)
    }
    runInAction(() => {
      this.loading = false
    })
  }
}
