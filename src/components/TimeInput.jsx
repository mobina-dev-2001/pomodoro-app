import { useState, useEffect, useCallback } from "react";
import { InputLabel, Input } from "@mui/material";
import arrowDownward from "../assets/images/icon-arrow-down.svg";
import arrowUpward from "../assets/images/icon-arrow-up.svg";

export default function TimeInput({ id, label, value, setValue }) {
  const [localValue, setLocalValue] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const validateAndUpdate = useCallback(
    (newValue) => {
      const numValue = Number(newValue);
      const isValidValue = !isNaN(numValue) && numValue >= 1 && numValue <= 60;
      setIsValid(isValidValue);
      if (isValidValue) {
        setValue(numValue);
      }
    }, [setValue]
  );

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      if (newValue === "" || (!isNaN(newValue) && Number(newValue) >= 1 && Number(newValue) <= 60)) {
        validateAndUpdate(newValue);
      }
    }, [validateAndUpdate]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (localValue === "" || isNaN(localValue)) {
      setLocalValue(value);
      setIsValid(true);
    } else {
      validateAndUpdate(localValue);
    }
  }, [localValue, value, validateAndUpdate]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const increment = useCallback(() => {
    const newValue = Math.min(60, (Number(localValue) || 0) + 1);
    setLocalValue(newValue);
    validateAndUpdate(newValue);
  }, [localValue, validateAndUpdate]);

  const decrement = useCallback(() => {
    const newValue = Math.max(1, (Number(localValue) || 60) - 1);
    setLocalValue(newValue);
    validateAndUpdate(newValue);
  }, [localValue, validateAndUpdate]);

  return (
    <div className="grid gap-[5px] my-[.6rem] max-sm:grid-cols-2 max-sm:items-center max-sm:my-0">
      <InputLabel
        className={`text-mirage/40! text-[.75rem]! font-kumbh-sans! font-bold! text-left ${!isValid ? "text-red-500!" : ""}`}
        htmlFor={id}
      >
        {label}
      </InputLabel>

      <div className="relative">
        <Input
          disableUnderline
          className={`py-[.6rem] px-[1rem] bg-white-lilac rounded-[.625rem] text-mirage! text-[.875rem]! font-kumbh-sans! font-bold! ${!isValid ? "border border-red-500!" : ""}`}
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
            "& input[type=number]": { MozAppearance: "textfield" },
          }}
          id={id}
          type="number"
          value={isFocused ? localValue : value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-invalid={!isValid}
          aria-describedby={`${id}-error`}
          aria-label={`${label} time in minutes`}
        />

        <div className="absolute top-[50%] translate-y-[-50%] right-4 grid gap-[.563rem] bg-white-lilac">
          <button
            className="cursor-pointer"
            type="button"
            onClick={increment}
            aria-label={`Increase ${label} time`}
            disabled={value >= 60}
          >
            <img
              className={`transition-opacity duration-250 ease-in-out ${value >= 60 ? "opacity-30" : "opacity-50 hover:opacity-100"}`}
              src={arrowUpward}
              alt=""
              aria-hidden="true"
            />
          </button>
          <button
            className="cursor-pointer"
            type="button"
            onClick={decrement}
            aria-label={`Decrease ${label} time`}
            disabled={value <= 1}
          >
            <img
              className={`transition-opacity duration-250 ease-in-out ${value <= 1 ? "opacity-30" : "opacity-50 hover:opacity-100"}`}
              src={arrowDownward}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        {!isValid && (
          <span className="absolute -bottom-5 left-0 text-red-500 text-xs max-sm:bottom-0 max-sm:-left-[100%]" id={`${id}-error`}>
            Must be between 1-60
          </span>
        )}
      </div>
    </div>
  );
}