import { Box } from "@mui/material";
import { Page } from "utils/types";
import MainMenu from "./MainMenu";

type Props = {
  currentPage: Page;
  children?: React.ReactNode;
};

export default function MainScreen({ children, currentPage }: Props) {
  return (
    <Box>
      <MainMenu currentPage={currentPage} />
      {children}
    </Box>
  );
}
