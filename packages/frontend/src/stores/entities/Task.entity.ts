import { ethers } from 'ethers'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { TaskMetaData, TheGraphTask } from '../../types/all-types'
import ceramic from '../../utils/services/ceramic'
import { RootStore } from '../RootStore'

export class TaskEntity {
  root: RootStore
  id: string
  ceramicId: string
  data?: TaskMetaData
  status = ''

  constructor(root: RootStore, { data }: { data: TheGraphTask }) {
    this.root = root
    this.id = data.id.toString()
    this.ceramicId = data?.ceramicId

    makeObservable(this, {
      canApply: computed,
      data: observable,
      status: observable,
      apply: action,
    })

    this.load()
  }

  get canApply(): boolean {
    if (!this.data) {
      return false
    }
    const userAddress = this.root.web3Store.signerState.address

    if (!userAddress) {
      return false
    }

    return !this.data.applications?.includes(userAddress)
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

  updateData = async (newData: Partial<TaskMetanewData>) => {
    if (!this.data) {
      return
    }

    const merged = {
      ...this.data,
      ...newData,
    }
    try {
      await ceramic.update(this.ceramicId, merged)
      const data = await ceramic.read<TaskMetaData>(this.ceramicId)

      console.log('task data', { data, merged })
      if (data) {
        runInAction(() => {
          this.data = data
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  apply = async (): Promise<void> => {
    if (!this.data) {
      return
    }
    const userAddress = this.root.web3Store.signerState.address

    if (!userAddress) {
      return
    }

    if (this.data.applications.includes(userAddress)) {
      return
    }

    this.status = 'isApplying'
    const applications = [...this.data.applications, userAddress]
    await this.updateData({
      applications,
    })
    this.status = 'default'
  }
}
