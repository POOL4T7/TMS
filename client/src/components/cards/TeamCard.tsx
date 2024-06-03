import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Group, RemoveRedEye } from '@mui/icons-material';
import AddUpdateTeam from '../Team/AddUpdateTeam';
import { getColor } from '../../utils/Helper';

interface propTypes {
  image: string;
  name: string;
  totalMember: number;
  status: string;
  _id: string;
  slug: string;
}

export default function TeamCard({
  image,
  name,
  totalMember,
  status,
  _id,
  slug,
}: propTypes) {
  console.log('propTypes', { image, name, totalMember, status, _id, slug });
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="210" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" startIcon={<Group />}>
          {totalMember}
        </Button>
        <AddUpdateTeam
          teamId={_id}
          teamName={name}
          teamImage={image}
          teamStatus={status}
          Icon={RemoveRedEye}
          teamSlug={slug}
        />
        <Button size="small" color={getColor(status)}>
          {status}
        </Button>
      </CardActions>
    </Card>
  );
}
