import { BigNumber, ethers } from 'ethers'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { BucketEntity } from './Bucket.entity'
import { TaskMetaData, TaskStatus, TheGraphTask } from '../../types/all-types'
import ceramic from '../../utils/services/ceramic'
import { RootStore } from '../RootStore'
import { Bucket__factory } from '../../generated'

export class TaskEntity {
  root: RootStore
  id: string
  ceramicId: string
  data?: TaskMetaData
  status: 'default' | 'isApproving' | 'isApplying' | 'isTurningIn' | 'isCompleting' = 'default'
  bucket: BucketEntity
  balance: BigNumber = BigNumber.from('0')

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
      balance: observable,
      apply: action,
      approve: action,
    })
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

  get canTurnIn(): boolean {
    if (!this.data) {
      return false
    }

    if (this.data.taskStatus !== TaskStatus.CLAIMED) {
      return false
    }

    if (!this.root.web3Store.signerState.address) {
      return false
    }

    return this.data.assignes.includes(this.root.web3Store.signerState.address)
  }

  get canComplete(): boolean {
    if (!this.data) {
      return false
    }

    if (this.data.taskStatus !== TaskStatus.REVIEW) {
      return false
    }

    if (!this.root.web3Store.signerState.address) {
      return false
    }

    return this.bucket.owners.includes(this.root.web3Store.signerState.address)
  }

  get allocation(): string {
    return `${this.balance && ethers.utils.formatEther(this.balance)} ${this?.bucket?.getSymbol()}`
  }

  load = async (): Promise<void> => {
    try {
      const data = await ceramic.read<TaskMetaData>(this.ceramicId)

      if (data) {
        runInAction(() => {
          this.data = data
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  updateData = async (newData: Partial<TaskMetaData>) => {
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

    if (Array.isArray(this.data?.applications) && this.data?.applications?.includes(userAddress)) {
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

    if (!this.bucket.owners.includes(userAddress)) {
      return
    }

    this.status = 'isApproving'
    const assignes = [...this.data.assignes, approveAddress]
    await this.updateData({
      assignes,
      taskStatus: TaskStatus.CLAIMED,
    })

    runInAction(() => {
      this.status = 'default'
    })
  }

  turnInWork = async (): Promise<void> => {
    if (!this.data) {
      return
    }
    const userAddress = this.root.web3Store.signerState.address

    if (!userAddress) {
      return
    }

    if (!this.canTurnIn) {
      return
    }

    this.status = 'isTurningIn'
    await this.updateData({
      taskStatus: TaskStatus.REVIEW,
    })

    runInAction(() => {
      this.status = 'default'
    })
  }

  setBounty = ({ balance }) => {
    this.balance = balance
  }

  completeWork = async (): Promise<void> => {
    if (!this.canComplete) {
      return
    }
    if (!this.root.web3Store.signer) {
      return
    }
    if (!this.root.web3Store.signerState.address) {
      return
    }

    this.status = 'isCompleting'

    try {
      const contract = Bucket__factory.connect(
        ethers.utils.getAddress(this.bucket.id),
        this.root.web3Store.signer
      )

      await contract.completeTask(
        this.id,
        this.data?.assignes || [],
        this.ceramicId,
        this.root.web3Store.signerState.address,
        [this.balance]
      )

      await this.updateData({
        taskStatus: TaskStatus.COMPLETED,
      })
    } catch (e) {
      this.root.uiStore.errorToast('Could not complete work', e)
    }

    runInAction(() => {
      this.status = 'isCompleting'
    })
  }
}
