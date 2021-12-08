import { Input } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { Field } from '../../types/all-types'

type Props = Field

const FormInput: FC<Props> = ({ label, register, name, required = false, ...props }) => {
  return (
    <Input {...props} width="100%" {...register(name, { required })}>
      {label}
    </Input>
  )
}

export default FormInput
