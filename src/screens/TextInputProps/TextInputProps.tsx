import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Pressable,
} from 'react-native';
import React, {useRef} from 'react';
import {getBottomSpace, getStatusBarHeight} from '@utils';

const TextInputProps = () => {
  const textInputRef = useRef<TextInput>(null);

  const getRefInfo = () => {
    textInputRef.current?.focus();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topView} />
      <Pressable onPress={getRefInfo}>
        <Text>Ref Info</Text>
      </Pressable>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            returnKeyType="default"
            autoCapitalize="none"
            selectionColor="red"
            textContentType="nickname"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TextInputProps;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: getStatusBarHeight(),
    paddingBottom: getBottomSpace(),
    flex: 1,
  },
  topView: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 20,
    fontSize: 24,
  },
});
