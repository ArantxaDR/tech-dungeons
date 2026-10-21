import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom ships its own AbortController, and its signal is not an instance of
// the AbortSignal that Node's Request (undici) accepts. React Router builds a
// Request for every navigation, so it would throw on each one. The app never
// talks to the network, so a Request without the signal is enough.
const NodeRequest = globalThis.Request;

class RequestWithoutSignal extends NodeRequest {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, { ...init, signal: undefined });
  }
}

globalThis.Request = RequestWithoutSignal as unknown as typeof Request;
