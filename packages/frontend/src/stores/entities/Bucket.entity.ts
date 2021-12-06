import { makeObservable, observable } from 'mobx'
import { TaskEntity } from './Task.entity'
import { TheGraphBucket } from '../../types/all-types'
import { RootStore } from '../RootStore'
import { mockTasks } from '../../utils/mocked'
import { EMPTY_CONTRACT_ADDRESS } from '../../lib/constants'
import { slugify } from '../../utils/buckets-utils'

export class BucketEntity {
  root: RootStore
  loading = true
  id: string
  name: string
  nameAsSlug: string
  level: number
  url = ''
  slug: string[] = []
  parent?: BucketEntity
  children: BucketEntity[] = []
  tasks: TaskEntity[] = []
  allocation: number
  parentAddress?: string
  token: string
  description: string
  owners: string[]

  constructor(root: RootStore, { data }: { data: TheGraphBucket }) {
    this.root = root
    this.id = data.id
    this.name = data.name
    this.nameAsSlug = slugify(data.name)
    this.token = data.token
    this.description = data.data.description
    this.owners = data.owners
    this.level = 0
    this.parentAddress = EMPTY_CONTRACT_ADDRESS === data.parent ? undefined : data.parent
    this.allocation = 70

    makeObservable(this, {
      tasks: observable,
    })

    this.init()
  }

  addChild = (child: BucketEntity): void => {
    this.children.push(child)
  }

  setLevel = (level: number): void => {
    this.level = level
  }

  setParent = (parent: BucketEntity): void => {
    this.parent = parent
  }

  setStructure = () => {
    if (this.parent) {
      // eslint-disable-next-line prefer-destructuring
      let parent: BucketEntity | void = this.parent
      const slug = []

      while (parent) {
        if (parent) {
          slug.unshift(parent.nameAsSlug)
          parent = parent.parent
        }
      }

      slug.push(this.nameAsSlug)
      this.slug = slug
      this.url = `/${slug.join('/')}`
    } else {
      this.url = `/${this.nameAsSlug}`
      this.slug = [this.nameAsSlug]
    }
  }

  init = (): void => {
    this.tasks = mockTasks
      .filter((task) => task.bucket === this.id)
      .map((task) => new TaskEntity(this.root, { task }))
  }
}
