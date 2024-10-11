import React, { useRef, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Progress, Text } from 'native-base';
import tw from 'twrnc';

import { initialQuestions } from '@vs/data';
import { Button } from '@vs/components';
import { colors } from '@vs/constants';
import { RadioButton } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { getEmotion } from './../../../utils/emotion';
import { getCurrentDate } from './../../../utils/time.util';
import { executeQuery } from './../../../services/DB.service';
import { useFocusEffect } from '@react-navigation/native';
import { ReactNativeModal } from 'react-native-modal';

type QuestionScreenProps = StackScreenProps<
  Record<string, object | undefined>,
  'QuestionScreen'
>;

export const QuestionScreen = ({ navigation }: QuestionScreenProps) => {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [chosenAnswer, setChosenAnswer] = useState<string>('');
  const selectedAnswers = useRef<string[]>(new Array(initialQuestions.length));
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      if (questionNumber == 1) {
        setModalVisibility(true);
      }
    }, [])
  );

  const navigateToNextQuestion = () => {
    if (selectedAnswers.current[questionNumber - 1] == null) {
      console.log('Please choose an answer');
      Toast.show({ type: 'error', text1: 'Please select an answer' });
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const navigateToPreviousQuestion = () => {
    setQuestionNumber(questionNumber - 1);
  };

  const handleOnComplete = async (emotion: string, date: string) => {
    const sql = `
    INSERT INTO Emotions (emotion, date) 
    VALUES ('${emotion}', '${date}')
  `;
    const result = await executeQuery(sql, [], true);
    if (result) {
      Toast.show({ type: 'success', text1: 'Emotion diary got updated' });
    }
  };

  const navigateToMainStack = async () => {
    const emotion = getEmotion(selectedAnswers.current);
    const date = getCurrentDate();
    await handleOnComplete(emotion, date);
    navigation.navigate('MainStack', {
      screen: 'HomeScreen',
      params: { emotion }
    });
  };

  const addToAnswerList = (answer: string) => {
    selectedAnswers.current[questionNumber - 1] = answer;
    console.log(selectedAnswers.current);
    setChosenAnswer(answer);
  };

  const getRadioButtons = (answers: string[]) => {
    let key = 0;
    return answers.map(answer => {
      ++key;
      return (
        <TouchableWithoutFeedback
          key={key}
          onPress={() => addToAnswerList(answer)}>
          <View style={tw`flex flex-row items-center`}>
            <RadioButton
              color={colors.black}
              onPress={() => addToAnswerList(answer)}
              status={chosenAnswer === answer ? 'checked' : 'unchecked'}
              value={answer}
            />
            <Text fontSize="md">{answer}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  const getProgress = (): number => {
    return (questionNumber / initialQuestions.length) * 100;
  };

  return (
    <View style={tw`flex-1 `}>
      <ReactNativeModal
        backdropColor="#000000"
        backdropOpacity={0.9}
        coverScreen={false}
        isVisible={modalVisibility}
        onBackdropPress={() => setModalVisibility(false)}>
        <View
          style={tw`flex-1 justify-center items-center bg-opacity-50 bg-black p-4`}>
          <View style={tw`bg-white p-4 rounded-lg w-full`}>
            <Text style={tw`text-lg font-bold mb-4 text-center`}>
              How to answer the question
            </Text>
            <View style={tw`mx-5`}>
              <View style={tw`flex flex-row mb-2`}>
                <Text>1. </Text>
                <Text>Answer each question as it appears</Text>
              </View>
              <View style={tw`flex flex-row mb-2`}>
                <Text>2. </Text>
                <Text>Make sure to answer all the questions</Text>
              </View>
              <View style={tw`flex flex-row mb-2`}>
                <Text>3. </Text>
                <Text>
                  Submit your asnwers after completing all the questions
                </Text>
              </View>
              <View style={tw`flex flex-row mb-2`}>
                <Text>4. </Text>
                <Text>Your current emotion will then be displayed</Text>
              </View>
              <View style={tw`flex flex-row mb-2`}>
                <Text>5. </Text>
                <Text>
                  A brief description of your emotion will be shown below
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisibility(false)}
              style={tw`bg-green-500 text-white py-2 px-4 rounded-lg mb-8 mt-8`}>
              <Text style={tw`text-center text-white `}>Got it </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
      <View style={tw`flex-1 mx-5`}>
        <Progress
          style={tw`mt-4 `}
          value={getProgress()}
          colorScheme="success"
        />
        <View style={tw`flex flex-1 justify-between mt-4 `}>
          <View style={tw`my-5`}>
            <Text style={tw`mt-2`} fontSize="md">
              {initialQuestions[questionNumber - 1].question}
            </Text>
            {getRadioButtons(initialQuestions[questionNumber - 1].answers)}
          </View>
          <View style={tw`flex gap-4 my-8`}>
            {questionNumber === initialQuestions.length && (
              <Button title="Next" onPress={navigateToMainStack}></Button>
            )}
            {questionNumber < initialQuestions.length && (
              <Button title="Next" onPress={navigateToNextQuestion}></Button>
            )}
            {questionNumber > 1 && (
              <Button
                title="Previous"
                onPress={navigateToPreviousQuestion}></Button>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
