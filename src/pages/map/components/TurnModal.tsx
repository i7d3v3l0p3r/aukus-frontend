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
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function TurnModal({ open, onClose, onConfirm }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [status, setStatus] = useState<"completed" | "drop" | null>(null);

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue);
  };

  const handleStatusChange = (event: React.SyntheticEvent, newValue: "completed" | "drop" | null) => {
    setStatus(newValue);
  };

  return (
    <Dialog open={open} onClose={() => {}} fullWidth>
      <DialogTitle>
        Следующий ход
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          <Input type="text" fullWidth />
        </Box>
        <Box marginTop={3}>
          <ToggleButtonGroup
            exclusive
            value={status}
            onChange={handleStatusChange}
            color={status === "completed" ? "success" : "error"}
          >
            <ToggleButton value="completed" sx={{ marginRight: 2 }}>
              Прошел
            </ToggleButton>
            <ToggleButton value="drop">Дропнул</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box marginTop={3} display="flex">
          Оценка: {rating || 0}
          <Rating precision={0.5} max={10} sx={{ marginLeft: 2 }} onChange={handleRatingChange} />
        </Box>
        <Box marginTop={3}>
          Отзыв
          <TextField multiline fullWidth rows={3} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>Ходить</Button>
      </DialogActions>
    </Dialog>
  );
}
