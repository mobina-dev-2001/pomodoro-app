import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState, useEffect } from "react";

export default function ToggleSettingsButton({ type = "font", value, onChange }) {
  const [localValue, setLocalValue] = useState(value);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const options =
    type === "font"
      ? [
          { value: "kumbhSans", className: "font-kumbh-sans! font-bold!", content: "Aa" },
          { value: "robotoSlab", className: "font-roboto-slab! font-normal!", content: "Aa" },
          { value: "spaceMono", className: "font-space-mono! font-bold!", content: "Aa" },
        ] : [
          { value: "froly", className: "bg-froly!", content: "" },
          { value: "malibu", className: "bg-malibu!", content: "" },
          { value: "heliotrope", className: "bg-heliotrope!", content: "" },
        ];

  const baseButtonClass =
    "w-[2.5rem]! aspect-square! m-[.32rem]! p-0! border-none! outline-white-lilac! rounded-full! text-[.938rem]! normal-case! transition-outline! duration-250! ease-in-out! hover:outline-1! hover:outline-offset-4!";
  const selectedClass =
    type === "font"
      ? "[&.Mui-selected]:bg-mirage! [&.Mui-selected]:text-white!"
      : "[&.Mui-selected]:after:content-['✓'] [&.Mui-selected]:font-bold!";
  const bgClass = type === "font" ? "bg-white-lilac!" : "";

  const handleChange = (e, newVal) => {
    if (newVal) {
      setIsChanging(true);
      setLocalValue(newVal);
      onChange(newVal);
    }
  };

  return (
    <ToggleButtonGroup className="flex gap-[.35rem]" value={value} exclusive onChange={handleChange} aria-label={`${type} variants`}>
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          className={`${baseButtonClass} ${bgClass} ${option.className} ${selectedClass} ${ localValue === option.value && isChanging ? "ring-2 ring-offset-2 ring-theme" : "" }`}
          value={option.value}
        >
          {option.content}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}