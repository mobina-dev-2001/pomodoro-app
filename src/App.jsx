import { useState } from "react";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import logoSvg from "./assets/images/logo.svg";
import Timer from "./components/Timer";
import Settings from "./components/Settings";

function App() {
  // Tabs
  const [tabVal, setTabVal] = useState("1");
  const handleTabChange = (event, newValue) => { setTabVal(newValue) };

  const [durations, setDurations] = useState(() => {
    try {
      const stored = localStorage.getItem("durations");
      const parsed = stored ? JSON.parse(stored) : null;

      if ( parsed &&
        typeof parsed.pomodoro === "number" &&
        typeof parsed.shortBreak === "number" &&
        typeof parsed.longBreak === "number"
      ) { return parsed }

      return { pomodoro: 1500, shortBreak: 300, longBreak: 900 };

    } catch (error) {
      console.error("Failed to parse localStorage durations:", error);
      return { pomodoro: 1500, shortBreak: 300, longBreak: 900 };
    }
  });

  // Styles
  const tabStyles =
    "w-[33.33%] h-[3rem] p-0! rounded-[1.656rem]! text-periwinkle/40! text-[clamp(.75rem,_2vw,_.875rem)]! font-theme! font-bold! lowercase! transition delay-50 duration-250 ease-in-out hover:text-periwinkle! [&.Mui-selected]:bg-theme! [&.Mui-selected]:text-port-gore! [&_.MuiTouchRipple-ripple]:bg-[rgba(255,255,255,0.5)]";

  return (
    <>
      <h1 className="w-[clamp(7.375rem,_22vw,_9.75rem)]">
        <img src={logoSvg} alt="pomodoro" />
      </h1>

      <TabContext value={tabVal}>
        <TabList
          className="w-[clamp(20.438rem,_58vw,_23.313rem)] h-[3.938rem] p-[.469rem] bg-mirage rounded-[1.969rem]"
          slotProps={{ indicator: { style: { display: "none" } } }}
          onChange={handleTabChange}
          aria-label="pomodoro timer tabs" >

          <Tab className={tabStyles} id="tab-1" label="pomodoro" value="1" aria-controls="tabpanel-1" />
          <Tab className={tabStyles} id="tab-2" label="short break" value="2" aria-controls="tabpanel-2" />
          <Tab className={tabStyles} id="tab-3" label="long break" value="3" aria-controls="tabpanel-3" />
        </TabList>

        <TabPanel id="tabpanel-1" value="1" aria-labelledby="tab-1" role="tabpanel" aria-live="polite">
          <Timer duration={durations.pomodoro} />
        </TabPanel>
        <TabPanel id="tabpanel-2" value="2" aria-labelledby="tab-2" role="tabpanel" aria-live="polite">
          <Timer duration={durations.shortBreak} />
        </TabPanel>
        <TabPanel id="tabpanel-3" value="3" aria-labelledby="tab-3" role="tabpanel" aria-live="polite">
          <Timer duration={durations.longBreak} />
        </TabPanel>

      </TabContext>

      <Settings durations={durations} setDurations={setDurations} />
    </>
  );
}

export default App;
