import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { TASKS } from './tasks';
import { styles } from './styles';
import ListItem from './components/ListItem';

const SwipeToDelete = () => {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback(({ index }) => {
    setTasks(tasks => tasks.filter(item => item.index !== index));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TASKS</Text>
      <ScrollView style={{ flex: 1 }}>
        {tasks.map(task => (
          <ListItem
            key={task.index}
            index={task.index}
            title={task.title}
            onDismiss={onDismiss}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwipeToDelete;
