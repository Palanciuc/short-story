import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase-config';

const fetchStoriesFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'stories'));

        const stories = [];
        querySnapshot.forEach(doc => {
            const storyData = doc.data().story;
            stories.push(storyData);
        });

        console.log('Fetched stories:', stories); 
        return stories;
    } catch (error) {
        console.error('Error fetching stories from Firestore:', error);
        throw error;
    }
};

export default fetchStoriesFromFirestore;
