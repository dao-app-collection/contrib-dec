import * as React from 'react'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor'
import InputLabel from './InputLabel'
import { Field } from '../../types/all-types'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

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
            <div>
              <MDEditor value={field.value} onChange={field.onChange} />
            </div>
          )
        }}
      />
    </div>
  )
}

export default FormBodyEditor
