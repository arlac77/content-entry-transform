/**
 * Creates a new transformer.
 * On match the enrtry will be assigned noe properties as given by propertyDefinitions.
 * @param {Object} propertyDefinitions
 * @param {Matcher} matcher
 * @return {Transformer}
 */
export function createPropertiesTransformer(
  propertyDefinitions,
  match,
  name = "property"
) {
  return {
    name,
    match,
    transform: async entry => Object.create(entry, propertyDefinitions)
  };
}
