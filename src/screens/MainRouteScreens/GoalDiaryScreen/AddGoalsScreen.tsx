import { Button } from '@vs/components';
import { colors } from '@vs/constants';
import { Input, TextArea } from 'native-base';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import { executeQuery } from './../../../services/DB.service';
import Toast from 'react-native-toast-message';
import { getCurrentDate } from '../../../utils/time.util';

export function AddGoalsScreen() {
  const [title, setTitle] = useState<string>('');
  const handleOnComplete = async () => {
    const sql = `
    INSERT INTO Goals (title, date) 
    VALUES ('${title}', '${getCurrentDate()}')
  `;
    const result = await executeQuery(sql, [], true);
    if (result) {
      Toast.show({ type: 'success', text1: 'Goals got updated' });
    }
  };
  const handleTitleChange = (title: string) => {
    setTitle(title);
  };
  return (
    <View style={tw`mx-6 my-6`}>
      <Text style={tw`text-lg text-black mb-10`}>Add goals</Text>
      <View style={tw`mb-6`}>
        <Input
          backgroundColor={colors.white}
          focusOutlineColor={colors.primary[400]}
          variant="outline"
          value={title}
          onChangeText={handleTitleChange}
          placeholder="Title"
        />
      </View>
      <TextArea
        backgroundColor={colors.white}
        focusOutlineColor={colors.primary[400]}
        h={80}
        placeholder="Explain your goal further"
        w="100%"
        autoCompleteType={''}
      />
      <View style={tw`mt-12`}>
        <Button
          onPress={() => {
            handleOnComplete();
          }}
          title="Add"
        />
      </View>
    </View>
  );
}
