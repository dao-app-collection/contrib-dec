import { TheGraphBucket, TheGraphTask } from '../types/all-types'

export const mockTasks: TheGraphTask[] = [
  {
    data: '....',
    id: '0x123123',
    bucket: '123',
  },
  {
    data: '....',
    id: '0x123123333333',
    bucket: '456',
  },
  {
    data: '....',
    id: '3123123',
    bucket: '999',
  },
]

export const mockBuckets: TheGraphBucket[] = [
  {
    name: 'dxdao',
    id: '123',
  },
  {
    name: 'frontend',
    id: '456',
    parent: '123',
  },
  {
    name: 'website',
    id: '999',
    parent: '456',
  },
  {
    name: 'discord',
    id: '31231231',
    parent: '456',
  },
  {
    name: 'orakuru',
    id: '8589',
  },
]
