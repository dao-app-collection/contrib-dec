import { Description } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import { BucketEntity } from '../../stores/entities/Bucket.entity'

type Props = { bucket: BucketEntity }

const BucketMembers: FC<Props> = ({ bucket }) => {
  return (
    <div>
      <div>
        <Description title="Owners" />
        {bucket.owners.map((owner, i) => (
          <div key={owner}>{owner.toString()}</div>
        ))}
      </div>
      {/* <div>
        <Description title="Contributors" />
      </div> */}
    </div>
  )
}

export default observer(BucketMembers)
