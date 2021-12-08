import * as React from 'react'
import { FC } from 'react'
import { Modal, ModalProps, Spinner } from '@geist-ui/react'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  position: relative;
  width: 760px;
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

type Props = ModalProps & {
  title: string
  subText?: string
  loading?: boolean
}

const CustomModal: FC<Props> = ({ title, subText, children, loading, ...props }) => {
  return (
    <StyledModal {...props} disableBackdropClick width="50rem">
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
