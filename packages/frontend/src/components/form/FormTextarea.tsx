import { Input, Textarea } from '@geist-ui/react'

import * as React from 'react'
import { FC } from 'react'
import InputLabel from './InputLabel'
import { Field } from '../../types/all-types'

type Props = Field

const FormTextarea: FC<Props> = ({ label, register, name, required = false, ...props }) => {
  return (
    <div style={{ width: '100%' }}>
      <InputLabel>
        {label} {required ? ' *' : ''}
      </InputLabel>
      <Textarea {...props} width="100%" {...register(name, { required })} />
    </div>
  )
}

export default FormTextarea
