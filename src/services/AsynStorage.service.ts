import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageService {
  static setData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('Data posted and saved successfully:', data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  static getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };
}
