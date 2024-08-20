import axios from "axios";

// Function to fetch a list of jobs from the API
export const getJobList = async (
    languageProfileUuid?: string, // Optional UUID for the language profile
    itemQuery?: string, // Optional search query for filtering jobs
    limit?: number, // Optional limit on the number of jobs to return
    page?: number, // Optional page number for pagination
    language?: string // Optional language code for localization
) => {
    try {
        // Prepare query parameters, omitting any that are undefined
        const params: { [key: string]: string | number | undefined } = {
            language_profile_uuid: languageProfileUuid,
            itemQuery,
            limit,
            page,
            language
        };

        // Convert the parameters to a query string
        const queryString = Object.keys(params)
            .filter(key => params[key] !== undefined) // Only include parameters with defined values
            .map(key => `${key}=${params[key]}`) // Create key=value pairs
            .join('&'); // Join pairs with '&' to form the query string

        // Construct the URL for the API request
        const url = `https://devapi.elevatustesting.xyz/api/v1/jobs?${queryString}`;

        // Perform the GET request to fetch job data
        const result = await axios.get(url, {
            headers: {
                "accept-account": "328ef9bd-59bf-4828-8234-ab81134d39ea", // Account identifier for API
                "accept-company": "d586e75b-19c5-4bd3-b37a-4935d19dfe9a", // Company identifier for API
                'Accept-Language': language, // Language preference for the response
            },
        });

        // Return the data from the response
        return result.data;
    } catch (error) {
        // Log and rethrow any errors encountered
        console.error(error);
        throw error;
    }
};

// Function to fetch details of a specific job from the API
export const getJobDetails = async (
    uri?: string, // Optional URI of the job to fetch details for
    languageProfileUuid?: string, // Optional UUID for the language profile
    utm_source?: string, // Optional UTM source parameter for tracking
    utm_medium?: string, // Optional UTM medium parameter for tracking
    language?: string // Optional language code for localization
) => {
    try {
        // Prepare query parameters, omitting any that are undefined
        const params: { [key: string]: string | number | undefined } = {
            uri,
            language_profile_uuid: languageProfileUuid,
            utm_source,
            utm_medium
        };

        // Convert the parameters to a query string
        const queryString = Object.keys(params)
            .filter(key => params[key] !== undefined) // Only include parameters with defined values
            .map(key => `${key}=${params[key]}`) // Create key=value pairs
            .join('&'); // Join pairs with '&' to form the query string

        // Construct the URL for the API request
        const url = `https://devapi.elevatustesting.xyz/api/v1/jobs/uri?${queryString}`;

        // Perform the GET request to fetch job details
        const result = await axios.get(url, {
            headers: {
                "accept-account": "328ef9bd-59bf-4828-8234-ab81134d39ea", // Account identifier for API
                "accept-company": "d586e75b-19c5-4bd3-b37a-4935d19dfe9a", // Company identifier for API
                "accept-language": language // Language preference for the response
            },
        });

        // Return the data from the response
        return result.data;
    } catch (error) {
        // Log and rethrow any errors encountered
        console.error(error);
        throw error;
    }
};
