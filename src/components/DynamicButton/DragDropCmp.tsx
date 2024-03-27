import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const _screen_width = Dimensions.get('window').width;
interface PrevPosition {
  x: number;
  y: number;
}

const X = _screen_width - 16 - 60;

export const DragAndDropGifIcon = () => {
  const position = useRef(new Animated.ValueXY()).current;
  const prevPosition = useRef<PrevPosition>({x: 0, y: 0});

  const [dragging, setDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1; // Xử lý phân biệt sự kiện pan hay touch android
      },
      onPanResponderGrant: () => {
        setDragging(true);
        const x = position.x as any;
        const y = position.y as any;
        position.setOffset({
          x: x._value,
          y: y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: () => {
        setDragging(false);
        position.flattenOffset();
        const minX = -X;
        const maxX = 0;
        const minY = -350;
        const maxY = 150;
        const x = position.x as any;
        const y = position.y as any;

        // Kiểm tra nếu toạ độ vượt quá giới hạn thì quay trở lại vị trí ban đầu

        if (
          x._value < minX ||
          x._value > maxX ||
          y._value < minY ||
          y._value > maxY
        ) {
          //Lấy vị trí cận X và Cận Y nếu kéo ra khỏi vùng giới hạn
          const positionX = _.clamp(x._value, minX, maxX);
          const positionY = _.clamp(y._value, minY, maxY);
          Animated.spring(position, {
            toValue: {x: positionX, y: positionY},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    // Lưu vị trí trước đó khi bắt đầu kéo
    const x = position.x as any;
    const y = position.y as any;
    prevPosition.current = {x: x._value, y: y._value};
  }, [dragging, position]);

  return (
    <>
      <Animated.View
        style={[
          styles.gif,
          {
            transform: [{translateX: position.x}, {translateY: position.y}],
            opacity: dragging ? 0.8 : 1,
          },
        ]}
        {...panResponder.panHandlers}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Image source={require('./floatingGif.png')} style={styles.gif} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnClose} onPress={() => {}}>
          <Image
            source={require('./closeGif.png')}
            style={styles.closeButton}
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  cardContainer: {
    marginTop: 20,
  },
  gif: {
    width: 127,
    height: 127,
  },
  closeButton: {
    width: 15,
    height: 15,
  },
  btnClose: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 16,
  },
});
