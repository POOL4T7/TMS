import { Box, FormControl, Skeleton, Typography } from '@mui/material';

const TaskFormShimmer = ({ _id }: { _id: string }) => {
  return (
    <Box margin={'10px'} sx={{ maxWidth: '100vw', width: '100%' }}>
      <Typography component={'span'} variant="h5">
        #{_id}
      </Typography>

      <FormControl></FormControl>
      <Skeleton
        sx={{ height: 50, width: '100%' }}
        animation="pulse"
        variant="rectangular"
      />
    </Box>
  );
};

export default TaskFormShimmer;
