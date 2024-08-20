import Layout from '../../components/layout';
import { useParams } from 'react-router-dom';
import JobsGridView from '../../components/job/grid';
import JobDetails from '../../components/job/details';
function JobsListingPage() {
    const { id } = useParams(); // Get the id from the URL
    return (
        <Layout>
            {id ? <JobDetails  id={id}/>: <JobsGridView/>}
        </Layout>
    );
}
export default JobsListingPage;
