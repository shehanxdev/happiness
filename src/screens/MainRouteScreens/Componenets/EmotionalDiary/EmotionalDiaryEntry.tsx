import { Text, View , StyleSheet} from 'react-native';
import react from 'react';


interface EmotionalDiaryEntryProps{
    date: string
    content: string
    
}

export const EmotionalDiaryEntry=({date,content}:EmotionalDiaryEntryProps)=>{
    /**
     * VIew
     * Text:date
     * Text:content
     * /Views
     */
    
        return (
          <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.content}>{content}</Text>
          </View>
        );
      };
      
      const styles = StyleSheet.create({
        container: {
          padding: 10,
          borderWidth: 1,
          borderColor: '#00FFFF',
          borderRadius: 5,
          marginBottom: 10,
        },
        date: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        content: {
          fontSize: 16,
        },
      });
      
