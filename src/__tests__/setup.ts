import "@testing-library/jest-dom";
import { ImageProps } from "next/image";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Partial<ImageProps>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return `<img ${Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ")} alt="${props.alt || ""}" />`;
  },
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => "/"),
}));

// Set up environment variables
process.env.API_URL =
  "https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels";
