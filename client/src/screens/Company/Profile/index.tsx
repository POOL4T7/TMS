
import { useCompanyProfileQuery } from "../../../redux/services/company";

const Profile = () => {
  const { data, isLoading, isFetching, isError, isSuccess } =
    useCompanyProfileQuery();
    
  return <div>{!isLoading && <p>Profile loaded successfully</p>}</div>;
};

export default Profile;
