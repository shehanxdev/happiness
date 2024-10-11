import React, { useRef, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Progress, Text } from 'native-base';
import tw from 'twrnc';

import { initialQuestions } from '@vs/data';
import { Button } from '@vs/components';
import { colors } from '@vs/constants';
import { RadioButton } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import { getEmotion } from './../../../utils/emotion';
import { executeQuery } from './../../../services/DB.service';
import { getCurrentDate } from './../../../utils/time.util';

type QuestionScreenProps = StackScreenProps<
  Record<string, object | undefined>,
  'QuestionScreen'
>;

export const QuestionScreenWithinMainStack = ({
  navigation
}: QuestionScreenProps) => {
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [chosenAnswer, setChosenAnswer] = useState<string>('');
  const selectedAnswers = useRef<string[]>(new Array(initialQuestions.length));

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

  const navigateToMainScreen = async () => {
    const emotion = getEmotion(selectedAnswers.current);
    const date = getCurrentDate();
    await handleOnComplete(emotion, date);
    setQuestionNumber(1);
    selectedAnswers.current = new Array(initialQuestions.length);
    setChosenAnswer('');
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
    <View style={tw`flex-1 mx-5`}>
      <Progress style={tw`mt-4 `} value={getProgress()} colorScheme="success" />
      <View style={tw`flex flex-1 justify-between mt-4 `}>
        <View style={tw`my-5`}>
          <Text style={tw`mt-2`} fontSize="md">
            {initialQuestions[questionNumber - 1].question}
          </Text>
          {getRadioButtons(initialQuestions[questionNumber - 1].answers)}
        </View>
        <View style={tw`flex gap-4 my-8`}>
          {questionNumber === initialQuestions.length && (
            <Button title="Next" onPress={navigateToMainScreen}></Button>
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
  );
};
