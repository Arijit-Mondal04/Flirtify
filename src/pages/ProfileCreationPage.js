import React, { useState } from 'react';
import { createProfile } from '../services/algorand';
import { saveUserSession } from '../services/firebase';
import { FaHeart, FaChevronRight } from 'react-icons/fa';

const ProfileCreationPage = ({ userAddress, onProfileCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    photo: null,
    name: '',
    age: '',
    gender: 'Male',
    lookingFor: 'Female',
    bio: '',
    location: '',
    interests: [],
    'relationshipIntent': 'Long-term',
    ageRange: 25,
    distance: 50,
  });
  const [loading, setLoading] = useState(false);

  const interestsList = ['Travel', 'Tech', 'Food', 'Fitness', 'Music', 'Web3', 'Gaming', 'Art', 'Sports'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleInterestsChange = (interest) => {
    setProfileData((prevData) => {
      const newInterests = prevData.interests.includes(interest)
        ? prevData.interests.filter((i) => i !== interest)
        : [...prevData.interests, interest];
      return { ...prevData, interests: newInterests };
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await createProfile(userAddress, profileData);
    if (success) {
      await saveUserSession(userAddress, profileData);
      alert('Your Flirtify profile is live on Algorand!');
      onProfileCreated();
    } else {
      alert('Failed to create profile. Please try again.');
    }
    setLoading(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <h2>Step 1: Basic Info</h2>
            <form onSubmit={handleNextStep}>
              <div className="form-group">
                <label>Profile Photo</label>
                <input type="file" onChange={(e) => setProfileData({ ...profileData, photo: e.target.files[0] })} />
                <p className="note">Add more photos for "Premium Verified Badge."</p>
              </div>
              <div className="form-group">
                <label>Name / Nickname</label>
                <input type="text" name="name" value={profileData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input type="number" name="age" value={profileData.age} onChange={handleInputChange} min="18" max="99" required />
              </div>
              <div className="form-group">
                <label>Gender & Looking For</label>
                <div className="flex-group">
                  <select name="gender" value={profileData.gender} onChange={handleInputChange}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                  </select>
                  <FaChevronRight className="arrow-icon" />
                  <select name="lookingFor" value={profileData.lookingFor} onChange={handleInputChange}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Everyone</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Bio / About Me</label>
                <textarea name="bio" value={profileData.bio} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={profileData.location} onChange={handleInputChange} placeholder="E.g., San Francisco, CA" />
              </div>
              <button type="submit">Next: Preferences</button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <h2>Step 2: Preferences</h2>
            <form onSubmit={handleNextStep}>
              <div className="form-group">
                <label>Interests</label>
                <div className="tags-container">
                  {interestsList.map((interest) => (
                    <span
                      key={interest}
                      className={`tag ${profileData.interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => handleInterestsChange(interest)}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Relationship Intent</label>
                <div className="intent-options">
                  <span
                    className={profileData.relationshipIntent === 'Casual' ? 'active' : ''}
                    onClick={() => setProfileData({ ...profileData, relationshipIntent: 'Casual' })}
                  >Casual</span>
                  <span
                    className={profileData.relationshipIntent === 'Long-term' ? 'active' : ''}
                    onClick={() => setProfileData({ ...profileData, relationshipIntent: 'Long-term' })}
                  >Long-term</span>
                  <span
                    className={profileData.relationshipIntent === 'Friendship' ? 'active' : ''}
                    onClick={() => setProfileData({ ...profileData, relationshipIntent: 'Friendship' })}
                  >Friendship</span>
                </div>
              </div>
              <div className="form-group">
                <label>Age Range Preference: {profileData.ageRange}+</label>
                <input type="range" name="ageRange" value={profileData.ageRange} onChange={handleInputChange} min="18" max="60" />
              </div>
              <div className="form-group">
                <label>Distance Preference: {profileData.distance} mi</label>
                <input type="range" name="distance" value={profileData.distance} onChange={handleInputChange} min="1" max="500" />
              </div>
              <button type="submit">Next: Finalize</button>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <h2>Step 3: Finalize</h2>
            <div className="reputation-section">
              <h3>Reputation & Verification</h3>
              <p className="reputation-text">Your initial Reputation Score is <span className="score">100 points</span>.</p>
              <p className="reputation-note">Earn points for good behavior, lose points for ghosting & spam.</p>
              <button className="premium-btn">
                Stake more ALGO for a Premium Verified Badge
              </button>
            </div>
            <div className="submit-section">
              <button onClick={handleSubmit} disabled={loading} className="submit-btn">
                {loading ? 'Processing...' : 'Start My Journey'}
              </button>
              <p className="privacy-note">
                Your data is stored securely. Reputation is on-chain.
                Flirtify never sells your information.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getProgress = () => {
    return (currentStep - 1) / 2 * 100;
  };

  return (
    <div className="profile-creation-container">
      <style>{`
        /* --- General Styles --- */
        .profile-creation-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #121212;
          color: #E0E0E0;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
        }

        .form-card {
          width: 90%;
          max-width: 900px;
          background: #1E1E1E;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: flex;
          overflow: hidden;
        }

        .main-form {
          flex: 2;
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: #333;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 30px;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #FFD700, #FF6347);
          transition: width 0.5s ease-in-out;
        }

        h2 {
          font-size: 2.5em;
          margin-bottom: 20px;
          color: #FFD700;
          font-weight: 600;
        }
        
        /* --- Form Fields --- */
        .form-group {
          margin-bottom: 25px;
          display: flex;
          flex-direction: column;
        }
        
        label {
          font-weight: 500;
          margin-bottom: 8px;
          color: #C0C0C0;
        }

        input[type="text"], input[type="number"], textarea, select {
          padding: 12px;
          border: 1px solid #333;
          background: #2A2A2A;
          border-radius: 8px;
          color: #E0E0E0;
          font-size: 1em;
          transition: border-color 0.3s;
        }
        
        input[type="text"]:focus, input[type="number"]:focus, textarea:focus, select:focus {
          border-color: #FF6347;
          outline: none;
        }
        
        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .note {
          font-size: 0.9em;
          color: #888;
          margin-top: 5px;
        }

        .flex-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .arrow-icon {
          color: #FF6347;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          background: #FF6347;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -8px;
          transition: background 0.3s;
        }
        
        /* --- Tag & Intent Styles --- */
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .tag {
          background: #2A2A2A;
          color: #C0C0C0;
          padding: 8px 15px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .tag.selected {
          background: linear-gradient(45deg, #FF6347, #FFD700);
          color: #121212;
          font-weight: 600;
          box-shadow: 0 0 10px rgba(255, 99, 71, 0.5);
        }

        .intent-options span {
          background: #2A2A2A;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s;
          margin-right: 10px;
        }

        .intent-options span.active {
          background: #FF6347;
          color: #121212;
          font-weight: 600;
          box-shadow: 0 0 10px rgba(255, 99, 71, 0.5);
        }

        /* --- Preview Panel --- */
        .preview-panel {
          flex: 1;
          background: linear-gradient(to top right, #333, #121212);
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        
        .preview-card {
          background: #2A2A2A;
          border-radius: 15px;
          padding: 20px;
          width: 100%;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          position: sticky;
          top: 40px;
        }
        
        .preview-photo {
          width: 150px;
          height: 150px;
          background: #444;
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .preview-card h3 {
          font-size: 1.8em;
          margin: 0;
          color: #FFD700;
        }

        .preview-card p {
          color: #C0C0C0;
          margin: 5px 0;
        }
        
        .reputation-badge {
          background: #38C;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 0.8em;
          margin-top: 10px;
        }

        /* --- Final Step & Submit --- */
        .reputation-section, .submit-section {
          text-align: center;
          margin-top: 30px;
        }

        .reputation-text .score {
          font-weight: bold;
          background: linear-gradient(45deg, #00FF7F, #00C092);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .premium-btn {
          background: linear-gradient(45deg, #8A2BE2, #00FFFF);
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          margin-top: 15px;
        }

        .submit-btn {
          background: linear-gradient(45deg, #FF6347, #FFD700);
          color: #121212;
          padding: 15px 40px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-size: 1.2em;
          font-weight: bold;
          transition: all 0.3s;
          margin-top: 20px;
        }

        .privacy-note {
          font-size: 0.8em;
          color: #888;
          margin-top: 20px;
        }

        /* --- Button Animation & Styling --- */
        button {
          padding: 15px 30px;
          border: none;
          border-radius: 8px;
          background: #FF6347;
          color: #121212;
          font-size: 1em;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 99, 71, 0.4);
        }
        
      `}</style>
      
      <div className="form-card">
        <div className="main-form">
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${getProgress()}%` }}></div>
          </div>
          {renderStep()}
        </div>

        <div className="preview-panel">
          <div className="preview-card">
            <div className="preview-photo">
              {profileData.photo && <img src={URL.createObjectURL(profileData.photo)} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />}
            </div>
            <div className="preview-info">
              <h3>{profileData.name || 'Your Name'}</h3>
              <p>{profileData.age || '--'} years old</p>
              <p>📍 {profileData.location || 'Location'}</p>
              <p className="reputation-badge">Reputation: 100 points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationPage;

