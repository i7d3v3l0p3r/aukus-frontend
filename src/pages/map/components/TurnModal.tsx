import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { DiceOption, MoveType, NextTurnParams } from "utils/types";
import NumRating from "./NumRating";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (params: NextTurnParams, dice: DiceOption) => void;
};

export default function TurnModal({ open, onClose, onConfirm }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [ratingHover, setRatingHover] = useState<number | null>(null);
  const [gameName, setGameName] = useState("");
  const [review, setReview] = useState("");
  const [gameHours, setGameHours] = useState<"short" | "medium" | "long" | null>(null);
  const [moveType, setMoveType] = useState<MoveType | null>(null);

  useEffect(() => {
    if (!open) {
      setRating(null);
      setRatingHover(null);
      setGameName("");
      setReview("");
      setGameHours(null);
      setMoveType(null);
    }
  }, [open]);

  const gameCompleted = gameName !== "" && moveType === "completed" && gameHours !== null;
  const gameDropped = gameName !== "" && moveType === "drop";
  const gameFieldsCompleted = gameCompleted || gameDropped;
  const reviewCompleted = review !== "" && rating !== null;

  const canThrowDice = gameFieldsCompleted && reviewCompleted;
  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue);
  };

  const handleRatingChangeWhileHovering = (event: React.SyntheticEvent, newValue: number | null) => {
    setRatingHover(newValue);
  };

  const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleGameHoursChange = (newValue: "short" | "medium" | "long" | null) => {
    setGameHours(newValue);
  };

  const handleMoveTypeChange = (event: SelectChangeEvent) => {
    setMoveType(event.target.value as MoveType);
  };

  let dice: DiceOption | null = null;
  if (moveType === "drop") {
    dice = "1d6";
  }
  if (moveType === "completed" && gameHours) {
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

  const handleConfirmTurn = () => {
    if (rating && moveType && dice) {
      onConfirm(
        {
          type: moveType,
          itemLength: gameHours,
          itemRating: rating,
          itemReview: review,
          itemTitle: gameName,
          snakeFrom: null,
          snakeTo: null,
          stairFrom: null,
          stairTo: null,
          diceRoll: 0,
        },
        dice,
      );
    }
  };

  const handleClose = () => {
    onClose();
  };

  let displayRating = rating || 0;
  if (ratingHover && ratingHover !== -1) {
    displayRating = ratingHover;
  }

  return (
    <Dialog open={open} onClose={() => {}} fullWidth keepMounted>
      <DialogTitle>
        Новый ход
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
      <DialogContent>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="move-label-id" style={{ color: "white" }}>
            Выбери действие
          </InputLabel>
          <Select onChange={handleMoveTypeChange} value={moveType ? moveType : ""} labelId={"move-label-id"}>
            <MenuItem value="completed">Прошел игру</MenuItem>
            <MenuItem value="drop">Дропнул игру</MenuItem>
            <MenuItem value="reroll">Реролл</MenuItem>
            <MenuItem value="sheikh">Шейх-момент</MenuItem>
            <MenuItem value="movie">Посмотрел фильм</MenuItem>
          </Select>
        </FormControl>

        <Box marginTop={2}>
          {moveType === "movie" ? "Название фильма" : "Название игры"}
          <Input type="text" fullWidth value={gameName} onChange={handleGameNameChange} />
        </Box>
        <Box marginTop={3}>
          {moveType === "completed" && (
            <Box>
              <Button
                onClick={() => handleGameHoursChange("short")}
                variant="contained"
                color={gameHours === "short" ? "secondary" : "info"}
                style={{ width: 150 }}
              >
                0-5 часов
              </Button>
              <Button
                onClick={() => handleGameHoursChange("medium")}
                variant="contained"
                color={gameHours === "medium" ? "secondary" : "info"}
                style={{ marginLeft: 20, width: 150 }}
              >
                5-15 часов
              </Button>
              <Button
                onClick={() => handleGameHoursChange("long")}
                variant="contained"
                color={gameHours === "long" ? "secondary" : "info"}
                style={{ marginLeft: 20, width: 150 }}
              >
                15+ часов
              </Button>
            </Box>
          )}
        </Box>
        <Box marginTop={3} display="flex">
          <span style={{ width: "100px" }}>Оценка: {displayRating}</span>
          <NumRating
            precision={0.1}
            max={10}
            sx={{ marginLeft: 2 }}
            onChange={handleRatingChange}
            onChangeActive={handleRatingChangeWhileHovering}
            value={rating}
          />
        </Box>
        <Box marginTop={3}>
          Отзыв
          <TextField sx={{ marginTop: 1 }} multiline fullWidth rows={3} value={review} onChange={handleReviewChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button fullWidth onClick={handleConfirmTurn} disabled={!canThrowDice} color="secondary" variant="contained">
          Перейти к броску
        </Button>
      </DialogActions>
    </Dialog>
  );
}
