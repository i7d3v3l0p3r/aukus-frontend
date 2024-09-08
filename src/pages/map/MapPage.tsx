import { Box } from "@mui/material";
import MapComponent from "./components/MapComponent";

export default function MapPage() {
  return (
    <Box alignContent={"center"} display="flex" alignItems="center">
      <MapComponent />
    </Box>
  );
}
