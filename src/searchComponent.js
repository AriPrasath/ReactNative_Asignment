import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeContext} from '../App';

export const SearchComponent = props => {
  const {onEndSearch, onSwitchTheme} = props;
  const [searchText, setSearchText] = useState('');
  const theme = useContext(ThemeContext);
  console.log('SUCK!!! ~ SearchComponent ~ theme:', theme);

  return (
    <KeyboardAvoidingView
      style={{
        ...styles.baseContainer,
        backgroundColor: theme === 'light' ? '#fff' : '#000',
      }}>
      <View
        style={
          theme === 'light'
            ? styles.themeViewContainerLight
            : styles.themeViewContainerDark
        }>
        <Text
          style={
            theme === 'light' ? styles.themeTextLight : styles.themeTextDark
          }
          onPress={() => onSwitchTheme()}>
          Switch Theme
        </Text>
      </View>
      <View
        style={
          theme === 'light'
            ? styles.viewContainerLight
            : styles.viewContainerDark
        }>
        <TextInput
          defaultValue=""
          placeholder="Search to Find Related Gif's"
          onChangeText={text => {
            setSearchText(text);
          }}
          placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
          value={searchText}
          onEndEditing={() => {
            onEndSearch(searchText);
          }}
          style={
            theme === 'light'
              ? styles.searchTextInputLight
              : styles.searchTextInputDark
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#fff',
  },
  viewContainerLight: {
    width: width - 50,
    height: height * 0.06,
    borderWidth: 1,
    marginHorizontal: 23,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#000',
  },
  viewContainerDark: {
    width: width - 50,
    height: height * 0.06,
    borderWidth: 1,
    marginHorizontal: 23,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#fff',
  },
  themeViewContainerLight: {
    width: width * 0.4,
    height: height * 0.03,
    borderWidth: 1,
    marginHorizontal: 23,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderColor: '#000',
  },
  themeViewContainerDark: {
    width: width * 0.4,
    height: height * 0.03,
    borderWidth: 1,
    marginHorizontal: 23,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderColor: '#fff',
  },
  searchTextInputLight: {
    paddingLeft: 10,
    color: '#000',
    fontSize: 10,
  },
  searchTextInputDark: {
    paddingLeft: 10,
    color: '#fff',
    fontSize: 10,
  },
  themeTextDark: {
    color: '#fff',
  },
  themeTextLight: {
    color: '#000',
  },
});
