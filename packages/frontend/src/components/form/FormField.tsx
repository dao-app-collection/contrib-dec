import * as React from 'react'
import { FC } from 'react'
import FormInput from './FormInput'
import FormTextarea from './FormTextarea'
import FormMultiselect from './FormMultiselect'
import { Field, FormFieldType } from '../../types/all-types'

type Props = Field & {
  type?: FormFieldType
}

const FormField: FC<Props> = ({ type = 'input', ...props }) => {
  if (type === 'input') {
    return <FormInput {...props} />
  }

  if (type === 'textarea') {
    return <FormTextarea {...props} />
  }

  if (type === 'multiselect') {
    return <FormMultiselect {...props} />
  }
  return null
}

export default FormField
