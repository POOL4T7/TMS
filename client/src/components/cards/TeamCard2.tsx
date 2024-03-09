import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Group } from "@mui/icons-material";

interface propTypes {
  image: string;
  name: string;
  totalMember: number;
}

export default function TeamCard({ image, name, totalMember }: propTypes) {
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
      </CardActions>
    </Card>
  );
}
