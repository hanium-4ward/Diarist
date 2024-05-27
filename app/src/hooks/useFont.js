// src/hooks/useFonts.js
import { useState, useEffect } from "react";
import * as Font from "expo-font";

const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Pretendard-Black": require("../../assets/fonts/Pretendard-Black.ttf"),
      "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
      "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
      "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
      "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
      "Pretendard-Medium": require("../../assets/fonts/Pretendard-Medium.ttf"),
      "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
      "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.ttf"),
      "Pretendard-Thin": require("../../assets/fonts/Pretendard-Thin.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useFonts;
