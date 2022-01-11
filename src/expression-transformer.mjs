import { ReadableStreamContentEntry } from "content-entry";
import { iterableStringInterceptor } from "iterable-string-interceptor";
import { nameExtensionMatcher } from "./matcher.mjs";

export const utf8StreamOptions = { encoding: "utf8" };

export function createPropertiesInterceptor(properties) {
  return async function* transformer(expression, remainder, source, cb) {
    const value = properties[expression];
    yield value === undefined ? "" : value;
  };
}

export function createExpressionTransformer(
  match = nameExtensionMatcher([
    ".conf",
    ".json",
    ".html",
    ".txt",
    ".service",
    ".socket"
  ]),
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
