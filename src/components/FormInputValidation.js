import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, LayoutAnimation, Platform, UIManager } from 'react-native';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const FormInputValidation = ({ isValid }) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isValid) {
      LayoutAnimation.configureNext({
        duration: 250, // Specify the duration in milliseconds
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      });
      setErrorMessage('Invalid input!');
    } else {
      LayoutAnimation.configureNext({
        duration: 250, // Specify the duration in milliseconds
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      });
      setErrorMessage(''); // Reset error message when input is valid
    }
  }, [isValid]);

  return (
    <View>
      <TextInput />
      {!isValid && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
    </View>
  );
};

export default FormInputValidation;
