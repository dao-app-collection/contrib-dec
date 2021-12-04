export type TheGraphBucket = {
  parent?: string
  name: string
  id: string
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

export type BucketPayload = {
  name: string
  // allocation: string
  // owners: string[]
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
