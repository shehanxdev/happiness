import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { theme } from './theme';
import tw from 'twrnc';
import { Routes } from './src/routes';
import { colors } from '@vs/constants';
import Toast from 'react-native-toast-message';
import { createTable, getDBConnection } from './src/services/DB.service';
import { LogBox } from 'react-native';

function App(): React.JSX.Element {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        await createTable(db);
        console.log('Table SleepInfo created successfully.');
      } catch (error) {
        console.error('Error initializing database: ', error);
      }
    };

    initDB(); // Initialize the database on app load
  }, []);
  return (
    <NativeBaseProvider theme={theme} isSSR={false}>
      <StatusBar backgroundColor={colors.primary[300]} />
      {/* //TODO: below route param isFirst Time must be changed to a dynamic value once developments are done */}

      <Routes isFirstTime={true} />
      <Toast />
    </NativeBaseProvider>
  );
}

export default App;
