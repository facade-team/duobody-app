import React from 'react'
import { Colors, Spacing, Typography } from '../styles'

import styled from 'styled-components'

const Container = styled.TouchableOpacity`
  background-color: ${Colors.PRIMARY};
  border-radius: ${Spacing.SCALE_18};
  padding: 8px;
`

const ButtonText = styled.Text`
  color: ${Colors.WHITE};
  text-align: center;
  font-size: ${Typography.FONT_SIZE_16};
  font-weight: ${Typography.FONT_WEIGHT_BOLD};
`

const GreenButton = ({ content, onClick, width = Spacing.SCALE_200 }) => {
  const handleOnPressOut = () => {
    onClick()
  }

  return (
    <Container onPressOut={() => handleOnPressOut()} width={width}>
      <ButtonText>{content}</ButtonText>
    </Container>
  )
}

export default GreenButton
