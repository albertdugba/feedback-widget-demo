import { useWidget, type FeedbackType } from "../context";
import { BugIcon, LightbulbIcon, ChatIcon, ChevronRightIcon } from "./icons";

interface MenuOption {
  type: FeedbackType;
  icon: typeof BugIcon;
  title: string;
  description: string;
}

const menuOptions: MenuOption[] = [
  {
    type: "bug",
    icon: BugIcon,
    title: "Bug Report",
    description: "Something isn't working correctly",
  },
  {
    type: "feature",
    icon: LightbulbIcon,
    title: "Feature Request",
    description: "Suggest a new feature or improvement",
  },
  {
    type: "general",
    icon: ChatIcon,
    title: "General Feedback",
    description: "Share your thoughts with us",
  },
];

export function FeedbackMenu() {
  const { selectFeedbackType } = useWidget();

  return (
    <div className="fw-menu">
      <div className="fw-menu-header">
        <h2>Send feedback</h2>
        <p>How can we help you today?</p>
      </div>
      <div className="fw-menu-options">
        {menuOptions.map((option) => (
          <button
            key={option.type}
            className="fw-menu-option"
            onClick={() => selectFeedbackType(option.type)}
          >
            <div className="fw-menu-option-icon">
              <option.icon size={20} />
            </div>
            <div className="fw-menu-option-content">
              <span className="fw-menu-option-title">{option.title}</span>
              <span className="fw-menu-option-desc">{option.description}</span>
            </div>
            <ChevronRightIcon size={18} className="fw-menu-option-arrow" />
          </button>
        ))}
      </div>
    </div>
  );
}
