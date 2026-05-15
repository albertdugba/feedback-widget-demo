import { useWidget } from "../context";
import { MessageIcon } from "./icons";

export function Trigger() {
  const { toggle, state } = useWidget();

  return (
    <button
      className={`fw-trigger ${state.isOpen ? "fw-trigger--open" : ""}`}
      onClick={toggle}
      aria-label="Send Feedback"
    >
      <span className="fw-trigger-icon">
        <MessageIcon size={16} />
      </span>
      <span className="fw-trigger-text">Feedback</span>
    </button>
  );
}
