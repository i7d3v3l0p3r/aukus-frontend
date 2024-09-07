import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  Rating,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useRef, useState } from "react";

import DiceBox from "@3d-dice/dice-box";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (diceRoll: number) => void;
};

type DiceRoll = {
  value: number;
};

const DiceBoxContainerId = "dice-box";
const DiceBoxContainer = "#dice-box";

export default function TurnModal({ open, onClose, onConfirm }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [status, setStatus] = useState<"completed" | "drop" | null>(null);
  const [gameName, setGameName] = useState("");
  const [review, setReview] = useState("");
  const [diceRoll, setDiceRoll] = useState<Array<number> | null>(null);
  const [diceStatus, setDiceStatus] = useState<"idle" | "rolling" | "done" | "clear">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  const [gameHours, setGameHours] = useState<"short" | "medium" | "long" | null>(null);

  const isTurnComplete = diceRoll !== null && status !== null;

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue);
  };

  const handleStatusChange = (event: React.SyntheticEvent, newValue: "completed" | "drop" | null) => {
    setStatus(newValue);
  };

  const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleGameHoursChange = (event: React.SyntheticEvent, newValue: "short" | "medium" | "long" | null) => {
    setGameHours(newValue);
  };

  const diceRollSum = diceRoll ? diceRoll.reduce((acc, value) => acc + value, 0) : null;

  let dice: string | null = null;
  if (status === "drop") {
    dice = "1d6";
  }
  if (status === "completed" && gameHours) {
    switch (gameHours) {
      case "short":
        dice = "1d6";
        break;
      case "medium":
        dice = "2d6";
        break;
      case "long":
        dice = "3d6";
        break;
    }
  }

  const handleThrowDice = () => {
    if (diceStatus !== "idle") {
      return;
    }
    if (!dice) {
      return;
    }

    setDiceStatus("rolling");
    scrollToDialogBottom();
    const diceBox = new DiceBox({
      assetPath: "/assets/",
      container: DiceBoxContainer,
      scale: 15,
      width: 300,
      height: 200,
      themeColor: getRandomHexColor(),
      gravity: 0.5,
      restitution: 0.2,
      mass: 0.7,
      angularDamping: 0.2,
      linearDamping: 0.2,
    });
    if (diceBox) {
      if (containerRef.current) {
        // diceBox.canvas.marginLeft = "10px";
        diceBox.canvas.width = containerRef.current.clientWidth - 10;
        diceBox.canvas.height = containerRef.current.clientHeight - 10;
      }
      diceBox.init().then(() => {
        diceBox.roll(dice).then((result: Array<DiceRoll>) => {
          setDiceRoll(result.map((diceRoll) => diceRoll.value));
          setDiceStatus("done");
        });
      });
    }
  };

  const handleConfirmTurn = () => {
    setRating(null);
    setStatus(null);
    setGameName("");
    setReview("");
    setDiceRoll(null);
    setDiceStatus("idle");
    setGameHours(null);
    if (diceRollSum) {
      onConfirm(status === "completed" ? diceRollSum : -diceRollSum);
    }
  };

  const handleClose = () => {
    setDiceStatus("clear");
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => {}} fullWidth>
      <DialogTitle>
        Следующий ход
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box>
          Игра победитель аука
          <Input type="text" fullWidth value={gameName} onChange={handleGameNameChange} />
        </Box>
        <Box marginTop={3}>
          <ToggleButtonGroup
            exclusive
            value={status}
            onChange={handleStatusChange}
            color={status === "completed" ? "success" : "error"}
          >
            <ToggleButton value="completed">Прошел</ToggleButton>
            <ToggleButton value="drop">Дропнул</ToggleButton>
          </ToggleButtonGroup>

          {status === "completed" && (
            <ToggleButtonGroup exclusive value={gameHours} onChange={handleGameHoursChange} sx={{ marginLeft: 4 }}>
              <ToggleButton value="short">0-5 часов</ToggleButton>
              <ToggleButton value="medium">5-15 часов</ToggleButton>
              <ToggleButton value="long">15+ часов</ToggleButton>
            </ToggleButtonGroup>
          )}
        </Box>
        <Box marginTop={3} display="flex">
          Оценка: {rating || 0}
          <Rating precision={0.5} max={10} sx={{ marginLeft: 2 }} onChange={handleRatingChange} value={rating} />
        </Box>
        <Box marginTop={3}>
          Отзыв
          <TextField multiline fullWidth rows={3} value={review} onChange={handleReviewChange} />
        </Box>
        <Box marginTop={3}>
          {diceRoll && (
            <Box>
              Бросок кубика: {diceRollSum} {diceRoll.length > 1 ? `(${diceRoll.toString()})` : ""}
            </Box>
          )}
        </Box>
        {diceStatus !== "clear" && (
          <Box marginTop={1}>
            <div
              id={DiceBoxContainerId}
              className={diceStatus === "idle" ? "active" : ""}
              style={{
                display: "flex",
                justifyContent: "center",
                minHeight: "200px",
                border: "1px solid grey",
                borderRadius: 5,
                padding: "5px",
                cursor: diceStatus === "idle" ? "pointer" : "default",
              }}
              ref={containerRef}
              onClick={handleThrowDice}
            >
              {diceStatus === "idle" && dice && (
                <div>
                  Бросить кубик {dice}
                  <div style={{ color: "red" }}>ПЕРЕБРАСЫВАТЬ НЕЛЬЗЯ!</div>
                </div>
              )}
              {diceStatus === "idle" && !dice && <div>Заполни прохождение игры</div>}
            </div>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmTurn} disabled={!isTurnComplete}>
          Ходить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function scrollToDialogBottom() {
  // Find the dialog content container
  const dialogContent = document.querySelector(".MuiDialogContent-root");
  if (!dialogContent) {
    console.error("Dialog content not found.");
    return;
  }
  dialogContent.scrollTop = dialogContent.scrollHeight;
}

function getRandomHexColor(): string {
  // Helper function to convert a number to a two-digit hex string
  const toHex = (n: number): string => n.toString(16).padStart(2, "0");

  // Generate random numbers for red, green, and blue components
  const r = Math.floor(Math.random() * 256); // Red component (0-255)
  const g = Math.floor(Math.random() * 256); // Green component (0-255)
  const b = Math.floor(Math.random() * 256); // Blue component (0-255)

  // Return the hexadecimal color code as a string
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
