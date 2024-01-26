/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useDeferredValue, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  LogBox,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GifLayout } from './src/gifLayout';
import { SearchComponent } from './src/searchComponent';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

export const ThemeContext = createContext("light");
function App(): React.JSX.Element {

  const [searchText, setSearchText] = useState("");
  const [theme, setTheme] = useState('light');



  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={{ ...styles.container, backgroundColor: theme === 'light' ? "#fff" : "#000" }}>
        <SearchComponent onEndSearch={(text) => setSearchText(text)} onSwitchTheme={() => {
          console.log("SUCK!!! ~ <SearchComponentonEndSearch={ ~ onSwitchTheme:")
          if (theme === 'light') {
            setTheme('dark');
          } else {
            setTheme('light');
          }
        }} />

        <GifLayout searchText={searchText} />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});

LogBox.ignoreAllLogs();//Ignore all log notifications

export default App;
