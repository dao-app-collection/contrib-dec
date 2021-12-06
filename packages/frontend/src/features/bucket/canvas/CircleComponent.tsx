import { animated, to, SpringValue, Interpolation } from '@react-spring/web'
import { CircleProps, useNodeMouseHandlers } from '@nivo/circle-packing'
import { FC } from 'react'
import styled, { css } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { Z_INDEX } from '../../../utils/general-settings'
import Heading from '../../../components/Heading'

export const interpolatePosition = (
  positionValue: SpringValue<number>,
  radiusValue: Interpolation<number>
) => to([positionValue, radiusValue], (position, radius) => position - radius)

export const interpolateSize = (radiusValue: Interpolation<number>, multiplier: number) =>
  to([radiusValue], (radius) => radius * multiplier)

export const interpolateBorderWidth = (borderWidth: number, radiusValue: Interpolation<number>) =>
  to([radiusValue], (radius) => Math.min(borderWidth, radius))

const Counter = styled(animated.div)`
  align-items: center;
  background: #fff;
  border-radius: 72px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px #ffffff;
  color: #000;
  display: flex;
  height: 38px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 38px;
`

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
  z-index: ${Z_INDEX.circleComponent};
`

const Circle = styled(animated.div).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['isChildCircle', 'isSelected'].includes(prop) && defaultValidatorFn(prop),
})<{ depth: number; isNextLevel: boolean; isSelected: boolean }>`
  transition: background 0.3s ease, background-color 0.3s ease;
  will-change: background, background-color;
  position: absolute;
  box-sizing: border-box;

  opacity: 0.3;

  ${(props) =>
    props.depth === 0 &&
    css`
      box-shadow: inset 0px 0px 7px 4px rgb(25 0 95 / 62%);
      opacity: 1;
    `}
  ${(props) =>
    props.isNextLevel &&
    css`
      background: linear-gradient(
        154.57deg,
        #6035d6 2.94%,
        #6035d6 2.95%,
        rgba(123, 75, 255, 0) 105.2%
      );
      background: linear-gradient(154.57deg, #6035d6 2.94%, rgba(123, 75, 255, 0) 105.2%);
      background-color: transparent;
      box-shadow: inset 0px -1.85837px 50.176px rgba(255, 255, 255, 0.31);
      box-sizing: border-box;
      opacity: 1;
    `}


  ${(props) =>
    props.isSelected &&
    props.depth !== 0 &&
    css`
      border: 12px solid #ffffff;
      box-shadow: inset 0px -3.02075px 55.5603px rgba(255, 255, 255, 0.31);
      opacity: 1;
    `}
`

const CircleComponent = (extraProps) => (circleProps: CircleProps<any>) => {
  const { node, style, onMouseEnter, onMouseMove, onMouseLeave, onClick } = circleProps
  const size = interpolateSize(style.radius, 2)
  // eslint-disable-next-line
  const handlers = useNodeMouseHandlers<any>(node, {
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
  })

  const isSelected = node.id === extraProps.zoomedId
  const isChildCircle = extraProps.currentDepth + 2 === node.depth
  const isNextLevel = extraProps.currentDepth + 1 === node.depth
  let showInfo = extraProps.currentDepth + 1 === node.depth

  if (isSelected && !node.data.gotChildren) {
    showInfo = true
  }

  return (
    <Circle
      depth={node.depth}
      isSelected={isSelected}
      isNextLevel={isNextLevel}
      style={{
        top: interpolatePosition(style.y, style.radius),
        left: interpolatePosition(style.x, style.radius),
        height: size,
        width: size,
        backgroundColor: style.color,

        borderRadius: style.radius,
      }}
      onMouseEnter={handlers.onMouseEnter}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      onClick={handlers.onClick}
    >
      <AnimatePresence>
        {showInfo && <Counter key="counter">4</Counter>}
        {showInfo && (
          <InfoInner
            key="inner"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, scale: 0.7 }}
          >
            <Heading type="h3">{node.data.name}</Heading>
            <div>{node.data.entity.allocation}K DDAO</div>
          </InfoInner>
        )}
      </AnimatePresence>
    </Circle>
  )
}
export default CircleComponent
