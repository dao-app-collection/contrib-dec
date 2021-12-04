import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { FC } from 'react'

const MissingPage: FC = () => {
  const router = useRouter()

  return <div>empty page</div>
}

export default MissingPage
