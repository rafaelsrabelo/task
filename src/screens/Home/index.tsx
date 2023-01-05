import { useState } from 'react';
import { Text, View, TextInput,  TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { Task } from '../../components/Task';
import { styles } from './styles';

export function Home() {
  const [task, setTask] = useState<string[]>([]);
  const [tasks, setTasks] = useState('');
  // const task = ['Bernardo']
  var data = new Date();

  function handleAdd() {
    if (task.includes(tasks)) {
      return Alert.alert("Tarefa Existe","Já existe uma tarefa na lista com esse nome!")
    }

    setTask(prevState => [...prevState, tasks]);
    setTasks('');
    console.log(data);
  }

  function handleRemove(name: string) {
    // return console.log(task.filter(participant => participant !== name))

    Alert.alert("Remover", `Deseja remover a tarefa ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setTask(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]) 
  }


  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>O que temos pra fazer hoje?</Text>
      <Text style={styles.eventDate}>Quita, 5 de Janeiro de 2023.</Text>
      <TextInput
        onChangeText={setTasks}
        placeholder='Digite aqui'
        placeholderTextColor="#6b6b6b"
        style={styles.input}
        value={tasks}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>
          ADICIONAR TAREFA
        </Text>
      </TouchableOpacity>
      <FlatList
        data={task}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Task key={item} name={item} onRemove={() => handleRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyDiv}>
            <Image style={styles.image} source={require('./../../../assets/empty-bg.png')} />
            <Text style={styles.listEmpty}>
            {/* <Image source={} /> */}
            Sua lista está vazia, vamos deixar se der vagabundo!
            </Text>
          </View>
        )}
      />
    </View>
  )
}