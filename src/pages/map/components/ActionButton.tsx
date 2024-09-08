import { Box, Button } from "@mui/material";
import { useState } from "react";
import { NextTurnParams } from "utils/types";
import TurnModal from "./TurnModal";

type Props = {
  handleNextTurn: (params: NextTurnParams) => void;
};

export default function ActionButton({ handleNextTurn }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleConfirm = (params: NextTurnParams) => {
    setModalOpen(false);
    handleNextTurn(params);
  };

  return (
    <>
      <Box display={"flex"} justifyContent="center">
        <Box sx={{ position: "fixed", bottom: 100, zIndex: 20, width: "320px" }}>
          <Button variant="contained" color="primary" size="large" onClick={handleClick} fullWidth>
            Сделать ход
          </Button>
        </Box>
      </Box>
      <TurnModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirm} />
    </>
  );
}
