import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';

const TeamCardShimmer = () => {
  return (
    <Card>
      <CardActionArea>
        <Skeleton
          sx={{ height: 210, width: '100%' }}
          animation="wave"
          variant="rectangular"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <Skeleton animation="pulse" />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Skeleton
          sx={{ height: 20, width: '100%' }}
          animation="pulse"
          variant="rectangular"
        />
      </CardActions>
    </Card>
  );
};

export default TeamCardShimmer;
