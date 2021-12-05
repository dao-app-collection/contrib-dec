import { makeObservable, observable } from 'mobx'
import { TaskEntity } from './Task.entity'
import { TheGraphBucket } from '../../types/all-types'
import { RootStore } from '../RootStore'
import { mockTasks } from '../../utils/mocked'

export class BBucketEntity {
  root: RootStore
  loading = true
  id: string
  name: string
  level: number
  url: string
  slug: string[]
  parent?: BBucketEntity
  children: BBucketEntity[] = []
  tasks: TaskEntity[] = []
  allocation: number

  constructor(root: RootStore, { data }: { data: TheGraphBucket }) {
    this.root = root
    this.id = data.id
    this.name = data.name

    this.level = 0

    // this.url = parent ? `${parent.url}/${bucket.name}` : `/${bucket.name}`
    // this.slug = parent ? [...parent.slug, bucket.name] : [bucket.name]
    // this.parent = parent
    // this.allocation = bucket.name === 'design' ? 40 : 75

    makeObservable(this, {
      tasks: observable,
    })

    this.init()
  }

  setChildren = (children: BBucketEntity[]): void => {
    this.children = children
  }

  init = (): void => {
    this.tasks = mockTasks
      .filter((task) => task.bucket === this.id)
      .map((task) => new TaskEntity(this.root, { task }))
  }
}
