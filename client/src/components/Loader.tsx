import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface PropType {
  size?: number;
  thickness?: number;
  margin?: string;
}

export default function Loader({
  size = 25,
  thickness = 4,
  margin = "auto",
}: PropType) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignContent: "center",
        marginTop:margin
      }}
    >
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  );
}
