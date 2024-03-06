import { Group } from "@mui/icons-material";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface User {
  name: string;
  _id: string;
}

interface propTypes {
  image: string;
  name: string;
  teamSize: number;
  manager: User;
  teamLead: User[];
}

const ProjectCard = ({
  image,
  name,
  teamSize,
  manager,
  teamLead,
}: propTypes) => {
  console.log("teamLead", teamLead);
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
          {teamSize}
        </Button>
        <Button size="small" color="primary" startIcon={<Group />}>
          Manager: {manager.name || "-"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
