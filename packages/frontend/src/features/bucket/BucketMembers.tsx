import { Description, Spacer } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import useMembers from '../../hooks/useMembers'
import useTasks from '../../hooks/useTasksFromBucket'
import { BucketEntity } from '../../stores/entities/Bucket.entity'

type Props = { bucket: BucketEntity }

const BucketMembers: FC<Props> = ({ bucket }) => {
  const { owners, contributors, applicants } = useMembers()

  return (
    <div>
      <div>
        <Description title="Owners" />
        {owners.map((owner, i) => (
          <div key={owner}>{owner.toString()}</div>
        ))}
      </div>
      <Spacer h={2} />
      <div>
        <Description title="Contributors" />
        {contributors.map((contributor, i) => (
          <div key={contributor}>{contributor.toString()}</div>
        ))}
      </div>
      <Spacer h={2} />
      <div>
        <Description title="Applicants" />
        {applicants.map((applicant, i) => (
          <div key={applicant}>{applicant.toString()}</div>
        ))}
      </div>
    </div>
  )
}

export default observer(BucketMembers)
