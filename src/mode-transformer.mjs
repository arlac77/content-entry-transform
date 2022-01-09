export function createModeTransformer(mode, match) {
  return {
    name: "mode",
    match,
    transform: async entry => Object.create(entry, { mode: { value: mode } })
  };
}
