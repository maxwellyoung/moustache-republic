import "@testing-library/jest-dom";
import React from "react";

// Mock next/image
jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: function Image({ src, alt, ...props }: any) {
      // eslint-disable-next-line @next/next/no-img-element
      return React.createElement("img", { src, alt, ...props });
    },
  };
});

// Extend expect with jest-dom matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
    }
  }
}
