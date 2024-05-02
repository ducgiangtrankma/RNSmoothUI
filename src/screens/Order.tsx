import React, {FC} from 'react';
import {Text} from 'react-native';
import Container from '../components/Container';

interface Props {}
export const Orders: FC<Props> = () => {
  return (
    <Container disableLast>
      <Text>My Orders</Text>
    </Container>
  );
};
