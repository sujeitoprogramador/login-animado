import React, { useState ,useEffect } from 'react';
import { KeyboardAvoidingView, Text, TextInput, Platform, Keyboard, Animated, StyleSheet, TouchableOpacity, View} from 'react-native';

export default function App() {

  const [offset, setOffset] =  useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity, setOpacity] =  useState(new Animated.Value(0));
  const [logo, setLogo] =  useState(new Animated.ValueXY({x: 120, y: 120}));

  useEffect(() => {
  keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);  
  Animated.parallel([
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 5,
      bounciness: 15,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
    })
  ]).start();
    
  }, []);

  //Teclado Aberto
  function keyboardDidShow () {
    Animated.parallel([
      Animated.timing(logo.y, {
        toValue: (Platform.OS === 'android' ? 70 : 90),
        duration: 100,
      }),
      Animated.timing(logo.x, {
        toValue: (Platform.OS === 'android' ? 70 : 90),
        duration: 100,
      }),
    ]).start();
  }

  //Teclado Fechou
  function keyboardDidHide () {
    Animated.parallel([
      Animated.timing(logo.y, {
        toValue: 120,
        duration: 150,
      }),
      Animated.timing(logo.x, {
        toValue: 120,
        duration: 150,
      }),
    ]).start();
  }

 return (
   <KeyboardAvoidingView  style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
     
     <View style={{flex:1, justifyContent: 'center'}}>
      <Animated.Image 
      style={[
        styles.logo,
        {
          width: logo.x,
          height: logo.y
        }
        ]} 
      source={require('./src/assets/logo.png')}
      />
     </View>

      <Animated.View 
      style={[
         styles.container,
        {
          opacity: opacity,
          transform: [
            { translateY: offset.y}
          ],
        },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={()=> {}}
        />

        <TextInput
          style={styles.input}       
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={()=> {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>

      </Animated.View>
     
   </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'
  },
  logo:{
    
  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 180,
    borderRadius: 5,
    paddingBottom: 50,
  },
  input:{
    backgroundColor: '#FFF',
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    width: '90%',
    marginBottom: 15,
    padding: 10,
  },
  btnSubmit:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#35AAFF',
    height: 45,
    width: '90%',
    borderRadius: 7,
    marginTop: 10,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister:{
    marginTop: 10,
  },
  registerText:{
    color: '#FFF',
  }
}); 