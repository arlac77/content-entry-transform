import { ReadableStreamContentEntry } from "content-entry";
import { iterableStringInterceptor } from "iterable-string-interceptor";

export const utf8StreamOptions = { encoding: "utf8" };

export function createPropertiesInterceptor(properties) {
  return async function* transformer(
    expression,
    remainder,
    source,
    cb,
    leadIn,
    leadOut
  ) {
    function ev(e, deepth) {
      if (deepth > 9) {
        throw new Error(
          `Probably circular reference evaluating: ${expression}`
        );
      }
      let value = properties[e];
      if (value !== undefined) {
        if (typeof value === "string") {
          while (true) {
            const li = value.indexOf(leadIn);
            if (li >= 0) {
              const lo = value.indexOf(leadOut, li + leadIn.length);
              value =
                value.substring(0, li) +
                ev(value.substring(li + leadIn.length, lo), deepth + 1) +
                value.substring(lo + leadOut.length);
            } else {
              break;
            }
          }
        }
        return value;
      }
      return "";
    }

    yield ev(expression, 0);
  };
}

/**
 * Transformer expanding '{{}}' expressions
 * @param {string} match 
 * @param {Object} properties 
 * @param {string} name 
 * @returns 
 */
export function createExpressionTransformer(
  match,
  properties,
  name = "expression"
) {
  return {
    name,
    match,
    transform: async entry => {
      //console.log("TRANSFORM",entry.name);
      const ne = new ReadableStreamContentEntry(
        entry.name,
        iterableStringInterceptor(
          await entry.getReadStream(utf8StreamOptions),
          createPropertiesInterceptor(properties)
        )
      );
      ne.destination = entry.destination; // TODO all the other attributes ?
      return ne;
      //return Object.assign(entry,ne);
    }
  };
}
