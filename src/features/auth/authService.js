import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const registerUser = async (userName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("FirebaseAuthService | Kullanıcı oluşturuldu");

    //profil güncelleme
    await updateProfile(user, { displayName: userName });
    console.log("FirebaseAuthService | Kullanıcı ismi güncellendi");

    //kullanıcıyı firestore a kayıt etme
    await setDoc(doc(db, "users", user.uid), {
      userId: user.uid,
      createdAt: new Date.toISOString(),
    });
    console.log("FirebaseAuthService | Kullanıcı firestore a eklendi");
    return userCredential;
  } catch (err) {
    console.error(
      "FirebaseAuthService | Kullanıcı kayıt yada Firestore hatası: ",
      err.code,
      err.message
    );
    throw err;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (err) {
    console.error(
      "FirebaseAuthService | Giriş başarısız: ",
      err.message,
      err.code
    );
    throw err;
  }
};

export const provider = new GoogleAuthProvider();

export const signWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    console.log("FirebaseAuthService | Google ile giriş başarılı");
    return userCredential;
  } catch (err) {
    console.error(
      "FirebaseAuthService | Google ile giriş başarısız:",
      err.message,
      err.code
    );
    throw err;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("FirebaseAuthService | Çıkış başarılı");
  } catch (err) {
    console.error(
      "FirebaseAuthService | Çıkış işlemi başarısız: ",
      err.message,
      err.code
    );
    throw err;
  }
};

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};
