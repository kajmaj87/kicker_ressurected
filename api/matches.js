import {collection, doc, getDocs, getFirestore} from 'firebase/firestore/lite';
import {initializeApp} from 'firebase/app';

require('dotenv').config();

const firebaseConfig = {
        projectId: "kicker-olama"
    },

    app = initializeApp(firebaseConfig),
    db = getFirestore(app);

const handler = async (event) => {
    if (event.httpMethod === 'GET') {
        console.log(event)
        console.log(event.queryStringParameters)
        console.log(event.queryStringParameters.group)
        try {
            const matches = await getDocs(collection(db, 'match')),
                groupMatches = doc => !event.queryStringParameters.group || event.queryStringParameters.group == doc.data().group,
                matchesList = matches.docs
                .filter(groupMatches)
                .map(doc => doc.data())
                .sort((a,b) => a.data.seconds - b.data.seconds);
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