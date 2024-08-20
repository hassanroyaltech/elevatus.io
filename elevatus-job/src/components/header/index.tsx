import { Box, Container } from '@mui/material'; // Import MUI components
import LanguageSwitcher from '../languageChanger'; // Import language switcher component
import { Link } from 'react-router-dom'; // Import Link component for navigation

// Functional component for the header section
function Header() {
  return (
    <Box
      component="section" // Use 'section' as the HTML element for this Box component
      sx={{
        bgcolor: 'primary.main', // Background color using theme's primary color
        position: 'sticky', // Make the header stick to the top when scrolling
        top: 0, // Stick to the very top of the viewport
        zIndex: 1 // Ensure it stays above other elements
      }}
    >
      <Container
        sx={{
          mx: 'auto', // Center the container horizontally
          display: 'flex', // Use flexbox for layout
          alignItems: 'center', // Vertically center items
          justifyContent: 'space-between', // Space out items between the start and end
          height: 80, // Set a fixed height for the container
          maxWidth: 'calc(100% - 25%) !important' // Override max width to make container responsive
        }}
      >
        {/* Link to the homepage with logo */}
        <Link to={'/'}>
          <img src='/logo.png' height={21} alt="Company Logo"/> {/* Logo image */}
        </Link>
        <LanguageSwitcher/> {/* Component for switching languages */}
      </Container>
    </Box>
  );
}

export default Header; // Export the Header component for use in other parts of the application
