import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <Box
        sx={{
          bgcolor: "#393E46",
          borderRadius: 1,
          boxShadow: 24,
          p: 3,
          width: "33%",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "primary.contrastText",
            "&:hover": {
              color: "primary.greyText",
            },
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

export default Modal;
