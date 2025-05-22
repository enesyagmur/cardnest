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

/**
 * Yeni bir kullanıcı kayıt eder
 * @param {string} userName kullanıcının ismi
 * @param {string} email kullanıcının mail adresi
 * @param {string} password kullanıcının şifresi
 * @returns {Promise<UserCredential>} başarılı kayıt sonrası dönüş
 * @throws {FirebaseError} hata oluşma durumunda
 */

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
      collectionList: [],
      createdAt: new Date(),
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

/**
 * Mail ve şifre ile giriş
 * @param {string} email kullanıcının mail adresi
 * @param {string} password kullanıcının şifresi
 * @returns {Promise<UserCredential>}  başarılı kayıt sonrası dönüş
 * @throws {FirebaseError} hata sonrası dönüş
 */

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("FirebaseAuthService | Giriş başarılı");
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

/**
 * Google ile giriş işlemi
 * @returns {Promise<UserCredential>} başarılı giriş sonrası
 * @throws {FirebaseError} hata sonrası
 */

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

/**
 * Mevcut kullanıcının oturumunu kapattırır
 * @returns {Promise<void>} çıkış yamamlandığında
 * @throws {FirebaseError} çıkış işleminde hata olduğunda
 */

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

/**
 * Kullanıcının tüm oturum değişikliklerini dinler ve tetiklenir
 * @param {function(firebase.User | null):void}
 * @returns {firebase.Unsubscribe}
 */

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};
