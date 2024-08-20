import React, { createContext, useContext, useState, useCallback } from 'react';
import { getJobList } from './services/jobs';
import { Job } from './types/job.types';

// Define the shape of the context data
interface JobsContextProps {
    jobList: Job[]; // List of jobs to be displayed
    loading: boolean; // Indicates if data is being loaded
    error: string | null; // Stores any error messages
    totalPages: number; // Total number of pages available
    currentPage: number; // Current page number
    searchTerm: string; // Current search term
    fetchJobs: (searchTerm?: string, page?: number) => void; // Function to fetch jobs
    handleSearch: (searchTerm: string) => void; // Function to handle search term changes
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void; // Function to handle page changes
}

// Create the Jobs context with an undefined default value
const JobsContext = createContext<JobsContextProps | undefined>(undefined);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State variables to manage job list, search term, loading state, etc.
    const [jobList, setJobList] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const jobsPerPage = 10; // Number of jobs per page
    const storedLanguage = localStorage.getItem('language'); // Retrieve stored language setting

    // Function to fetch jobs based on search term and page number
    const fetchJobs = useCallback((searchTerm: string = '', page: number = 0) => {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors
        getJobList('ee5d991c-cdc64e83-b0b396f147208549', searchTerm, jobsPerPage, page, storedLanguage ?? JSON.stringify(storedLanguage))
            .then((response) => {
                setJobList(response.results.jobs); // Update job list
                setTotalPages(Math.ceil(response.results.total / jobsPerPage)); // Calculate total pages
            })
            .catch((error) => {
                console.error(`Error fetching jobs: ${error.message}`); // Log error message
                setError(`Error fetching jobs: ${error.message}`); // Set error message
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    }, []);

    // Function to handle search term changes
    const handleSearch = useCallback((searchTerm: string) => {
        setSearchTerm(searchTerm); // Update search term
        setCurrentPage(1); // Reset to the first page
        fetchJobs(searchTerm, 0); // Fetch jobs with new search term
    }, [fetchJobs]);

    // Function to handle page changes
    const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        if (value >= 0) {
            setCurrentPage(value - 1); // Update current page
            fetchJobs(searchTerm, value - 1); // Fetch jobs for the new page
        }
    }, [fetchJobs, searchTerm]);

    // Provide context values to children components
    return (
        <JobsContext.Provider
            value={{
                jobList,
                loading,
                error,
                totalPages,
                currentPage,
                searchTerm,
                fetchJobs,
                handleSearch,
                handlePageChange,
            }}
        >
            {children} {/* Render children components */}
        </JobsContext.Provider>
    );
};

// Custom hook to use the Jobs context
export const useJobsContext = (): JobsContextProps => {
    const context = useContext(JobsContext);
    if (!context) {
        throw new Error('useJobsContext must be used within a JobsProvider');
    }
    return context;
};