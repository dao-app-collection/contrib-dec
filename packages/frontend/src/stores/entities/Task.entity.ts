import { ethers } from 'ethers'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { BucketEntity } from './Bucket.entity'
import { TaskMetaData, TaskStatus, TheGraphTask } from '../../types/all-types'
import ceramic from '../../utils/services/ceramic'
import { RootStore } from '../RootStore'

export class TaskEntity {
  root: RootStore
  id: string
  ceramicId: string
  data?: TaskMetaData
  status = ''
  bucket: BucketEntity

  constructor(root: RootStore, { data, bucket }: { data: TheGraphTask; bucket: BucketEntity }) {
    this.root = root
    this.id = data.id.toString()
    this.ceramicId = data?.ceramicId
    this.bucket = bucket
    makeObservable(this, {
      canApply: computed,
      canApprove: computed,
      data: observable,
      status: observable,
      apply: action,
      approve: action,
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

    if (this.bucket.owners.includes(userAddress)) {
      return false
    }

    return !this.data.applications?.includes(userAddress)
  }

  get canApprove(): boolean {
    if (!this.data) {
      return false
    }

    if (this.data.taskStatus !== TaskStatus.OPEN) {
      return false
    }

    if (!this.root.web3Store.signerState.address) {
      return false
    }

    return this.bucket.owners.includes(this.root.web3Store.signerState.address)
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
    runInAction(() => {
      this.status = 'default'
    })
  }

  approve = async (approveAddress: string): Promise<void> => {
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

    this.status = 'isApproving'
    const assignes = [...this.data.assignes, approveAddress]
    await this.updateData({
      assignes,
    })

    runInAction(() => {
      this.status = 'default'
    })
  }
}
