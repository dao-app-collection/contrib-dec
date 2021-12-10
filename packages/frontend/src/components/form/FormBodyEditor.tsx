import * as React from 'react'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import Yamde from 'yamde'
import InputLabel from './InputLabel'
import { Field } from '../../types/all-types'

type Props = Field

const FormBodyEditor: FC<Props> = ({ label, name, ...props }) => {
  const { control } = useFormContext() // retrieve all hook methods

  return (
    <div style={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <div
              style={{
                position: 'relative',
                zIndex: -1,
              }}
            >
              <Yamde value={field.value} handler={field.onChange} theme="dark" />
            </div>
          )
        }}
      />
    </div>
  )
}

export default FormBodyEditor
