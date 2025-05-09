import { useState } from "react";
import { styled, Button, Dialog, DialogTitle, DialogActions, DialogContent, Box } from "@mui/material";

import settingsIcon from "../assets/images/icon-settings.svg";
import closeIcon from "../assets/images/icon-close.svg";
import { useTheme } from "../contexts/ThemeContext";
import TimeInput from "./TimeInput";
import ToggleSettingsButton from "./ToggleSettingsButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": { transition: "all 0.2s ease-out" },
  "& .MuiDialogContent-root": { padding: theme.spacing(3.3, 5.1, 6.2), [theme.breakpoints.down('sm')]: { padding: theme.spacing(2.5, 3, 5.5) } },
  "& .MuiDialogActions-root": { padding: theme.spacing(0) },
}));

export default function Settings({ durations, setDurations }) {
  const { setFont, setColor } = useTheme();

  const [open, setOpen] = useState(false);
  const [tempDurations, setTempDurations] = useState(durations);
  const [tempFont, setTempFont] = useState( localStorage.getItem("selectedFont") || "kumbhSans" );
  const [tempColor, setTempColor] = useState( localStorage.getItem("selectedColor") || "froly" );

  const handleClickOpen = () => { setTempDurations(durations); setOpen(true) };
  const handleClose = () => {
    setTempFont(localStorage.getItem("selectedFont") || "kumbhSans");
    setTempColor(localStorage.getItem("selectedColor") || "froly");
    setOpen(false);
  };
  function handleSubmit() {
    try {
      setDurations(tempDurations);
      localStorage.setItem("durations", JSON.stringify(tempDurations));
      localStorage.setItem("selectedFont", tempFont);
      localStorage.setItem("selectedColor", tempColor);

      const fonts = { kumbhSans: "Kumbh Sans", robotoSlab: "Roboto Slab", spaceMono: "Space Mono" };
      const colors = { froly: "hsl(0, 91%, 71%)", malibu: "hsl(182, 91%, 71%)", heliotrope: "hsl(260, 91%, 71%)" };

      setFont(fonts[tempFont] || "Kumbh Sans");
      setColor(colors[tempColor] || "hsl(0, 91%, 71%)");

    } catch (error) {
      console.error("Failed to save settings:", error);
    }

    handleClose();
  }

  return (
    <>
      <Button
        disableRipple disableElevation
        className="transition-opacity! duration-250! ease-in-out! opacity-50 hover:opacity-100"
        sx={{ backgroundColor: "transparent",
          "&:hover": { backgroundColor: "transparent" },
          "&:focus": { backgroundColor: "transparent" },
        }}
        onClick={handleClickOpen}
        aria-label="settings"
      >
        <img src={settingsIcon} alt="" />
      </Button>

      <BootstrapDialog
        disableRestoreFocus
        slotProps={{ paper: { className: "max-w-[33.75rem]! min-h-[29rem]! rounded-[1.563rem]! max-sm:rounded-[.938rem]! overflow-visible!" } }}
        onClose={handleClose}
        open={open}
        aria-modal="true"
        aria-labelledby="settings"
      >
        <DialogTitle className="pt-[1.4rem]! max-sm:pt-[1rem]! pb-[1.6rem]! px-[2.5rem]! max-sm:px-[1.5rem]! text-[clamp(1.25rem,_4vw,_1.75rem)]! font-kumbh-sans! font-bold! text-left" id="settings">
          Settings
        </DialogTitle>

        <button className="absolute! top-10 right-8 cursor-pointer max-sm:top-8 max-sm:right-6" onClick={handleClose} aria-label="close">
          <img className="transition-opacity duration-250 ease-in-out opacity-50 hover:opacity-100" src={closeIcon} alt="" tabIndex={0} />
        </button>

        <DialogContent className="flex flex-col border-b-0! text-mirage" dividers >
          <Box
            component="form"
            autoComplete="off"
            onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
          >
            <Box component="section">
              <h3 className="max-sm:mb-[1rem] text-[clamp(.688rem,1vw,_.813rem)] font-kumbh-sans font-bold tracking-[5px] max-sm:tracking-[4.23px] uppercase text-left max-sm:text-center">Time (Minutes)</h3>
              <div className="flex gap-[1.313rem] max-sm:flex-col max-sm:gap-2">
                <TimeInput id="pomodoroTimeValue" label="pomodoro"
                  value={tempDurations.pomodoro / 60}
                  setValue={(val) => setTempDurations((prev) => ({ ...prev, pomodoro: val * 60 })) }
                />
                <TimeInput id="shortBreakTimeValue" label="short break"
                  value={tempDurations.shortBreak / 60}
                  setValue={(val) => setTempDurations((prev) => ({ ...prev, shortBreak: val * 60 })) }
                />
                <TimeInput id="longBreakTimeValue" label="long break"
                  value={tempDurations.longBreak / 60}
                  setValue={(val) => setTempDurations((prev) => ({ ...prev, longBreak: val * 60 })) }
                />
              </div>
            </Box>

            <hr className="my-[1.4rem] border-mirage/10" />

            <Box className="flex justify-between items-center max-sm:flex-col" component="section">
              <h4 className="max-sm:mb-[.65rem] text-[clamp(.688rem,1vw,_.813rem)] font-kumbh-sans font-bold tracking-[5px] max-sm:tracking-[4.23px] uppercase text-left max-sm:text-center">Font</h4>
              <ToggleSettingsButton type="font" value={tempFont} onChange={setTempFont} />
            </Box>

            <hr className="my-[1.4rem] border-mirage/10" />

            <Box className="flex justify-between items-center max-sm:flex-col" component="section">
              <h4 className="max-sm:mb-[.65rem] text-[clamp(.688rem,1vw,_.813rem)] font-kumbh-sans font-bold tracking-[5px] max-sm:tracking-[4.23px] uppercase text-left max-sm:text-center">Color</h4>
              <ToggleSettingsButton type="color" value={tempColor} onChange={setTempColor} />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions className="absolute left-[50%] bottom-[-6%] translate-x-[-50%]">
          <Button
            className="relative w-[8.75rem] h-[3.313rem] bg-froly! rounded-[1.656rem]! text-white! font-kumbh-sans! font-bold! normal-case! before:absolute before:-z-1 before:size-full before:bg-white before:rounded-[1.656rem] hover:bg-froly/80!"
            autoFocus
            type="submit"
            onClick={handleSubmit}
          >
            Apply
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
