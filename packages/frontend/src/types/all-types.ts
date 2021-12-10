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

export enum TaskStatus {
  OPEN = 'Open',
  CLAIMED = 'Claimed',
  ONGOING = 'Ongoing',
  REVIEW = 'Ready for review',
  COMPLETED = 'Completed',
}

export enum TaskType {
  BOUNTY = 'Bounty',
  SUGGESTION = 'Suggestion',
}

// export type TaskStatus = 'Open' | 'Claimed' | 'Ongoing' | 'Ready for review' | 'Completed'
// export type TaskType = 'Bounty' | 'Suggestion'
export type ExperienceLevel = 'intermediate' | 'beginner' | 'senior'

export type TaskMetaData = {
  title: string
  body: string
  assignes: string[] //
  applications: string[] // chose from
  taskStatus: TaskStatus
  deadlineTimestamp: number
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
  data: TaskMetaData
  deadline: number
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
} & any

export type FormFieldType =
  | 'input'
  | 'textarea'
  | 'multiselect'
  | 'file'
  | 'select'
  | 'body'
  | 'date'

export type MyField = Omit<Field, 'register'> & {
  type?: FormFieldType
}
