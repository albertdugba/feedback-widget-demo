import { useState } from "preact/hooks";
import { useWidget, type FeedbackType } from "../context";
import { ArrowLeftIcon, SendIcon } from "./icons";

interface FeedbackFormProps {
  onSubmit: (data: { type: FeedbackType; message: string; email?: string }) => void;
}

const typeLabels: Record<FeedbackType, { title: string; placeholder: string }> = {
  bug: {
    title: "Report a Bug",
    placeholder: "Describe the bug you encountered...",
  },
  feature: {
    title: "Request a Feature",
    placeholder: "Describe the feature you'd like to see...",
  },
  general: {
    title: "General Feedback",
    placeholder: "Share your thoughts with us...",
  },
};

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const { state, reset, setView } = useWidget();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const feedbackType = state.feedbackType;
  if (!feedbackType) {
    return null;
  }
  const config = typeLabels[feedbackType];

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSubmit({
      type: feedbackType,
      message: message.trim(),
      email: email.trim() || undefined,
    });
    setView("success");
  };

  return (
    <div className="fw-form">
      <div className="fw-form-header">
        <button className="fw-back-btn" onClick={reset} type="button">
          <ArrowLeftIcon size={20} />
        </button>
        <h3>{config.title}</h3>
      </div>
      <form className="fw-form-content" onSubmit={handleSubmit}>
        <div className="fw-form-group">
          <label htmlFor="fw-message">Message</label>
          <textarea
            id="fw-message"
            placeholder={config.placeholder}
            value={message}
            onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
            rows={5}
            required
            autoFocus
          />
        </div>
        <div className="fw-form-group">
          <label htmlFor="fw-email">Email <span className="fw-optional">(optional)</span></label>
          <input
            id="fw-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
        </div>
        <button
          type="submit"
          className="fw-submit-btn"
          disabled={!message.trim()}
        >
          <span>Send Feedback</span>
          <SendIcon size={18} />
        </button>
      </form>
    </div>
  );
}
