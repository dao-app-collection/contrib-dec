import * as React from 'react'
import { FC, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { Spinner } from '@geist-ui/react'
import InputLabel from './InputLabel'
import { Field } from '../../types/all-types'
import { ipfsClient } from '../../utils/services/ipfs'

type Props = Field

const FormFileImage: FC<Props> = ({ label, name, ...props }) => {
  const { formState, setValue, getValues } = useFormContext() // retrieve all hook methods
  const [loading, setLoading] = useState(false)

  const onChange = async (e) => {
    setLoading(true)
    const file = e.target.files[0]
    try {
      const added = await ipfsClient.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`

      setValue(name, url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }

    setLoading(false)
  }

  if (loading) {
    return <Spinner />
  }

  const fileUrl = getValues(name)
  return (
    <div style={{ width: '100%' }}>
      <input type="file" name="Asset" className="my-4" onChange={onChange} />
      {fileUrl && <img width="350" src={fileUrl} />}
    </div>
  )
}

export default FormFileImage
