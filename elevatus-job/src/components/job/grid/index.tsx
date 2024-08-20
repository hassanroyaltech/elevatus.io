import { memo, useEffect } from 'react';
import FilterComponent from '../../filter';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import JobCard from '../jobcard';
import { useJobsContext } from '../../../job.context';
import LoaderSkeleton from '../../loadingSkeleton';

const JobsGridView = () => {
  // Extracting context values and functions
  const {
    jobList,
    loading,
    error,
    totalPages,
    currentPage,
    handleSearch,
    handlePageChange,
    fetchJobs,
    searchTerm,
  } = useJobsContext();

  // Fetch jobs whenever search term or current page changes
  useEffect(() => {
    fetchJobs(searchTerm, currentPage);
  }, [fetchJobs, searchTerm, currentPage]);

  // Function to render the list of job cards
  const renderJobList = () => (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container gap={2} rowGap={5} sx={{ maxWidth: "100%", mx: 'auto' }}>
        {jobList.map((job) => (
          <JobCard key={job.uuid} job={job} showBtn={true} isShadow={true} />
        ))}
      </Grid>
    </Box>
  );

  // Function to render pagination controls
  const renderPagination = () => (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={totalPages}
        page={currentPage + 1} // Pagination is 1-based, hence `currentPage + 1`
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );

  return (
    <>
      {/* Filter component for searching jobs */}
      <FilterComponent onSearch={handleSearch} />
      
      {/* Page title */}
      <Typography
        variant="h3"
        mb={4}
        component="h3"
        fontWeight="bold"
        fontSize={28}
        mt={2}
      >
        Recent Openings
      </Typography>

      {/* Conditional rendering based on loading and error states */}
      {loading && <LoaderSkeleton />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <>
          {renderJobList()} {/* Render job cards */}
          {renderPagination()} {/* Render pagination controls */}
        </>
      )}
    </>
  );
};

export default memo(JobsGridView);
