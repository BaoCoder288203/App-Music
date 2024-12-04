import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ActivityIndicator ,Button} from 'react-native';
import { Icon } from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux_Toolkit/userSlice';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleRegister = () => {
    if (password !== confirmPass) {
      alert('Passwords do not match!');
      return;
    }

    // Dispatch registerUser thunk
    dispatch(registerUser({ email, password }))
      .unwrap()
      .then(() => {
        alert('Registration successful!');
        navigation.navigate('Login'); 
      })
      .catch((err) => {
        alert(`Registration failed: ${err}`);
      });
  };
    
  return (
    <View style={styles.box}>
      <Image style={styles.imgBack} source={require('../../all_images/Launch Screen/Image 30.png')} />
      <View style={styles.containerCover}>
        <View style={styles.container}>
          <Image source={require('../../all_images/Launch Screen/Image 33.png')} style={{ width: 50, height: 50,marginVertical:10 }} />
          <Text style={styles.title}>Sign up to Music's</Text>

          {/* Google */}
          <TouchableOpacity style={styles.button}>
            <Icon name="google" type="font-awesome" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity style={styles.button}>
            <Icon name="facebook" type="font-awesome" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <Text style={{ marginVertical: 10, fontSize: 14, fontWeight: 'bold', color: 'white' }}>OR</Text>

          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Input your Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {/* Password */}
          <TextInput
            style={styles.input}
            placeholder="Input your Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {/* Confirm Password */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry
          />
            {error === '' ? <Text></Text> : <Text  style={{color:'red',fontSize:15}}>{error}</Text>}

            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
              <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInText}>Log in to Music's</Text>
            </TouchableOpacity>
          </View>

          {/* Go Back */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  containerCover: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 20,
    shadowColor: '#7A47AE',
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  imgBack: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 15,
  },
  loginButtonText: {
    color: '#1d1d1d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'white',
  },
  signInText: {
    color: '#7A47AE',
    fontWeight: 'bold',
  },
  backButton: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Register;
