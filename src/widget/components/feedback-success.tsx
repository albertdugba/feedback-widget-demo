import { useWidget } from "../context";
import { CheckIcon } from "./icons";

export function FeedbackSuccess() {
  const { close } = useWidget();

  return (
    <div className="fw-success">
      <div className="fw-success-icon">
        <CheckIcon size={32} />
      </div>
      <h3>Thank you!</h3>
      <p>Your feedback has been received. We appreciate you taking the time to help us improve.</p>
      <button className="fw-success-btn" onClick={close}>
        Done
      </button>
    </div>
  );
}
