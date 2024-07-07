import React, {FC} from 'react';
import {WidgetList} from '../components';
import Container from '../components/Container';
import {CardInfo} from '../components/ShowAndHideCardNumber';

interface Props {}

export const Profile: FC<Props> = () => {
  return (
    <Container disableLast>
      <WidgetList />

      <CardInfo cardNumber={2223000048400011} />
    </Container>
  );
};
