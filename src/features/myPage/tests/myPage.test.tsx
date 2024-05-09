import React from "react";
import { render, screen, waitFor } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MyPageLayout from "@/app/myPage/layout";

describe("Change my LocalTime", () => {
  test("Change my LocalTime rendering", async () => {
    render(
      <MyPageLayout>
        <div>test</div>
      </MyPageLayout>
    );
    const Change_my_LocalTime = screen.getByText("Change my LocalTime");
    expect(Change_my_LocalTime).toBeInTheDocument();
  });
  test("Change my Local to Afghanistan", async () => {
    render(
      <MyPageLayout>
        <div>test</div>
      </MyPageLayout>
    );
    let selectDiv = screen.getByTestId("selectdiv");
    userEvent.click(selectDiv);
    let clickDiv = null;
    await waitFor(() => {
      clickDiv = screen.getByText("Afghanistan");
    });
    userEvent.click(clickDiv!);
    await waitFor(() => {
      selectDiv = screen.getByTestId("selectdiv");
      expect(selectDiv).toHaveTextContent("Afghanistan");
    });
  });
});
