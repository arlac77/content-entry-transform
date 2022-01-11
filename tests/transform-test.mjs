import test from "ava";
import { ContentEntry } from "content-entry";
import { transform } from "content-entry-transform";

async function* sources() {
  for (const i in [1, 2, 3, 4]) {
    yield new ContentEntry("a" + i);
  }
}

test("transform null", async t => {
  const transformed = [];

  for await (const e of transform(sources())) {
    transformed.push(e);
  }

  t.is(transformed.length, 4);
});
