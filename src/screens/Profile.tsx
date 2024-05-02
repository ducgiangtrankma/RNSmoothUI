import React, {FC} from 'react';
import {DynamicButton, WidgetList} from '../components';
import Container from '../components/Container';

interface Props {}
export const Profile: FC<Props> = () => {
  return (
    <Container disableLast>
      <WidgetList />
      <DynamicButton />
    </Container>
  );
};
