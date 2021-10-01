import {collection, getDocs, getFirestore} from 'firebase/firestore/lite';
import {initializeApp} from 'firebase/app';

require('dotenv').config();

const firebaseConfig = {
        projectId: "kicker-olama"
    },

    app = initializeApp(firebaseConfig),
    db = getFirestore(app);

const handler = async (event) => {
    if (event.httpMethod === 'GET') {
        try {
            const matches = await getDocs(collection(db, 'match')),
                matchesList = matches.docs.map(doc => doc.data());
            return {
                statusCode: 200,
                body: JSON.stringify(matchesList),
            }
        } catch (error) {
            return {statusCode: 500, body: error.toString()}
        }
    }
}

export {handler};