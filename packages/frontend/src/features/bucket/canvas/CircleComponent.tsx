import { animated, to, SpringValue, Interpolation } from '@react-spring/web'
import { CircleProps, useNodeMouseHandlers } from '@nivo/circle-packing'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { lighten } from 'polished'
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

const Logo = styled(animated.div)`
  border-radius: 50%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform: translate(-50%, -50%);

  img {
    height: 100%;
    object-fit: fill;
    width: 100%;
  }
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
})<{ depth: number; isNextLevel: boolean; isSelected: boolean; color: string }>`
  transition: background 0.3s ease, background-color 0.3s ease;
  will-change: background, background-color;
  position: absolute;
  box-sizing: border-box;
  opacity: 0.3;
  border-style: solid;
  border-color: white;

  ${(props) =>
    props.depth === 0 &&
    css`
      box-shadow: inset 0px 0px 7px 4px  ${props.color && lighten(0.62)(props.color)}   ;
      cursor: pointer
      opacity: 1;
    `}

  ${(props) =>
    props.isNextLevel &&
    css`
      background: radial-gradient(
          53.81% 53.81% at 49.97% 49.97%,
          rgba(255, 255, 255, 0) 75.16%,
          rgba(255, 255, 255, 0.11) 100%
        ),
        linear-gradient(148.2deg, rgba(255, 255, 255, 0.3) 12.74%, rgba(255, 255, 255, 0.01) 54.91%);
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-sizing: border-box;
      opacity: 1;
      transition: opacity 0.3s ease;

      &:hover {
        cursor: pointer;
        opacity: 0.65;
      }
    `}


  ${(props) =>
    props.isSelected &&
    css`
      box-shadow: inset 0px -3.02075px 55.5603px rgba(255, 255, 255, 0.31);
      box-shadow: 0px -1.85837px 33px rgba(255, 255, 255, 0.37);
      opacity: 1;
    `}
`

const CircleComponent = (circleProps: CircleProps<any>) => {
  const { node, style, onMouseEnter, onMouseMove, onMouseLeave, onClick } = circleProps
  const size = interpolateSize(style.radius, 2)
  // eslint-disable-next-line
  const handlers = useNodeMouseHandlers<any>(node, {
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
  })

  const { isSelected, currentDepth } = node.data //  node.id === extraProps.zoomedId
  const isNextLevel = currentDepth + 1 === node.depth
  let showInfo = currentDepth + 1 === node.depth
  const logo = node.data.entity?.logo
  const logoSize = interpolateSize(style.radius, 0.3)

  if (isSelected && !node.data.gotChildren) {
    showInfo = true
  }

  let borderWidth = 0
  if (isSelected) {
    borderWidth = 12
  } else if (currentDepth === node.depth) {
    borderWidth = 1
  }

  return (
    <Circle
      depth={node.depth}
      isSelected={isSelected}
      isNextLevel={isNextLevel}
      color={node.data.color}
      style={{
        top: interpolatePosition(style.y, style.radius),
        left: interpolatePosition(style.x, style.radius),
        height: size,
        width: size,
        backgroundColor: style.color,
        borderRadius: style.radius,
        borderWidth: interpolateBorderWidth(borderWidth, style.radius),
      }}
      onMouseEnter={handlers.onMouseEnter}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      onClick={handlers.onClick}
    >
      <AnimatePresence>
        {logo && (
          <Logo
            style={{
              height: logoSize,
              width: logoSize,
            }}
          >
            <img src={logo} alt={node.data.name} />
          </Logo>
        )}
        {showInfo && <Counter key="counter">4</Counter>}
        {showInfo && (
          <InfoInner
            key="inner"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0 }}
          >
            <Heading type="h3">{node.data.name}</Heading>
            <div>
              {node.data.entity.allocation} {node.data.entity.tokenSymbol}
            </div>
          </InfoInner>
        )}
      </AnimatePresence>
    </Circle>
  )
}

export default CircleComponent
