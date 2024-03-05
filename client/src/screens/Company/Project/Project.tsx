import { useProjectListQuery } from "../../../redux/services/project";
// import { useFilteredUserListQuery } from "../../../redux/services/user";

const Project = () => {
  const { data, isLoading, error } = useProjectListQuery({
    page: 1,
    rowsPerPage: 10,
    orderBy: "name",
    order: "asc",
  });
  console.log("{ data, isLoading, error }", { data, isLoading, error });
  return <div>Global Project</div>;
};

export default Project;
