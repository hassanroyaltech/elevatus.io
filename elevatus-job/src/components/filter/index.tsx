import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

// Define the props type for the FilterComponent
interface FilterComponentProps {
    onSearch: (searchTerm: string) => void; // Function to handle the search action
}

// Functional component for filtering job titles
function FilterComponent({ onSearch }: FilterComponentProps) {
    // State to keep track of the current search term
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle search button click
    const handleSearch = () => {
        onSearch(searchTerm); // Trigger the search action with the current search term
    };

    return (
        <Box
            sx={{
                px: 3, // Padding on the x-axis
                py: 2, // Padding on the y-axis
                display: 'flex', // Use flexbox for layout
                justifyContent: 'space-between', // Space items between each other
                alignItems: 'center', // Align items vertically center
                borderEndEndRadius: 15, // Rounded corner on the end (right side)
                borderBottomLeftRadius: 15, // Rounded corner on the bottom left
                border: '1px solid darkgrey', // Border with dark grey color
                backgroundColor: '#f4f4f4', // Light grey background color
                position: 'sticky', // Make the component stick to the top when scrolling
                top: 80, // Distance from the top of the viewport
                zIndex: 1 // Ensure it stays above other content
            }}
        >
            <TextField
                id="outlined-basic"
                label="Job Title" // Label for the search input
                variant="outlined" // Outline variant for the text field
                type="search" // Type of the input field
                onChange={(event) => setSearchTerm(event.target.value)} // Update state on input change
                placeholder="Search by job title" // Placeholder text for the input
                size="small" // Smaller size for the input field
                sx={{ bgcolor: "#fff" }} // Set background color to white
            />
            <Button 
                variant="contained" // Use contained button variant
                onClick={handleSearch} // Trigger the search when clicked
                sx={{ fontWeight: 600, textTransform: 'capitalize' }} // Button styles
            >
                Search
            </Button>
        </Box>
    );
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(FilterComponent);
