import { Container, Grid, Typography } from "@mui/material";
import DashboardCard from "../../../components/cards/DashboardCard";

const DashBoard = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={
              <img
                alt="icon"
                src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png"
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={
              <img
                alt="icon"
                src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png"
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={
              <img
                alt="icon"
                src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png"
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={
              <img
                alt="icon"
                src="https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
