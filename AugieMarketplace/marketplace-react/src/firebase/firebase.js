import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from './config'

var firebaseConfig = {
   ...config
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('email');
provider.setCustomParameters({
    'hd': 'augustana.edu'
});
export async function signInWithGoogle() {
    auth.signInWithPopup(provider)
        .then(data => {
            const { additionalUserInfo, user } = data
            const { isNewUser } = additionalUserInfo
            if ( isNewUser ) {
                const { profile: { given_name, family_name, email, picture } } = additionalUserInfo
                const {  uid, phoneNumber  } = user
                const userCredentials = {
                    email,
                    name: {
                        first: given_name,
                        last: family_name
                    },
                    createdAt: new Date().toISOString(),
                    imageUrl: picture,
                    uid, 
                    phoneNumber: phoneNumber ? phoneNumber : ''
                  };

                  return db.doc(`/users/${email}`).set(userCredentials);
            }
            return 'LogIn' 
            //TODO: how to handle this like (req, res) in server side?
        })
        
          .catch((err) => {
            console.error(err);
            //TODO: how to handle this like (req, res) in server side?
          })
}