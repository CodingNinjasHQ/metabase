import { setDisplayTheme } from "metabase/dashboard/actions";
import { getDisplayTheme } from "metabase/dashboard/selectors";
import { useDispatch, useSelector } from "metabase/lib/redux";
import type { DisplayTheme } from "metabase/public/lib/types";

import type { EmbedThemeControls } from "../types";

export const useEmbedTheme = (): EmbedThemeControls => {
  const dispatch = useDispatch();

  const theme = useSelector(getDisplayTheme);
  const setTheme = (theme: DisplayTheme) => dispatch(setDisplayTheme(theme));

  const onNightModeChange = (isNightMode: boolean) => {
    setTheme(isNightMode ? "night" : "light");
  };

  const isNightMode = theme === "night";

  const hasNightModeToggle = theme !== "transparent";

  return {
    theme,
    setTheme,
    onNightModeChange,
    hasNightModeToggle,
    isNightMode,
  };
};
