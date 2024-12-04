import React,{useState} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUserData, loginUser, setUserId } from '../../Redux_Toolkit/userSlice';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleLogin = async () => {
    if (!email || !password) {
      console.log('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password }));

      console.log('result:',result);

      if (result.meta.requestStatus === 'fulfilled') {
        const { userId } = result.payload;
        dispatch(setUserId(userId));
        await dispatch(loadUserData());

        navigation.navigate('Home');
      } else {
        throw new Error('Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
  };

  return (
    <View style={styles.box}>
        <Image style={styles.imgBack} source={require('../../all_images/Launch Screen/Image 30.png')} />
        <View style={styles.containerCover}>
            <View style={styles.container}>
              <Image source={require('../../all_images/Launch Screen/Image 33.png')} style={{width:50,height:50,marginVertical:10}} />
              <Text style={styles.title}>Log in to Music's</Text>

              <TextInput
                  style={styles.input}
                  placeholder="Email or username"
                  placeholderTextColor="gray"
                  value={email}
                  onChangeText={setEmail}
              />
              
              <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
              />
              
              {
                error === '' ? '' : <Text style={{color:'red',fontSize:15}}>{error}</Text>
              }

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Forgot your password?</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                  <Text style={styles.footerText}>Already have an account? </Text>
              </View>
              <TouchableOpacity style={{
                marginVertical:20,
                borderWidth:1,
                borderColor:'white',
                borderRadius:50,
                width:'100%',
                justifyContent: 'center',
                alignItems:'center',}} 
                onPress={() => navigation.goBack()}>
                <Text>
                  <AntDesign name="arrowleft" size={40} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box:{
    flex:1,
  },
  containerCover: {
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems:'center',
  },
  container: {
    width:300,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:15,
    paddingHorizontal: 20,
     // Shadow for iOS
     shadowColor: '#7A47AE',
     shadowOffset: { width: 5, height:6 },
     shadowOpacity: 0.5,
     shadowRadius: 5,
     // Shadow for Android
     elevation: 5,
  },
  imgBack: {
    width: '100%',
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
    borderWidth:1,
    borderColor:'white',
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
  forgotPassword: {
    color: '#7A47AE',
    marginVertical: 10,
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
});

export default Login;
