import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCV7AhwDVBllxFcgTudN1PEm4kPhHDyV1M',
	authDomain: 'my-clothing-ecommerce.firebaseapp.com',
	databaseURL: 'https://my-clothing-ecommerce.firebaseio.com',
	projectId: 'my-clothing-ecommerce',
	storageBucket: 'my-clothing-ecommerce.appspot.com',
	messagingSenderId: '845712652170',
	appId: '1:845712652170:web:5d2e9dbf3f2e3b37927a73',
	measurementId: 'G-2WTZFPKSFS'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	console.log(snapShot);
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
