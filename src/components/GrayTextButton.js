import React from 'react'
import styled from 'styled-components';
import {Colors, Spacing, Typography} from '../styles'

const Container = styled.TouchableOpacity`
  background-color: ${Colors.WHITE};
  padding: 8px;
`
const ButtonText = styled.Text`
  color: ${Colors.GRAY};
  text-align: center;
  font-size: ${Typography.FONT_SIZE_12};
  font-weight: ${Typography.FONT_WEIGHT_BOLD};
`

const GrayTextButton = ({content, onClick}) => {
  return(
    <Container onPressOut = {onClick}>
      <ButtonText>
        {content}
      </ButtonText>
    </Container>
  )
}

export default GrayTextButton
