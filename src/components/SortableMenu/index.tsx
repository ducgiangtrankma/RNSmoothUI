import React from 'react';
import {View} from 'react-native';
import {Box} from './Box';
import {SortTableMenu} from './SortTableMenu';

const tiles = [
  {
    id: 'spent',
  },
  {
    id: 'cashback',
  },
  {
    id: 'recent',
  },
  {
    id: 'cards',
  },
];

export const WidgetList = () => {
  return (
    <View style={{}}>
      <SortTableMenu
        editing={true}
        onDragEnd={positions =>
          console.log(JSON.stringify(positions, null, 2))
        }>
        {[...tiles].map((tile, index) => (
          <Box
            onLongPress={() => true}
            key={tile.id + '-' + index}
            id={tile.id}
          />
        ))}
      </SortTableMenu>
    </View>
  );
};
