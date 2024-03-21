import { Add, Autorenew, FilterAlt } from "@mui/icons-material";
import { Alert, Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useProjectListQuery } from "../../../redux/services/project";
import Loader from "../../../components/Loader";
import { ErrorType } from "../../../models/custom";
import ProjectCard from "../../../components/cards/ProjectCard";
import { Link, useNavigate } from "react-router-dom";

const Project = () => {
  const { data, isLoading, error, isError, refetch } = useProjectListQuery({
    page: 1,
    rowsPerPage: 10,
    orderBy: "name",
    order: "asc",
  });
  const navigate = useNavigate();
  return (
    <Box p={5}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        useFlexGap
        sx={{ marginBottom: "25px" }}
      >
        <Typography variant="h4">Project</Typography>
        <Box>
          <IconButton aria-label="filter alt">
            <FilterAlt />
          </IconButton>
          <IconButton aria-label="autorenew alt" onClick={refetch}>
            <Autorenew />
          </IconButton>
          <IconButton
            aria-label="add alt"
            onClick={() => navigate("/create-project")}
          >
            <Add />
          </IconButton>
        </Box>
      </Stack>
      {isLoading && <Loader size={100} thickness={1.5} />}
      {isError && (
        <Alert severity="error">{(error as ErrorType).message}</Alert>
      )}
      <Grid container spacing={1.5}>
        {data?.projectList?.map((item) => (
          <Grid
            component={"div"}
            draggable
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            key={item._id}
          >
            <Link to={`/project/${item.slug}`}>
              <ProjectCard
                name={item.name}
                teamSize={item.teamSize}
                image={item.image}
                manager={item?.manager}
                // teamLead={item.teamLead}
                status={item.status}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Project;
