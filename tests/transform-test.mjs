import test from "ava";
import { StringContentEntry } from "content-entry";
import {
  transform,
  createExpressionTransformer,
  createPropertiesTransformer
} from "content-entry-transform";

async function* sources() {
  for (const i in [1, 2, 3, 4]) {
    yield new StringContentEntry("a" + i, "X{{a}}Y");
  }
}

test("transform null", async t => {
  const transformed = [];

  for await (const e of transform(sources())) {
    transformed.push(e);
  }

  t.is(transformed.length, 4);
});

test("transform multiple", async t => {
  const transformed = [];

  for await (const e of transform(sources(), [
    createExpressionTransformer(() => true, { a: 1 }),
    createPropertiesTransformer(
      () => true,
      { mode: { value: 4711 }, types: { value: ["public.data"] } },
      "matcherName"
    )
  ])) {
    transformed.push(e);
  }

  t.is(transformed.length, 4);

  t.is(transformed[0].mode, 4711);
  t.is(await transformed[0].string, "X1Y");
});
