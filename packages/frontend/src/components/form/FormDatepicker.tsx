import * as React from 'react'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import InputLabel from './InputLabel'
import { Field } from '../../types/all-types'
import 'react-datepicker/dist/react-datepicker.css'

type Props = Field

const FormDatepicker: FC<Props> = ({ label, name, ...props }) => {
  const { control } = useFormContext() // retrieve all hook methods

  return (
    <div style={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <DatePicker
              selected={field.value}
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

export default FormDatepicker
