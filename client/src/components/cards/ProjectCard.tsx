import { Group } from "@mui/icons-material";
import {
  Button,
  CardActionArea,
  CardActions,
  Chip,
  Tooltip,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface User {
  firstName: string;
  lastName: string;
  _id: string;
}

interface propTypes {
  image: string;
  name: string;
  teamSize: number;
  manager: User | null;
  status: string;
}

const ProjectCard = ({ image, name, teamSize, manager, status }: propTypes) => {
  // console.log("teamLead", teamLead);
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="210" image={image} alt={name} />
        <CardContent sx={{ padding: "6px" }}>
          <Typography gutterBottom variant="h6" component="div">
            {name.substring(0, 20)}
          </Typography>
          {manager ? (
            <Typography gutterBottom component="div">
              Manager- {`${manager?.firstName} ${manager?.lastName}`}
            </Typography>
          ) : (
            <Typography color={"red"}>Not Assigned</Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title="Apart from manager and team Lead">
          <Button size="small" color="primary" startIcon={<Group />}>
            {teamSize}
          </Button>
        </Tooltip>
        <Chip
          sx={{ height: "25px" }}
          label={status}
          color={status === "publish" ? "success" : "info"}
          variant="outlined"
        />
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
