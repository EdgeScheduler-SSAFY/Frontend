import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import * as theme from "@/shared/lib/styles/theme";

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={theme.default}>{children}</ThemeProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
