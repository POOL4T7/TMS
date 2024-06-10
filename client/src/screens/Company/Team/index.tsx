import { Autorenew, FilterAlt } from '@mui/icons-material';
import { Alert, Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import TeamCard from '../../../components/cards/TeamCard';
import { useTeamListQuery } from '../../../redux/services/teams';
import { ErrorType } from '../../../models/custom';
import AddUpdateTeam from '../../../components/Team/AddUpdateTeam';
import TeamCardShimmer from '../../../components/Shimmer/CardShimmer';

const ShimmerEffect = () => {
  return (
    <Grid container spacing={1.5}>
      {Array(8)
        .fill(0)
        .map((_, idx) => {
          return (
            <Grid
              key={`team-list-shimmer-${idx}`}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
            >
              <TeamCardShimmer />
            </Grid>
          );
        })}
    </Grid>
  );
};

const Team = () => {
  console.log('Team page rendering');
  const { data, isLoading, isError, error, refetch } = useTeamListQuery();

  return (
    <Box p={5}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        useFlexGap
        sx={{ marginBottom: '25px' }}
      >
        <Typography variant="h4">Teams</Typography>
        <Box component={'div'}>
          <IconButton aria-label="filter alt">
            <FilterAlt />
          </IconButton>
          <IconButton aria-label="filter alt" onClick={refetch}>
            <Autorenew />
          </IconButton>
          <AddUpdateTeam />
        </Box>
      </Stack>
      {isLoading && <ShimmerEffect />}
      {isError && (
        <Alert severity="error">{(error as ErrorType).message}</Alert>
      )}
      <Grid container spacing={1.5}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item._id}>
            {item ? (
              <TeamCard
                name={item.name}
                totalMember={item.totalMembers}
                image={item.image}
                _id={item._id}
                status={item.status}
                slug={item.slug!}
              />
            ) : (
              <TeamCardShimmer />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
