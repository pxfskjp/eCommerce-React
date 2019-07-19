import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

    // Helper:
    this.fieldValue = app.firestore.FieldValue;
    //this.emailAuthProvider = app.auth.EmailAuthProvider;

    // Firebase APIs:
    this.auth = app.auth();	 
    this.db = app.firestore();

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

  // *** Message API ***
  // message = uid => this.db.doc(`messages/${uid}`);
  // messages = () => this.db.collection('messages');
  
}

export default Firebase; 
