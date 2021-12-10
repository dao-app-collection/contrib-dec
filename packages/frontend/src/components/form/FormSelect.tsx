import * as React from 'react'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import InputLabel from './InputLabel'
import { Field } from '../../types/all-types'
import { reactSelectTheme } from '../../theme/dark-theme'

type Props = Field

const FormSelect: FC<Props> = ({ label, name, ...props }) => {
  const { control } = useFormContext() // retrieve all hook methods

  return (
    <div style={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Select
              {...field}
              {...props}
              theme={reactSelectTheme}
              isClearable
              isDisabled={props.disabled}
              onChange={(val) => {
                field.onChange(val)
              }}
            />
          )
        }}
      />
    </div>
  )
}

export default FormSelect
