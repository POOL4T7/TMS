import TeamCard from '../../../components/TeamCard';
import { Box, Grid } from '@mui/material';

const Team = () => {
  return (
    <Box p={10}>
      <Grid container spacing={2}>
      <Grid item xs={3}>
      <TeamCard />
      </Grid>
    </Grid>
    </Box>
  )
}

export default Team;