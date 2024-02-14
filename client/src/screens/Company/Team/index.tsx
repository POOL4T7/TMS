import { FilterAlt } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import TeamCard from "../../../components/TeamCard";
import { useTeamListQuery } from "../../../redux/services/teams";
import Loader from "../../../components/Loader";

const Team = () => {
  console.log("Team page rendering")
  const { data, isLoading } = useTeamListQuery();
  return (
    <Box p={5}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        useFlexGap
        sx={{ marginBottom: "25px" }}
      >
        <Typography variant="h4">Teams</Typography>
        <IconButton aria-label="filter alt">
          <FilterAlt />
        </IconButton>
      </Stack>
      {isLoading && <Loader size={100} thickness={1.5} />}
      <Grid container spacing={1.5} >
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3}  xl={2} key={item._id}>
            <TeamCard
              name={item.name}
              totalMember={item.totalMembers}
              image={item.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
