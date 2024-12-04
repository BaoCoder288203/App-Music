import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Cấu hình Firebase của dự án mày
const firebaseConfig = {
  apiKey: "AIzaSyCIqHMWq3ncReIWWNeGK2QL4ZrG9pThL0w",
  authDomain: "app-music-3a332.firebaseapp.com",
  projectId: "app-music-3a332",
  storageBucket: "app-music-3a332.appspot.com",
  messagingSenderId: "857025385238",
  appId: "1:857025385238:web:d0947b3aaeb7221db93637", 
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Authentication
const auth = getAuth(app);

// Hàm đăng ký
export const signUp = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Hàm đăng nhập
export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Đăng xuất
export const signOutWithEmailAndPassword = () => {
  return signOut(auth);
};


// Xuất ra các đối tượng cần thiết
export { auth };

// Xuất đối tượng Firebase app
export default app;
