import {useState, useEffect} from 'react';
import * as Font from 'expo-font';
import PretendardBlack from '../assets/fonts/Pretendard-Black.otf';
import PretendardBold from '../assets/fonts/Pretendard-Bold.otf';
import PretendardExtraBold from '../assets/fonts/Pretendard-ExtraBold.otf';
import PretendardExtraLight from '../assets/fonts/Pretendard-ExtraLight.otf';
import PretendardLight from '../assets/fonts/Pretendard-Light.otf';
import PretendardMedium from '../assets/fonts/Pretendard-Medium.otf';
import PretendardRegular from '../assets/fonts/Pretendard-Regular.otf';
import PretendardSemiBold from '../assets/fonts/Pretendard-SemiBold.otf';
import PretendardThin from '../assets/fonts/Pretendard-Thin.otf';

const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Pretendard-Black': PretendardBlack,
      'Pretendard-Bold': PretendardBold,
      'Pretendard-ExtraBold': PretendardExtraBold,
      'Pretendard-ExtraLight': PretendardExtraLight,
      'Pretendard-Light': PretendardLight,
      'Pretendard-Medium': PretendardMedium,
      'Pretendard-Regular': PretendardRegular,
      'Pretendard-SemiBold': PretendardSemiBold,
      'Pretendard-Thin': PretendardThin,
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useFonts;
