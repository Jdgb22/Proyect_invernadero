import { Agent, fetch as undiciFetch } from "undici";

const dispatcher = new Agent({
  connect: { autoSelectFamilyAttemptTimeout: 2500 },
});

export const serverFetch = ((
  input: Parameters<typeof undiciFetch>[0],
  init?: Parameters<typeof undiciFetch>[1],
) =>
  undiciFetch(input, {
    ...init,
    dispatcher,
  })) as unknown as typeof globalThis.fetch;
