import test from "ava";
import { StringContentEntry } from "content-entry";
import { createExpressionTransformer } from "content-entry-transform";

test("property transform", async t => {
  const pt = createExpressionTransformer(() => true, { a: 1 }, "matcherName");

  const entry = await pt.transform(new StringContentEntry("aName", "X{{a}}Y"));

  t.is(pt.name, "matcherName");

  t.is(entry.name, "aName");
  t.is(await entry.string, "X1Y");
});
