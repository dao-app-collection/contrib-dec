import * as React from 'react'
import { FC } from 'react'
import { Loading, Modal, ModalProps } from '@geist-ui/react'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  width: 760px;
`
type Props = ModalProps & {
  title: string
  subText?: string
  loading?: boolean
}

const CustomModal: FC<Props> = ({ title, subText, children, ...props }) => {
  return (
    <StyledModal {...props} disableBackdropClick width="50rem">
      <Modal.Title>{title}</Modal.Title>
      {subText && <Modal.Subtitle>{subText}</Modal.Subtitle>}
      <Modal.Content>{children}</Modal.Content>
    </StyledModal>
  )
}

export default CustomModal
