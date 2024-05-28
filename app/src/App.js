import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Pretendard-Black': require('./assets/fonts/Pretendard-Black.otf'),
      'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.otf'),
      'Pretendard-ExtraBold': require('./assets/fonts/Pretendard-ExtraBold.otf'),
      'Pretendard-ExtraLight': require('./assets/fonts/Pretendard-ExtraLight.otf'),
      'Pretendard-Light': require('./assets/fonts/Pretendard-Light.otf'),
      'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.otf'),
      'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.otf'),
      'Pretendard-SemiBold': require('./assets/fonts/Pretendard-SemiBold.otf'),
      'Pretendard-Thin': require('./assets/fonts/Pretendard-Thin.otf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

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
