import { animated, to, SpringValue, Interpolation } from '@react-spring/web'
import { CircleProps, useNodeMouseHandlers } from '@nivo/circle-packing'
import { FC } from 'react'
import styled, { css } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

export const interpolatePosition = (
  positionValue: SpringValue<number>,
  radiusValue: Interpolation<number>
) => to([positionValue, radiusValue], (position, radius) => position - radius)

export const interpolateSize = (radiusValue: Interpolation<number>) =>
  to([radiusValue], (radius) => radius * 2)

export const interpolateBorderWidth = (borderWidth: number, radiusValue: Interpolation<number>) =>
  to([radiusValue], (radius) => Math.min(borderWidth, radius))

const InfoInner = styled(motion.div)`
  align-items: center;
  color: ${(props) => props.theme.dao.inverted};
  display: flex;
  flex-direction: column;
  font-size: 22px;
  height: 100%;
  justify-content: center;
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 5;
`

const Circle = styled(animated.div)<{ depth: number; isChildCircle: boolean }>`
  background: linear-gradient(
    154.57deg,
    #6035d6 2.94%,
    #6035d6 2.95%,
    rgba(123, 75, 255, 0) 105.2%
  );
  background-color: transparent;
  box-shadow: inset 0px -1.85837px 50.176px rgba(255, 255, 255, 0.31);
  transition: background 0.3s ease, background-color 0.3s ease;
  will-change: background, background-color;

  ${(props) =>
    props.depth === 0 &&
    css`
      background: transparent;
      box-shadow: inset 0px 0px 7px 4px rgb(25 0 95 / 62%);
    `}

  ${(props) =>
    props.isChildCircle &&
    css`
      background: rgba(57, 32, 126, 0.33);
      box-shadow: none;
    `}
`

const CircleComponent = (extraProps) => (circleProps: CircleProps<any>) => {
  const { node, style, onMouseEnter, onMouseMove, onMouseLeave, onClick } = circleProps
  const size = interpolateSize(style.radius)

  // eslint-disable-next-line
  const handlers = useNodeMouseHandlers<any>(node, {
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
  })

  const showInfo = extraProps.currentDepth + 1 === node.depth
  const isChildCircle = extraProps.currentDepth + 2 === node.depth

  return (
    <Circle
      depth={node.depth}
      showInfo={showInfo}
      isChildCircle={isChildCircle}
      style={{
        position: 'absolute',
        top: interpolatePosition(style.y, style.radius),
        left: interpolatePosition(style.x, style.radius),
        height: size,
        width: size,
        borderRadius: style.radius,
      }}
      onMouseEnter={handlers.onMouseEnter}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      onClick={handlers.onClick}
    >
      <AnimatePresence>
        {showInfo && (
          <InfoInner
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, scale: 0.7 }}
          >
            <div> {node.data.name}</div>
            <div>150K DDAO</div>
          </InfoInner>
        )}
      </AnimatePresence>
    </Circle>
  )
}
export default CircleComponent
