import * as React from 'react'
import { FC } from 'react'
import { Modal, ModalProps, Spinner } from '@geist-ui/react'
import styled from 'styled-components'
import { X as XIcon } from '@geist-ui/react-icons'

const StyledModal = styled(Modal)`
  position: relative;
`

const LoadingScreen = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 3;
`

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 12px;
`
type Props = ModalProps & {
  title: string
  subText?: string
  loading?: boolean
  width?: string
}

const CustomModal: FC<Props> = ({
  title,
  subText,
  children,
  loading,
  width = '50rem',
  ...props
}) => {
  return (
    <StyledModal {...props} disableBackdropClick width={width}>
      <Close onClick={props.onClose}>
        <XIcon />
      </Close>
      {loading && (
        <LoadingScreen>
          <Spinner />
        </LoadingScreen>
      )}
      <Modal.Title>{title}</Modal.Title>
      {subText && <Modal.Subtitle>{subText}</Modal.Subtitle>}
      <Modal.Content>{children}</Modal.Content>
    </StyledModal>
  )
}

export default CustomModal
