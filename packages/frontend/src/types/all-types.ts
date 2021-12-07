import { Dayjs } from 'dayjs'

export type TheGraphBucket = {
  parent?: string
  name: string
  id: string
  owners: string[]
  token: string
  ceramicId: string
}

export type BucketColors = {
  primary: string
  inverted: string
  accent: string
}

export type BucketMetaData = {
  name: string
  description: string
  website?: string
  discord?: string
  logo?: string
  colors?: BucketColors
}

export type TheGraphTask = {
  data: string
  id: string
  bucket: string
}

export type TaskPopulated = TheGraphTask

export type DaoConfig = {
  name: string
  website: string
}

export type PopulatedBucket = TheGraphBucket & {
  level: number
  url: string
}

export type PopulatedTask = TheGraphTask

export type BucketPayload = BucketMetaData & {
  name: string
  owners: string[]
  tokenAddress: string
  // allocation: string
  // owners: string[]
}

export type TaskPayload = {
  title: string
  description: string
  deadline: Dayjs
  issuers: string[]
  approvers: string[]
}
// export type Bucket = {
//   parent?: string
//   name: string
//   id: string
//   allocation: BigNumber
//   owners: string[]
// }

// export type Task = {
//   data: string
//   id: string
//   bucket: string
//   allocation: BigNumber
//   assigned?: string
// }
