import { ethers } from 'ethers'
import { makeObservable, observable, runInAction } from 'mobx'
import { TaskMetaData, TheGraphTask } from '../../types/all-types'
import ceramic from '../../utils/services/ceramic'
import { RootStore } from '../RootStore'

export class TaskEntity {
  root: RootStore
  id: string
  ceramicId: string
  data?: TaskMetaData

  constructor(root: RootStore, { data }: { data: TheGraphTask }) {
    this.root = root
    this.id = data.id.toString()
    this.ceramicId = data?.ceramicId

    makeObservable(this, {
      data: observable,
    })

    this.load()
  }

  load = async (): Promise<void> => {
    try {
      const data = await ceramic.read<TaskMetaData>(this.ceramicId)

      console.log('task data', { data })
      if (data) {
        runInAction(() => {
          this.data = data
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  updateData = (data: Partial<TaskMetaData>) => {
    if (!this.data) {
      return
    }

    const merged = {
      ...this.data,
      ...data,
    }
    try {
      const data = await ceramic.read<TaskMetaData>(this.ceramicId)

      console.log('task data', { data })
      if (data) {
        runInAction(() => {
          this.data = data
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
}
