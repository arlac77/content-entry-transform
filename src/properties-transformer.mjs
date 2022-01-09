export function createPropertiesTransformer(propertyDefinitions, match) {
  return {
    name: "property",
    match,
    transform: async entry => Object.create(entry, propertyDefinitions)
  };
}
