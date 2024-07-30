import { Container, Grid, Tooltip, Typography } from '@mui/material';
import DashboardCard from '@/components/cards/DashboardCard';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts';
// import { useTeamListQuery } from "@/../redux/services/teams";
import { useDashboardCountQuery } from '@/redux/services/company';
import { Info } from '@mui/icons-material';

const DashBoard = () => {
  const { data } = useDashboardCountQuery();
  console.log('data', data);
  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' sx={{ mt: 5, mb: 3 }}>
        Hi, Welcome back 👋
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard
            title='Project'
            total={data?.counts.totalProject || 0}
            color='success'
            icon={
              <img
                alt='icon'
                src='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png'
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard
            title='Users'
            total={data?.counts?.totalEmployee || 0}
            color='success'
            icon={
              <img
                alt='icon'
                src='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png'
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard
            title='Position'
            total={data?.counts.totalPosition || 0}
            color='success'
            icon={
              <img
                alt='icon'
                src='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png'
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DashboardCard
            title='Teams'
            total={data?.counts.totalTeam || 0}
            color='success'
            icon={
              <img
                alt='icon'
                src='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png'
              />
            }
          />
        </Grid>
      </Grid>
      <Grid container marginTop={'10px'}>
        <Grid item xs={12} md={6}>
          <Typography variant='h6'>
            Team Graph
            <Tooltip title='Team stats where users are available'>
              <Info />
            </Tooltip>
          </Typography>
          <PieChart
            series={[
              {
                data: data?.teamStats || [],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  // color: "gray",
                },
                arcLabel: (item) => `${item.label} (${item.value})`,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 270,
                cx: 150,
                cy: 130,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
                fontSize: '10px',
              },
              maxWidth: '500px',
              maxHeight: '280px',
            }}
            width={500}
            height={260}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashBoard;
