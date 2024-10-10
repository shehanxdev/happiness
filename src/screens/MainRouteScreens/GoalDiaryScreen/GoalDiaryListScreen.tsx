import { Checkbox, Fab } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { getFormattedDate } from '../../../utils/greetingMessage';
import tw from 'twrnc'; // Tailwind import
import { color } from '@rneui/base';
import { colors } from '@vs/constants';
import { AddSVG } from '@vs/assets';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { executeQuery } from './../../../services/DB.service';
import { getCurrentDate } from '../../../utils/time.util';

type GoalDiaryListScreenProps = StackScreenProps<
  Record<string, object | undefined>,
  'GoalDiaryListScreen'
>;
interface Goal {
  id: number;
  text: string;
  completed: boolean;
}
interface GoalFromDB {
  id: number;
  title: string;
  date: boolean;
}
interface GoalItemProps {
  goal: Goal;
  onCheck: (id: number) => void;
}
export function GoalDiaryListScreen({ navigation }: GoalDiaryListScreenProps) {
  // State for goals (incomplete and completed)
  const [goals, setGoals] = useState([
    { id: 1, text: 'I will go to work tomorrow.', completed: false },
    { id: 2, text: 'I will go to market at 12pm.', completed: false },
    {
      id: 3,
      text: 'I will read book when I return from work at 6pm.',
      completed: false
    }
  ]);

  const [completedGoals, setCompletedGoals] = useState<Goal[]>(
    new Array<Goal>()
  );

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const date = getCurrentDate();
        const sql = `
      SELECT * FROM Goals;
      WHERE date=${date};
    `;
        const result = await executeQuery<GoalFromDB>(sql, [], false);
        if (Array.isArray(result)) {
          const formatedGoals = new Array<Goal>();
          result.forEach(goal => {
            const tempGoalObject: Goal = {
              id: goal.id,
              text: goal.title,
              completed: false
            };
            formatedGoals.push(tempGoalObject);
          });
          setGoals([...formatedGoals]);
        } else {
          console.log('No records found or unexpected result format');
        }
      };
      getData();
    }, [])
  );
  const [hideCompleted, setHideCompleted] = useState(false);
  const isFocused = useIsFocused();

  // Function to move goals between completed and uncompleted
  const handleCheck = (id: number, completed: boolean) => {
    if (completed) {
      // Move from goals to completed
      const newGoals = goals.filter(goal => goal.id !== id);
      const completedGoal = goals.find(goal => goal.id === id);
      if (completedGoal) {
        completedGoal.completed = true;
        setCompletedGoals([...completedGoals, completedGoal]);
      }
      setGoals(newGoals);
    } else {
      // Move from completed to goals
      const newCompletedGoals = completedGoals.filter(goal => goal.id !== id);
      const uncompletedGoal = completedGoals.find(goal => goal.id === id);
      if (uncompletedGoal) {
        uncompletedGoal.completed = false;
        setGoals([...goals, uncompletedGoal]);
      }
      setCompletedGoals(newCompletedGoals);
    }
  };
  // Function to toggle hiding completed goals
  const toggleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  const GoalItem: React.FC<GoalItemProps> = ({ goal, onCheck }) => (
    <View style={tw`flex-row items-center my-2`}>
      <Checkbox
        value="some"
        isChecked={goal.completed}
        onChange={() => onCheck(goal.id)}
      />
      <Text style={tw`ml-2`}>{goal.text}</Text>
    </View>
  );

  return (
    <View style={tw`p-4`}>
      <View style={tw`flex flex-row justify-between mb-12`}>
        <Text style={tw`font-black text-lg`}>Goal Diary</Text>
        <Text>{getFormattedDate()}</Text>
      </View>
      {/* Today's Goals */}
      <View style={tw`bg-gray-100 p-4 rounded-lg`}>
        <Text style={tw`text-lg font-bold mb-2`}>Your Goals</Text>
        {goals.map(goal => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onCheck={() => handleCheck(goal.id, true)}
          />
        ))}
      </View>

      {/* Completed Goals */}
      <View style={tw`mt-4`}>
        <TouchableOpacity onPress={toggleHideCompleted}>
          <Text style={tw`text-blue-500`}>
            {hideCompleted ? 'Show' : 'Hide'} Completed
          </Text>
        </TouchableOpacity>
        {!hideCompleted && (
          <View style={tw`bg-gray-200 p-4 rounded-lg mt-2`}>
            <Text style={tw`text-lg font-bold mb-2`}>Completed</Text>
            {completedGoals.map(goal => (
              <GoalItem
                key={goal.id}
                goal={goal}
                onCheck={() => handleCheck(goal.id, false)}
              />
            ))}
          </View>
        )}
      </View>
      <View>
        {isFocused && (
          <Fab
            icon={<AddSVG />}
            position="absolute"
            style={tw`mb-20 bg-[${colors.primary[300]}]`}
            onPress={() => {
              navigation.navigate('CreateGoalDiaryScreen');
            }}
          />
        )}
      </View>
    </View>
  );
}
