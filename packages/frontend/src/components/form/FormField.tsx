import * as React from 'react'
import { FC } from 'react'
import FormInput from './FormInput'
import FormTextarea from './FormTextarea'
import FormMultiselect from './FormMultiselect'
import FormFileImage from './FormFileImage'
import FormSelect from './FormSelect'
import FormBodyEditor from './FormBodyEditor'
import FormDatepicker from './FormDatepicker'
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

  if (type === 'file') {
    return <FormFileImage {...props} />
  }

  if (type === 'select') {
    return <FormSelect {...props} />
  }

  if (type === 'body') {
    return <FormBodyEditor {...props} />
  }

  if (type === 'date') {
    return <FormDatepicker {...props} />
  }
  return null
}

export default FormField
