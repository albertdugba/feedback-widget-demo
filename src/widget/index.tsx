import { render } from "preact";
import { WidgetProvider } from "./context";
import {
  FeedbackWidget,
  widgetStyles,
  type WidgetHandle,
  type FeedbackData,
} from "./components";

export type { FeedbackData, WidgetHandle };

export interface FeedbackWidgetConfig {
  projectId: string;
  onSubmit?: (data: FeedbackData) => void;
  containerId?: string;
  hideBranding?: boolean;
}

export interface FeedbackWidgetInstance {
  open: () => void;
  close: () => void;
  toggle: () => void;
  destroy: () => void;
}

function getContainer(containerId?: string): HTMLElement {
  if (containerId) {
    const existing = document.getElementById(containerId);
    if (existing) return existing;
  }

  const host = document.createElement("div");
  if (containerId) host.id = containerId;
  document.body.appendChild(host);
  return host;
}

export function init(config: FeedbackWidgetConfig): FeedbackWidgetInstance {
  if (!config.projectId) {
    throw new Error("[FeedbackWidget] projectId is required.");
  }

  const widgetRef: { current: WidgetHandle | null } = { current: null };
  let host: HTMLElement | null = null;
  let mountPoint: HTMLElement | null = null;

  function mount() {
    host = getContainer(config.containerId);
    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = widgetStyles;
    shadow.appendChild(style);

    mountPoint = document.createElement("div");
    shadow.appendChild(mountPoint);

    render(
      <WidgetProvider>
        <FeedbackWidget
          ref={widgetRef}
          projectId={config.projectId}
          onSubmit={config.onSubmit}
          hideBranding={config.hideBranding}
        />
      </WidgetProvider>,
      mountPoint,
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }

  return {
    open: () => widgetRef.current?.open(),
    close: () => widgetRef.current?.close(),
    toggle: () => widgetRef.current?.toggle(),
    destroy: () => {
      if (mountPoint) render(null, mountPoint);
      host?.remove();
    },
  };
}

if (typeof window !== "undefined") {
  (window as any).FeedbackWidget = { init };
}
