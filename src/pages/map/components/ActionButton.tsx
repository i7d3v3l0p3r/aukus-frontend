import { Box, Button } from "@mui/material";
import { useState } from "react";
import TurnModal from "./TurnModal";

type Props = {
  handleClick: () => void;
};

export default function ActionButton({}: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Box sx={{ position: "fixed", bottom: 100, left: 50, zIndex: 20 }}>
        <Button variant="contained" color="primary" size="large" onClick={handleClick}>
          Сделать ход
        </Button>
      </Box>
      <TurnModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={() => setModalOpen(false)} />
    </>
  );
}
