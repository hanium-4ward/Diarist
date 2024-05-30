import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useFonts from './hooks/useFont';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 4,
  },
});

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Set default props for Text component
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = {
    ...Text.defaultProps.style,
    fontFamily: 'Pretendard-Regular',
  };

  return (
    <View style={styles.container}>
      <Text>안녕하세요 (Regular)</Text>
      <Text style={{fontFamily: 'Pretendard-Bold'}}>안녕하세요 (Bold)</Text>
      <Text style={{fontFamily: 'Pretendard-ExtraBold'}}>안녕하세요 (ExtraBold)</Text>
      {/* 필요한 다른 폰트 스타일도 추가하세요 */}
    </View>
  );
}
