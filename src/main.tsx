import { init } from "./widget";

init({
  projectId: "proj_abc123",
  onSubmit: (data) => console.log("Feedback:", data),
});
