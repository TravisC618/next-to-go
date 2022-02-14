import { render, screen } from "@testing-library/react";
import { ErrorAlert } from "../../components/ErrorAlert/ErrorAlert";

describe("Error Alert", () => {
  test("should render alert when error passed into props", () => {
    const error = "test-error";
    render(<ErrorAlert error={error} />);

    const alertElement = screen.getByText(error);
    expect(alertElement).toBeInTheDocument();
  });
});
