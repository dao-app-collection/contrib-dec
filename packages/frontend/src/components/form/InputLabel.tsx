import { useTheme } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'

const InputLabel: FC = ({ children }) => {
  const theme = useTheme()

  return (
    <label>
      {children}
      <style jsx>{`
        label {
          display: block;
          font-weight: normal;
          color: ${theme.palette.accents_6};
          padding: 0 0 0 1px;
          margin-bottom: 0.5em;
          font-size: 1em;
          line-height: 1.5;
        }
        label > :global(*:first-child) {
          margin-top: 0;
        }
        label > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </label>
  )
}

export default InputLabel
