import { Box } from "@mui/material";
import MainMenu from "./MainMenu";

export default function MainScreen({ children }: { children?: React.ReactNode }) {
  return (
    <Box>
      <MainMenu />
      {children}
    </Box>
  );
}
