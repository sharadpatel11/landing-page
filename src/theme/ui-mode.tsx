import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type UiMode = "classic" | "modern";

const STORAGE_KEY = "ui-mode";

type UiModeContextValue = {
  mode: UiMode;
  setMode: (mode: UiMode) => void;
  toggleMode: () => void;
};

const UiModeContext = createContext<UiModeContextValue | null>(null);

function readInitialMode(): UiMode {
  if (typeof window === "undefined") return "modern";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "classic" || stored === "modern" ? stored : "modern";
}

function applyModeToDocument(mode: UiMode) {
  const root = document.documentElement;
  root.classList.toggle("theme-classic", mode === "classic");
  root.classList.toggle("theme-modern", mode === "modern");
  root.dataset.uiMode = mode;

  const favicon = document.querySelector<HTMLLinkElement>('link[data-ui-favicon=""] , link[data-ui-favicon]');
  if (favicon) {
    favicon.href = mode === "classic" ? "/favicon.svg" : "/favicon_modern.svg";
  }

  window.dispatchEvent(new CustomEvent("ui-mode-change", { detail: { mode } }));
}

export function UiModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<UiMode>(() => readInitialMode());

  useEffect(() => {
    applyModeToDocument(mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo<UiModeContextValue>(() => {
    return {
      mode,
      setMode,
      toggleMode: () => setMode((m) => (m === "classic" ? "modern" : "classic")),
    };
  }, [mode]);

  return <UiModeContext.Provider value={value}>{children}</UiModeContext.Provider>;
}

export function useUiMode() {
  const ctx = useContext(UiModeContext);
  if (!ctx) throw new Error("useUiMode must be used within UiModeProvider");
  return ctx;
}

