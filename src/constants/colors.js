
import { useColorScheme } from "react-native";

const getThemeColors = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const darkModeColors = {

  };
  
  const lightModeColors = {
    
  };
  
  const colors = isDarkTheme ? darkModeColors : lightModeColors;
  
  return Object.freeze(colors);
  
};

export default getThemeColors;