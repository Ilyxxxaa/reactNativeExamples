import React, {RefObject, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Tabs from './Tabs';
import {TabModel} from './Content';
import MaskedView from '@react-native-community/masked-view';

import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: 'row',
  },
});

interface TabHeaderProps {
  tabs: TabModel[];
  y: SharedValue<number>;
  scrollViewRef: RefObject<Animated.ScrollView>;
}

export default ({tabs, y, scrollViewRef}: TabHeaderProps) => {
  const [measurements, setMeasurements] = useState<number[]>(
    new Array(tabs.length).fill(0),
  );

  const index = useDerivedValue(() => {
    let indexValue = 0;
    tabs.map((tab, i) => {
      if (i === tabs.length - 1) {
        if (y.value >= tab.anchor) {
          indexValue = i;
        }
      } else {
        if (y.value >= tab.anchor && y.value < tabs[i + 1].anchor) {
          indexValue = i;
        }
      }
    });
    return withSpring(indexValue);
  }, [y.value, tabs]);

  console.log(measurements);
  console.log('tabs', tabs);
  console.log(index);

  const widthStyle = useAnimatedStyle(() => {
    const width = interpolate(
      index.value,
      tabs.map((_, i) => i),
      measurements,
    );
    console.log('width', width);
    return {
      width,
    };
  });

  const translateXStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      index.value,
      tabs.map((_, i) => i),
      measurements.map((_, i) => {
        return (
          -1 *
            measurements
              .filter((_measurement, j) => j < i)
              .reduce((acc, m) => acc + m, 0) -
          8 * i
        );
      }),
    );

    return {
      transform: [{translateX}],
    };
  });

  const style = {
    borderRadius: 24,
    backgroundColor: 'black',
    // width: measurements[0],
    flex: 1,
  };

  const maskElement = <Animated.View {...{style}} />;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
          },
          translateXStyle,
        ]}>
        <Tabs
          onMeasurement={(i, m) => {
            measurements[i] = m;
            setMeasurements([...measurements]);
          }}
          {...{tabs}}
        />
      </Animated.View>
      <View>
        <Animated.View style={[style, widthStyle]} />
      </View>
      <MaskedView maskElement={maskElement} style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            translateXStyle,
          ]}>
          <Tabs
            active
            onPress={i => {
              console.log(i);
              if (scrollViewRef.current) {
                console.log('exist');
                scrollViewRef.current.scrollTo({y: tabs[i].anchor + 1});
              }
              return true;
            }}
            {...{tabs}}
          />
        </Animated.View>
      </MaskedView>
    </View>
  );
};
