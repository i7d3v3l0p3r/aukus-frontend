import { Box } from "@mui/material";
import MapComponent from "./components/MapComponent";

export default function MapPage() {
  return (
    <Box>
      <Box textAlign={"center"}>
        <h1>Карта</h1>
      </Box>
      <Box alignContent={"center"} display="flex" alignItems="center">
        <MapComponent />
      </Box>
    </Box>
  );
}
