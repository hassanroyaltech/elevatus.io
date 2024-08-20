import React, { useCallback, useEffect, useState, memo } from 'react';
import { useJobsContext } from '../../../job.context';
import { Box, Card, CardContent, CardHeader, List, ListItem, Stack, Typography } from '@mui/material';
import JobCard from '../jobcard';
import { getJobDetails } from '../../../services/jobs';
import { JobDetails as JobDetailsT } from '../../../types/job.types';
import LoaderSkeleton from '../../loadingSkeleton';
import moment from 'moment';

type JobDetailsProps = {
    id: string; // ID of the job to fetch details for
};

const JobDetails: React.FC<JobDetailsProps> = React.memo(({ id }) => {
    // Context values
    const { jobList, loading: globalLoading, error: globalError, currentPage, fetchJobs, searchTerm } = useJobsContext();
    
    // Local state for handling loading and error states specific to job details
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setError] = useState<string | null>(null);
    const [uri, setUri] = useState(id); // State to store current job ID
    const [Details, setJobDetails] = useState<JobDetailsT | null>(null); // State to store job details
    const storedLanguage = localStorage.getItem('language'); // Get stored language from localStorage

    // Fetch job details when the component mounts or job ID changes
    const fetchJobDetails = useCallback(() => {
        setLocalLoading(true);
        setError(null);
        setUri(id); // Update URI with the new ID
        getJobDetails(id, 'ee5d991c-cdc64e83-b0b396f147208549', "other", "other", storedLanguage ?? JSON.stringify(storedLanguage))
            .then((response) => {
                console.log(response);
                const result = response.results as JobDetailsT;
                setJobDetails(result); // Set job details in state
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to fetch job details. Please try again later.'); // Set error message
            })
            .finally(() => {
                setLocalLoading(false);
            });
    }, [id]);

    // Fetch jobs if jobList is empty
    useEffect(() => {
        if (jobList.length === 0) {
            fetchJobs(searchTerm, currentPage);
        }
    }, [fetchJobs]);

    // Fetch job details whenever the job ID changes
    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' } }} component={"section"} pt={8} gap={2}>
            {/* Sidebar with job list */}
            <Box sx={{
                width: {
                    xs: '100%',
                    sm: '100%',
                    md: '330px',
                },
                maxHeight: "70vh",
                overflowY: "auto",
                overflowX: "hidden",
                position: "sticky",
                top: 100,
                padding: "0 16px",
                borderRadius: "10px",
                display: "grid",
                gap: 3,
                alignSelf: "start",
            }}>
                {(globalLoading) && <LoaderSkeleton />}
                {(globalError) && <Typography color="error">{globalError}</Typography>}
                {!(globalLoading) && !(globalError) && jobList.map((job) => (
                    <JobCard key={job.uuid} job={job} uri={uri} />
                ))}
            </Box>

            {/* Job details section */}
            <Box sx={{ width: "100%" }}>
                {(localLoading) && <LoaderSkeleton />}
                {(localError) && <Typography color="error">{localError}</Typography>}
                {!(localLoading) && !(localError) && Details !== null &&
                    <Card sx={{ p: "24px", boxShadow: "0 1px 4px 1px #00000026!important", borderRadius: ".65rem" }}>
                        <CardHeader sx={{ px: 0, pt: 0 }} title={<> 
                            <Typography variant='h4' component={"h4"} fontWeight={"bold"} fontSize={"1.5rem"}>
                                {Details?.title} {/* Job title */}
                            </Typography>
                            <Typography>Posted On: {moment(Details.posted_at).format('dddd, MMMM Do, YYYY')}</Typography>
                        </>} />
                        <CardContent sx={{ px: 0 }}>
                            <Stack>
                                <Typography variant='h5' component={"h5"} fontSize={"20px"}>
                                    {storedLanguage == 'en' ? 'Description' : 'الوصف'} {/* Section header */}
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: Details.description }} /> {/* Job description */}
                            </Stack>
                            <Stack>
                                <Typography variant='h5' component={"h5"} fontSize={"20px"}>
                                    {storedLanguage == 'en' ? 'Requirements' : 'المتطلبات'} {/* Section header */}
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: Details.requirements }} /> {/* Job requirements */}
                            </Stack>
                            <Stack>
                                <Typography variant='h5' component={"h5"} fontSize={"20px"}>
                                    {storedLanguage == 'en' ? 'Summary' : 'الملخص'} {/* Section header */}
                                </Typography>
                                <Card sx={{ display: 'flex', py: 1, mt: 1, flexDirection: { sm: "column", xl: "row" } }}>
                                    <List sx={{ flexGrow: 1 }}>
                                        {/* List of job details */}
                                        <ListItem sx={{ display: "flex", py: .5, justifyContent: "space-between" }}>
                                            <Typography fontSize={"13px"} fontWeight={"bold"}>
                                                {storedLanguage == 'en' ? 'Salary range:' : 'نطاق الراتب'}
                                            </Typography>
                                            <Typography>
                                                {Details.salary.min} - {Details.salary.max}
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ display: "flex", py: .5, justifyContent: "space-between" }}>
                                            <Typography fontSize={"13px"} fontWeight={"bold"}>
                                                {storedLanguage == 'en' ? 'Industry:' : 'المجال'}
                                            </Typography>
                                            <Typography>
                                                {Details.industry}
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ display: "flex", py: .5, justifyContent: "space-between" }}>
                                            <Typography fontSize={"13px"} fontWeight={"bold"}>
                                                {storedLanguage == 'en' ? 'Experience Required:' : 'الخبرة المطلوبة:'}
                                            </Typography>
                                            <Typography>
                                                {Details.years_of_experience}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                    <List sx={{ flexGrow: 1, borderLeft: ".0625rem solid #e9ecef!important" }}>
                                        {/* List of job details continued */}
                                        <ListItem sx={{ display: "flex", py: .5, justifyContent: "space-between" }}>
                                            <Typography fontSize={"13px"} fontWeight={"bold"}>
                                                {storedLanguage == 'en' ? 'Major:' : 'التخصص'}
                                            </Typography>
                                            <Typography textTransform={"capitalize"}>
                                                {Details.major}
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ display: "flex", py: .5, justifyContent: "space-between" }}>
                                            <Typography fontSize={"13px"} fontWeight={"bold"}>
                                                {storedLanguage == 'en' ? 'Career Level:' : 'مستوى المهنة'}
                                            </Typography>
                                            <Typography textTransform={"capitalize"}>
                                                {Details.career_level}
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{ display: "flex", py: .5, justifyContent: "space-between" }}>
                                            <Typography fontSize={"13px"} fontWeight={"bold"}>
                                                {storedLanguage == 'en' ? 'Minimum GPA:' : 'الدرجة الدنيا'}
                                            </Typography>
                                            <Typography textTransform={"capitalize"}>
                                                {Details.gpa}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Card>
                            </Stack>
                            <Stack my={2} borderBottom={1} pb={3} borderColor={"#e9ecef"}>
                                <Typography variant='h5' component={"h5"} fontSize={"20px"}>
                                    {storedLanguage == 'en' ? 'Required Skills' : 'المهارات المطلوبة'} {/* Section header */}
                                </Typography>
                                <Box display={"flex"} flexWrap={"wrap"} gap={1}>
                                    {/* Display job skills */}
                                    {Details.skills.map((item: any, index: number) => (
                                        <Typography key={index} textTransform={"capitalize"} variant="body2" component="span" sx={{ bgcolor: "rgb(240, 242, 245)", borderRadius: "1rem!important", m: ".5rem", p: "5.5px 12px" }}>
                                            {item}
                                        </Typography>
                                    ))}
                                </Box>
                            </Stack>
                            <Stack my={2} borderBottom={1} pb={3} borderColor={"#e9ecef"}>
                                <Typography variant='h5' component={"h5"} fontSize={"20px"}>
                                    {storedLanguage == 'en' ? 'Languages' : 'اللغات'} {/* Section header */}
                                </Typography>
                                <Box display={"flex"} flexWrap={"wrap"} gap={.3}>
                                    {/* Display required languages */}
                                    {Details.languages.map((item: any, index: number) => {
                                        const languageCode = Object.keys(item)[0];
                                        const languageValue = item[languageCode];
                                        return (
                                            <Typography
                                                key={index}
                                                textTransform={"capitalize"}
                                                variant="body2"
                                                component="span"
                                                sx={{
                                                    bgcolor: "rgb(240, 242, 245)",
                                                    borderRadius: "1rem!important",
                                                    m: ".5rem",
                                                    p: "5.5px 12px",
                                                }}
                                            >
                                                {languageCode.toUpperCase()}:{languageValue}
                                            </Typography>
                                        );
                                    })}
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                }
            </Box>
        </Box>
    );
});

export default memo(JobDetails);
