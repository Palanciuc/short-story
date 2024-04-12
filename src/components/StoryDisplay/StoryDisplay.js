import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; 
import { auth, firestore } from '../../firebase-config'; 
import './StoryDisplay.css';

function StoryDisplay() {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = () => {
            auth.onAuthStateChanged(currentUser => {
                setUser(currentUser);
            });
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchStories = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const userId = user.uid;
                const storiesRef = collection(firestore, 'users', userId, 'stories');
                const querySnapshot = await getDocs(storiesRef);

                const fetchedStories = querySnapshot.docs.map(doc => ({
                    id: doc.id, 
                    data: doc.data().story
                }));
                setStories(fetchedStories);
            } catch (error) {
                console.error('Error fetching stories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStories();
    }, [user]);

    const handleDeleteStory = async (storyId) => {
        try {
            await deleteDoc(doc(firestore, 'users', user.uid, 'stories', storyId));
            
            setStories(prevStories => prevStories.filter(story => story.id !== storyId));
            console.log('Story deleted successfully!');
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    const handleDownloadStory = (storyContent) => {
        const blob = new Blob([storyContent], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = 'story.txt';
        anchor.click();
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : user ? (
                stories.length > 0 ? (
                    stories.map((story, index) => (
                        <div key={index} className="story-display-container">
                            <div className="story-box">
                            <p>{story.data.message && story.data.message.content}</p>
                               
                                <button type="delete" className="delete-button" onClick={() => handleDeleteStory(story.id)}>Delete Story</button>
                               
                                <button type="button" className="download-button" onClick={() => handleDownloadStory(story.data.message.content)}>Download Story</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No stories found.</p>
                )
            ) : (
                <h2 class="centered-text">Please &nbsp;<a href="/login"> log in </a>&nbsp; to view your stories.</h2>
            )}
        </div>
    );
}

export default StoryDisplay;
