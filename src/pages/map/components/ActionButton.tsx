import { Box, Button } from "@mui/material";

type Props = {
  handleClick: () => void;
};

export default function ActionButton({ handleClick }: Props) {
  return (
    <Box position={"absolute"} top={100} left={100}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Action
      </Button>
    </Box>
  );
}
