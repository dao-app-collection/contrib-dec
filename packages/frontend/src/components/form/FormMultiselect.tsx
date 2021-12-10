import * as React from 'react'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import InputLabel from './InputLabel'
import { Field } from '../../types/all-types'
import { reactSelectTheme } from '../../theme/dark-theme'

type Props = Field

const FormMultiselect: FC<Props> = ({ label, name, ...props }) => {
  const { control } = useFormContext() // retrieve all hook methods

  return (
    <div style={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <CreatableSelect
              {...field}
              {...props}
              isMulti
              theme={reactSelectTheme}
              isDisabled={props.disabled}
              onChange={(val) => {
                field.onChange(val.map(({ value }) => value))
              }}
              value={field.value.map((value: any) => ({
                value,
                label: value,
              }))}
            />
          )
        }}
      />
    </div>
  )
}

export default FormMultiselect
