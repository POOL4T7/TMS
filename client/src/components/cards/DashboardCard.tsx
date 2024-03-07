import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { toInternationalNumberSystem } from "../../utils/Helper";

interface PropType {
  title: string;
  total: number;
  icon: JSX.Element | string;
  color: string;
}

export default function DashboardCard({
  title,
  total,
  icon,
  color = "primary",
}: PropType) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        padding: "20px",
      }}
      color={color}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="h4">
          {toInternationalNumberSystem(total)}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}
