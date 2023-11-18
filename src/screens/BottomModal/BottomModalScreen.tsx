import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetRefProps} from './components/BottomSheet';
import {getStatusBarHeight} from '@utils';

const BottomModalScreen = () => {
  const ref = useRef<BottomSheetRefProps>(null);

  const openModal = useCallback(() => {
    const isActive = ref?.current?.isActive();

    if (isActive) {
      ref.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <View style={styles.container}>
        <Pressable onPress={openModal}>
          <Text>Open Modal</Text>
        </Pressable>
        <BottomSheet ref={ref} />
      </View>
    </GestureHandlerRootView>
  );
};

export default BottomModalScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    paddingTop: getStatusBarHeight(),
    flex: 1,
    backgroundColor: 'gray',
  },
});
