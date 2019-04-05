import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};


class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();	  
  }

  createUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);
  

  logIn = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);
  

  logOut = () => {
    this.auth.signOut();
  }

  updatePassword = password => 
    this.auth.currentUser.updatePassword(password);
  
}

export default Firebase;
