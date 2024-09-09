import { Box, Button } from "@mui/material";
import { useState } from "react";
import { DiceOption, NextTurnParams } from "utils/types";
import DiceModal from "./DiceModal";
import TurnModal from "./TurnModal";

type Props = {
  handleNextTurn: (params: NextTurnParams) => void;
};

export default function ActionButton({ handleNextTurn }: Props) {
  const [turnModalOpen, setTurnModalOpen] = useState(false);
  const [diceModalOpen, setDiceModalOpen] = useState(false);

  const [dice, setDice] = useState<DiceOption | null>(null);
  const [turnParams, setTurnParams] = useState<NextTurnParams | null>(null);

  const handleClick = () => {
    setTurnModalOpen(true);
  };

  const handleConfirm = (params: NextTurnParams, dice: DiceOption) => {
    setTurnParams(params);
    setDice(dice);
    setTurnModalOpen(false);
    setDiceModalOpen(true);
  };

  const handleTurnFinish = (roll: number) => {
    setDiceModalOpen(false);
    if (!turnParams) {
      return;
    }
    turnParams.diceRoll = roll;
    handleNextTurn(turnParams);
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
      <TurnModal open={turnModalOpen} onClose={() => setTurnModalOpen(false)} onConfirm={handleConfirm} />
      <DiceModal
        open={diceModalOpen}
        dice={dice}
        onClose={() => setDiceModalOpen(false)}
        onTurnFinish={handleTurnFinish}
      />
    </>
  );
}
