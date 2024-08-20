import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Language {
  name: string;
  direction: string; // Text direction (ltr or rtl)
}

// Language options with their text direction
const languages: { [key: string]: Language } = {
  en: { name: 'English', direction: 'ltr' },
  ar: { name: 'العربية', direction: 'rtl' },
};

function LanguageSwitcher() {
  const [language, setLanguage] = useState('en'); // Default language is English
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle language switch
  const handleLanguageChange = () => {
    const selectedLanguage = language === 'en' ? 'ar' : 'en'; // Toggle between English and Arabic
    setLanguage(selectedLanguage);
    document.documentElement.dir = languages[selectedLanguage].direction; // Set text direction
    document.documentElement.lang = selectedLanguage; // Set language attribute
    localStorage.setItem('language', selectedLanguage); // Save language preference in local storage
    navigate(0); // Refresh the page to apply language change
  };

  // Load stored language preference on component mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      document.documentElement.dir = languages[storedLanguage as keyof typeof languages].direction;
      document.documentElement.lang = storedLanguage;
    }
  }, []); 

  return (
    <Button
      variant="text"
      sx={{ color: 'white' }}
      color={'inherit'}
      onClick={handleLanguageChange}
    >
      {languages[language].name} {/* Display the current language name */}
    </Button>
  );
}

export default LanguageSwitcher;
