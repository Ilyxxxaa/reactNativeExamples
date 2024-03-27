import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getBottomSpace, getStatusBarHeight} from '@utils';
import {headerData, sectionsData} from './data';

import MaskedView from '@react-native-community/masked-view';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

const ScrollViewWithDynamicHeader = () => {
  const sectionsHeight = [775, 1500, 2325, 3100];

  // const headerSectionWidths = [0, 239, 478, 717];

  const [headerSectionWidths, setHeaderSectionWidths] = useState<number[]>([]);

  console.log(headerSectionWidths);

  const headerRef = useRef<FlatList>(null);
  const scrollingHeaderRef = useRef<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentIndexAnimated = useSharedValue(0);
  const currentIndexAnimated1 = useRef(new Animated.Value(0)).current;
  const currentIndexWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('animation');

    Animated.timing(currentIndexAnimated1, {
      toValue: headerSectionWidths.reduce((acc, item, index) => {
        if (index < currentIndex) {
          acc += item + 100;
        }
        return acc;
      }, 0),
      useNativeDriver: true,
    }).start();
    // Animated.spring(currentIndexWidth, {
    //   toValue: headerSectionWidths[currentIndex] || 0,
    //   useNativeDriver: false,
    // }).start();
  }, [
    currentIndex,
    currentIndexAnimated1,
    headerSectionWidths,
    currentIndexWidth,
  ]);

  // const aStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{translateX: currentIndexAnimated.value}],
  //   };
  // });

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    // console.log(offsetY);
    if (!scrollingHeaderRef.current) {
      for (let i = 0; i < sectionsHeight.length; i++) {
        if (e.nativeEvent.contentOffset.y - 10 < sectionsHeight[i]) {
          // console.log('set nav index', i);
          // setNavIndex(i);
          if (i > currentIndex) {
            console.log('change scrolling ref');
            scrollingHeaderRef.current = true;
          }
          setCurrentIndex(i);
          if (i !== currentIndex) {
            headerRef?.current?.scrollToIndex({
              animated: true,
              index: i,
              viewPosition: 0.5,
            });
          }

          // scrollTopBar(i, true);
          break;
        }
      }
    }
  };

  return (
    <Animated.View style={styles.wrapper}>
      <View>
        {/* <View style={styles.indicator} /> */}
        <FlatList
          ref={headerRef}
          data={headerData}
          horizontal
          onScrollToIndexFailed={() => {
            console.log('failed');
          }}
          onMomentumScrollEnd={() => {
            scrollingHeaderRef.current = false;
            console.log('on momentum scroll end');
          }}
          initialScrollIndex={0}
          renderItem={({item, index}) => {
            return (
              <View
                style={styles.headerItem}
                onLayout={e => {
                  console.log(e.nativeEvent.layout, index);
                  const width = e.nativeEvent.layout.width;
                  setHeaderSectionWidths(prev => {
                    const copy = [...prev];
                    copy[index] = width;
                    return copy;
                  });
                }}>
                <Text style={styles.headerItemText}>{item}</Text>
              </View>
            );
          }}
          ListHeaderComponent={
            <Animated.View
              style={[
                styles.indicator,
                {
                  transform: [{translateX: currentIndexAnimated1}],
                  width: headerSectionWidths[currentIndex],
                },
              ]}
            />
          }
          contentContainerStyle={styles.headerContainer}
          style={styles.flatList}
          bounces={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        onScroll={onScroll}
        style={{flex: 1}}
        data={sectionsData}
        renderItem={({item}) => {
          return (
            <View>
              <Text style={styles.sectionTitle}>{item.title}</Text>

              {item.data.map(item => {
                return (
                  <View key={item} style={styles.sectionItem}>
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>
          );
        }}
      />
    </Animated.View>
  );
};

export default ScrollViewWithDynamicHeader;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    paddingBottom: getBottomSpace(),
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: 'gray',
    paddingVertical: 20,

    // height: '100%',
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'red',
    top: 0,
    borderRadius: 10,

    // transform: [{translateX: 478}],
    // left: 0,
    // flex: 1,
  },
  flatList: {
    // flex: 1,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 25,
  },
  sectionItem: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  headerItem: {
    padding: 5,
    marginRight: 100,
    // backgroundColor: 'white',
    // backgroundColor: 'transparent',
    borderRadius: 10,
  },
  headerItemText: {
    fontSize: 18,
    lineHeight: 20,
  },
});
