import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MiniCart } from "../MiniCart";
import { CartItem } from "@/types";

const mockCart: CartItem[] = [
  {
    id: 1,
    title: "Classic Tee",
    price: 75.0,
    size: "M",
    quantity: 1,
    imageURL: "https://example.com/test-image.jpg",
    description: "Test description",
    sizeOptions: [],
  },
];

describe("MiniCart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders cart items correctly", () => {
    const mockUpdateQuantity = jest.fn();
    render(<MiniCart cart={mockCart} updateQuantity={mockUpdateQuantity} />);

    expect(screen.getByText("Classic Tee")).toBeInTheDocument();
    expect(screen.getByText("Size: M")).toBeInTheDocument();
    expect(screen.getByTestId("total-price")).toHaveTextContent("$75.00");
  });

  it("calls updateQuantity when quantity buttons are clicked", () => {
    const mockUpdateQuantity = jest.fn();
    render(<MiniCart cart={mockCart} updateQuantity={mockUpdateQuantity} />);

    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, "M", 2);

    fireEvent.click(screen.getByRole("button", { name: "-" }));
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, "M", 0);
  });

  it("shows total price correctly", () => {
    const mockUpdateQuantity = jest.fn();
    render(<MiniCart cart={mockCart} updateQuantity={mockUpdateQuantity} />);

    expect(screen.getByTestId("total-price")).toHaveTextContent("$75.00");
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = jest.fn();
    const mockUpdateQuantity = jest.fn();
    render(
      <MiniCart
        cart={mockCart}
        updateQuantity={mockUpdateQuantity}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByLabelText("Close cart"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
