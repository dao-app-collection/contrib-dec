import useSelectedBucket from './useSelectedBucket'
import useTasks from './useTasksFromBucket'
import { TaskEntity } from '../stores/entities/Task.entity'

const useMembers = (): {
  owners: string[]
  contributors: string[]
  applicants: string[]
} => {
  const bucket = useSelectedBucket()
  const tasks = useTasks()

  const owners = bucket?.owners ?? []

  const applicants = new Set<string>()
  const contributors = new Set<string>()

  for (const [i, task] of tasks.entries()) {
    for (const applicant of task.data.applications) {
      applicants.add(applicant)
    }

    for (const contributor of task.data.assignes) {
      contributors.add(contributor)
    }
  }

  return {
    owners,
    applicants: Array.from(applicants),
    contributors: Array.from(contributors),
  }
}

export default useMembers
