import { IteratorContentEntry } from "content-entry";
import { iterableStringInterceptor } from "iterable-string-interceptor";

/**
 * 
 * @param {Function} evaluate 
 */
export function createPropertiesInterceptor(evaluate) {
  return async function* transformer(
    expression,
    remainder,
    source,
    cb,
    leadIn,
    leadOut
  ) {
    function ev(e, depth) {
      if (depth > 9) {
        throw new Error(`Circular reference evaluating: ${expression}`, {
          cause: expression
        });
      }
      let value = evaluate(e);

      console.log(e, "->", value)
      if (value !== undefined) {
        if (typeof value === "string") {
          while (true) {
            const li = value.indexOf(leadIn);
            if (li >= 0) {
              const lo = value.indexOf(leadOut, li + leadIn.length);
              value =
                value.substring(0, li) +
                ev(value.substring(li + leadIn.length, lo), depth + 1) +
                value.substring(lo + leadOut.length);
            } else {
              break;
            }
          }
        }
        return value;
      } else {
        return leadIn + e + leadOut;
      }
    }

    yield ev(expression, 0);
  };
}

/**
 * Transformer expanding '{{}}' expressions
 * @param {string} match
 * @param {Object|Function} properties
 * @param {string} name
 * @returns
 */
export function createExpressionTransformer(
  match,
  properties,
  name = "expression"
) {
  const decoder = new TextDecoder();

  async function* streamToText(stream) {
    for await (const chunk of stream) {
      yield decoder.decode(chunk);
    }
  }

  const interceptor = createPropertiesInterceptor(
    typeof properties === "function" ? properties : name => properties[name]
  );

  return {
    name,
    match,
    transform: async entry => {
      if (entry.isCollection) {
        return entry;
      }

      const stream = await entry.stream;
      const ne = new IteratorContentEntry(
        entry.name,
        { destination: entry.destination },
        () => iterableStringInterceptor(streamToText(stream), interceptor)
      );
      return ne;
    }
  };
}
