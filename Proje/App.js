import React,{useState,useEffect} from "react";
import { View,Text,TextInput,Button,FlatList,StyleSheet, Pressable,ImageBackground } from "react-native";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('')

  useEffect(()=>{
    retrieveData();
  },[]);

  const retrieveData = async () =>{
    try{
      const storedNotes = await AsyncStorage.getItem('notes');
      if(storedNotes  !== null){
        setNotes(JSON.parse(storedNotes));
        }  
        }catch (error) {
        console.error('Error retrieving data:', error);
      }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };
  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };
  const image = {uri: 'https://images.unsplash.com/photo-1581215524789-83361d941827?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'};
  useEffect(() => {
    // Notlar değiştiğinde AsyncStorage'e kaydet
    saveData();
  }, [notes]);
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Notlar</Text>
      <TextInput
        style={styles.input}
        placeholder="Notunuzu giriniz"
        value={newNote}
        onChangeText={setNewNote}
      />
     <Pressable >
     <Text style={styles.TextAdd}  onPress={addNote}>Notu Ekle</Text>
     </Pressable>
     <Text style={styles.titleEX}>Notlarım</Text>
      <FlatList
        data={notes}
        renderItem={({ item, index }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item}</Text>
            <Text onPress={() => deleteNote(index)}><Feather name="trash-2" size={28} color="black" /></Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    height:1600,
    textAlign:"center",
    justifyContent:"center",
    backgroundColor:"#ffeaa7"

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent:"center",
    height:50,
    marginTop:60,
    borderRadius:40,
    paddingLeft:25
  
   
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent:"center",
    
    marginTop:40,
  },
  noteText: {
    flex: 1,
    marginRight: 10,
  },
  title:{
    textAlign:"center",
    fontWeight:"bold",
    fontSize:26,
  
  },
  TextAdd:{
    textAlign:"center",
    backgroundColor:"#67CBF0",
    padding:10,
    borderRadius:40
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  titleEX:{
    
    fontSize:27,
    color:"#636e72",
    fontWeight:"600",
    marginTop:45
  }
});

export default App;