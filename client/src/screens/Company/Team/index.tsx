import { Autorenew, FilterAlt } from "@mui/icons-material";
import { Alert, Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import TeamCard from "../../../components/cards/TeamCard";
import { useTeamListQuery } from "../../../redux/services/teams";
import Loader from "../../../components/Loader";
import { ErrorType } from "../../../models/custom";
import AddUpdateTeam from "../../../components/Team/AddUpdateTeam";

const Team = () => {
  console.log("Team page rendering");
  const { data, isLoading, isError, error, refetch } = useTeamListQuery();

  return (
    <Box p={5}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        useFlexGap
        sx={{ marginBottom: "25px" }}
      >
        <Typography variant="h4">Teams</Typography>
        <Box component={"div"}>
          <IconButton aria-label="filter alt">
            <FilterAlt />
          </IconButton>
          <IconButton aria-label="filter alt" onClick={refetch}>
            <Autorenew />
          </IconButton>
          <AddUpdateTeam />
        </Box>
      </Stack>
      {isLoading && <Loader size={100} thickness={1.5} />}
      {isError && (
        <Alert severity="error">{(error as ErrorType).message}</Alert>
      )}
      <Grid container spacing={1.5}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item._id}>
            <TeamCard
              name={item.name}
              totalMember={item.totalMembers}
              image={item.image}
              _id={item._id}
              status={item.status}
              slug={item.slug!}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
