import { Dayjs } from 'dayjs'
import { BigNumber } from 'ethers'
import { UseFormRegister } from 'react-hook-form'

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
  primaryColor?: string
}

type TaskStatus = 'Open' | 'Claimed' | 'Ongoing' | 'Ready for review' | 'Completed'
type TaskType = 'Bounty' | 'Suggestion'
type ExperienceLevel = 'intermediate' | 'beginner' | 'senior'

export type TaskMetaData = {
  title: string
  body: string
  assignes: string[] //
  applications: [] // chose from
  taskStatus: TaskStatus
  deadlineTimestamp?: number
  createdTimestamp: number
  claimedTimestamp?: number
  taskType: TaskType
  experienceLevel?: ExperienceLevel
  requirements: string[]
  github?: string
  timeCommitment: string
}

export type TheGraphTask = {
  id: BigNumber
  ceramicId: string
  // bucket: string
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

export type Field = {
  name: string
  label: string
  required?: boolean
  disabled?: boolean

  register: UseFormRegister<any>
}

export type FormFieldType = 'input' | 'textarea' | 'multiselect' | 'file'

export type MyField = Omit<Field, 'register'> & {
  type?: FormFieldType
}
