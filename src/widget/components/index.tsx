import { useImperativeHandle, forwardRef } from "preact/compat";
import { useWidget, type FeedbackType } from "../context";
import { Trigger } from "./trigger";
import { FeedbackMenu } from "./feedback-menu";
import { FeedbackForm } from "./feedback-form";
import { FeedbackSuccess } from "./feedback-success";
import { CloseIcon, LogoIcon } from "./icons";
import widgetStyles from "./widget.css?inline";

export { widgetStyles };

export interface FeedbackData {
  type: FeedbackType;
  message: string;
  email?: string;
}

export interface WidgetHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface FeedbackWidgetProps {
  projectId: string;
  onSubmit?: (data: FeedbackData) => void;
  hideBranding?: boolean;
}

export const FeedbackWidget = forwardRef<WidgetHandle, FeedbackWidgetProps>(
  ({ projectId, onSubmit, hideBranding }, ref) => {
    const { state, open, close, toggle } = useWidget();

    useImperativeHandle(ref, () => ({ open, close, toggle }), [
      open,
      close,
      toggle,
    ]);

    const handleSubmit = (data: FeedbackData) => {
      console.log("[FeedbackWidget] Submitted:", { projectId, ...data });
      onSubmit?.(data);
    };

    return (
      <>
        <Trigger />
        <div className={`fw-panel ${state.isOpen ? "fw-panel--open" : ""}`}>
          <button className='fw-close-btn' onClick={close} aria-label='Close'>
            <CloseIcon size={20} />
          </button>
          <div className='fw-panel-content'>
            {state.view === "menu" && <FeedbackMenu />}
            {state.view === "form" && <FeedbackForm onSubmit={handleSubmit} />}
            {state.view === "success" && <FeedbackSuccess />}
          </div>
          {!hideBranding && (
            <div className='fw-branding'>
              <LogoIcon size={14} />
              <span>Powered by Albert Dugba Inc</span>
            </div>
          )}
        </div>
        {state.isOpen && <div className='fw-backdrop' onClick={close} />}
      </>
    );
  },
);
