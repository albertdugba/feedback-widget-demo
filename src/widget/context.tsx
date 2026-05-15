import { createContext } from "preact";
import { useContext, useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

export type FeedbackType = "bug" | "feature" | "general";
export type WidgetView = "menu" | "form" | "success";

interface WidgetState {
  isOpen: boolean;
  view: WidgetView;
  feedbackType: FeedbackType | null;
}

interface WidgetContextValue {
  state: WidgetState;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setView: (view: WidgetView) => void;
  selectFeedbackType: (type: FeedbackType) => void;
  reset: () => void;
}

const WidgetContext = createContext<WidgetContextValue | null>(null);

const initialState: WidgetState = {
  isOpen: false,
  view: "menu",
  feedbackType: null,
};

const CLOSE_ANIMATION_MS = 300;

export function WidgetProvider({ children }: { children: ComponentChildren }) {
  const [state, setState] = useState<WidgetState>(initialState);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  const open = useCallback(() => {
    clearCloseTimer();
    setState((prev) => ({ ...prev, isOpen: true }));
  }, [clearCloseTimer]);

  const close = useCallback(() => {
    clearCloseTimer();
    setState((prev) => ({ ...prev, isOpen: false }));
    closeTimerRef.current = setTimeout(() => {
      setState(initialState);
    }, CLOSE_ANIMATION_MS);
  }, [clearCloseTimer]);

  const toggle = useCallback(() => {
    setState((prev) => {
      if (prev.isOpen) {
        clearCloseTimer();
        closeTimerRef.current = setTimeout(() => {
          setState(initialState);
        }, CLOSE_ANIMATION_MS);
        return { ...prev, isOpen: false };
      }
      clearCloseTimer();
      return { ...prev, isOpen: true };
    });
  }, [clearCloseTimer]);

  const setView = useCallback((view: WidgetView) => {
    setState((prev) => ({ ...prev, view }));
  }, []);

  const selectFeedbackType = useCallback((type: FeedbackType) => {
    setState((prev) => ({ ...prev, feedbackType: type, view: "form" as const }));
  }, []);

  const reset = useCallback(() => {
    clearCloseTimer();
    setState((prev) => ({ ...prev, view: "menu" as const, feedbackType: null }));
  }, [clearCloseTimer]);

  return (
    <WidgetContext.Provider value={{ state, open, close, toggle, setView, selectFeedbackType, reset }}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidget() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget must be used within WidgetProvider");
  }
  return context;
}
