import { IteratorContentEntry } from "content-entry";
import { iterableStringInterceptor } from "iterable-string-interceptor";

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
      else {
        return leadIn + e + leadOut;
      }
   //   return "";
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

  const decoder = new TextDecoder();

  async function * streamToText(stream)
  {
    for await (const chunk of stream) {
      yield decoder.decode(chunk);
    }
  }

  return {
    name,
    match,
    transform: async entry => {
      const ne = new IteratorContentEntry(
        entry.name,
        { destination: entry.destination },
        iterableStringInterceptor(
          streamToText(await entry.stream),
          createPropertiesInterceptor(properties)
        )
      );
      return ne;
    }
  };
}
