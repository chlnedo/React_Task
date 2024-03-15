import React, { useState, useEffect } from 'react';
import './LanguageSelector.css';
import { IoIosArrowRoundUp } from "react-icons/io";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://api-staging.bitdelta.com/api/v1/public/lang', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLanguages(data.data);
          setSelectedLanguage(data.data.find((l) => l.default).lang);
        } else {
          console.error('Failed to fetch languages from the API');
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language) => {
    
    setSelectedLanguage(language.lang);
    
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button className="language-button" onClick={toggleDropdown}>
        {selectedLanguage} <IoIosArrowRoundUp className={`Arrow ${isOpen ? 'up' : 'down'}`}/>
      </button>
      {isOpen && (
        <ul className="language-list">
          {languages.map((language) => (
            <li key={language.slug} onClick={() => handleLanguageSelect(language)}  style={{
                backgroundColor:
                  language.lang === selectedLanguage ? '#f0f0f0' : 'transparent',
              }}>
              {language.lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;