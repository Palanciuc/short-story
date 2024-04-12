import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StoryForm.css';
import axios from 'axios';
import { firestore, auth } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const instance = axios.create({
    baseURL: 'http://localhost:5001',
});

function StoryForm() {
    const [formData, setFormData] = useState({
        genre: '',
        characterName: '',
        time: '',
        location: '',
        environment: '',
    });
    const [generatedStory, setGeneratedStory] = useState('');
    const [user, setUser] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!user) {
                alert('Please log in or register to generate a story.');
                navigate('/login');
                return;
            }

            setIsGenerating(true);

            const response = await instance.post('/generate-story', formData);
            console.log('Response:', response);

            const { story } = response.data;
            console.log('Story:', story);
            if (story) {
                setGeneratedStory(story);
            } else {
                console.error('Invalid response format:', response);
                setGeneratedStory('An error occurred while generating the story. Please try again.');
            }
        } catch (error) {
            console.error('Error generating story:', error);
            setGeneratedStory('An error occurred while generating the story. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveStory = async () => {
        try {
            if (!generatedStory) {
                window.alert('No story to save. Please generate a story first!');
                return;
            }

            const userId = auth.currentUser.uid;

            await addDoc(collection(firestore, 'users', userId, 'stories'), {
                story: generatedStory,
                timestamp: new Date()
            });

            console.log('Story saved successfully!');

            window.alert('Your story has been saved successfully!');
        } catch (error) {
            console.error('Error saving story:', error);

            window.alert('Failed to save the story. Please try again.');
        }
    };


    const genres = [
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Romance",
        "Adventure",
    ];

    return (
        <div className="story-form-container">
            <p className="message">You can generate a random story without completing any fields by clicking Generate Story, or you can choose to fill in specific fields.</p>
            <form onSubmit={handleSubmit}>
                <div className="story-form-group">
                    <label htmlFor="genre">Genre:</label>
                    <select name="genre" value={formData.genre} onChange={handleChange} className="form-control">
                        <option value="">Select a Genre</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="story-form-group">
                    <label htmlFor="characterName">Character Name:</label>
                    <input type="text" name="characterName" value={formData.characterName} onChange={handleChange} className="form-control" />
                </div>

                <div className="story-form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="text" name="time" value={formData.time} onChange={handleChange} className="form-control" placeholder="e.g., 1920s, Future, Morning" />
                </div>

                <div className="story-form-group">
                    <label htmlFor="location">Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" placeholder="e.g., New York City, A Distant Planet" />
                </div>

                <div className="story-form-group">
                    <label htmlFor="environment">Environment:</label>
                    <input type="text" name="environment" value={formData.environment} onChange={handleChange} className="form-control" placeholder="e.g., Urban Jungle, Snowy Mountains" />
                </div>

                <button type="submit" className="submit-button">Generate Story</button>
            </form>

            {isGenerating && (
                <div className="animation">
                    <div className="loader"></div>
                    <p>Generating your story... Please be patient!</p>
                </div>
            )}
            <div className="generated-story-container">
                <h2>Generated Story</h2>
                {typeof generatedStory === 'string' ? (
                    <p>{generatedStory}</p>
                ) : (
                    <p>{generatedStory.message.content}</p>
                )}
                <button className="save-button" onClick={handleSaveStory}>Save Story</button>
            </div>
        </div>
    );
}

export default StoryForm;
