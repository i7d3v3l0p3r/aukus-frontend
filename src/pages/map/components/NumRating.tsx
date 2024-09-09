import { Circle } from "@mui/icons-material";
import { IconContainerProps, Rating } from "@mui/material";

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  const round = Math.round(value);

  const isExact = value % 1 === 0;

  const active = other.className?.includes("MuiRating-iconFilled");

  const green = "#2fb350";
  const red = "#ff3b30";
  const yellow = "#ff8200";

  const color = round <= 4 ? red : round <= 7 ? yellow : green;
  const style = { fontSize: 24, ...(active ? { color } : {}) };

  return (
    <span {...other}>
      <Circle style={style} />
      {isExact && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 15,
            color: "white",
          }}
        >
          {round}
        </span>
      )}
    </span>
  );
}

export default function NumRating(props: React.ComponentProps<typeof Rating>) {
  return <Rating {...props} icon={<Circle color="primary" />} IconContainerComponent={IconContainer} />;
}
