import React, { useState } from 'react'
import styled from 'styled-components'
import { View } from 'react-native';
import GrayTextButton from '../../components/GrayTextButton';
import GreenButton from '../../components/GreenButton';
import UnderLinedTextInput from '../../components/UnderlinedTextInput';
import { Spacing } from '../../styles';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const AddContainer = styled.View`
  flex: 1;
  justify-content: center;
`


export default () => {
  const [Name, setName] = useState('김ㅇㅇ')
  const [Hp, setHp] = useState('010-1234-5678')
  const [Address, setAddress] = useState('서울시 강남구')
  const [Age, setAge] = useState('24세')
  const [Height, setHeight] = useState('178cm')
  return (
  <Container>
    
    <AddContainer>
      <UnderLinedTextInput placeholder={'이름'}  value={Name} onChangeText={setName} />
      <UnderLinedTextInput placeholder={'H.P'}  value={Hp} onChangeText={setHp} />
      <UnderLinedTextInput placeholder={'주소'} value={Address} onChangeText={setAddress}/>
      <UnderLinedTextInput placeholder={'나이'} value={Age} onChangeText={setAge}/>
      <UnderLinedTextInput placeholder={'키'} value={Height} onChangeText={setHeight} />
      <GreenButton content={'완료하기'} />
    </AddContainer>
  </Container>
)}
