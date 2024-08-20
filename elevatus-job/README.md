# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Components

### FilterComponent

**Location:** `src/components/filter/FilterComponent.tsx`

**Description:**
Provides a search input and a button for filtering job listings. It allows users to enter a search term and initiate a search.

 ### HeaderComponent

 **Location:** `src/components/header/Header.tsx`
 **Description:**
Displays the website header, including a logo and a language switcher. It is sticky and positioned at the top of the page.

 ### JobDetails
 **Location:** `src/components/jobdetails/JobDetails.tsx`
**Description:**
Displays detailed information about a specific job. Includes job title, description, requirements, and other details.

### JobsGridView
 **Location:** `src/components/jobs/JobsGridView.tsx`
**Description:**
Displays a grid view of job listings with search functionality and pagination. It includes FilterComponent for searching and displays a list of JobCard components.
 
### JobCard
 **Location:** `src/components/jobcard/JobCard.tsx`
**Description:**
Represents a single job listing card, showing job title, location, and career level. Optionally includes a button for viewing details.

### LanguageSwitcher
 **Location:** `src/components/languageSwitcher/LanguageSwitcher.tsx`
**Description:**
Allows users to switch between different languages (e.g., English and Arabic). Updates the language setting in local storage and adjusts text direction.

### LoaderSkeleton
 **Location:** `src/components/loadingSkeleton/LoaderSkeleton.tsx`
**Description:**
Displays a skeleton loader as a placeholder while content is being fetched. Mimics the layout of a JobCard to maintain UI consistency during loading.