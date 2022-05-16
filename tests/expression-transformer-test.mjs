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

test("property transform deep", async t => {
  const pt = createExpressionTransformer(
    () => true,
    { a: "{{b}}", b: "{{c}}", c: 3 },
    "matcherName"
  );
  const entry = await pt.transform(new StringContentEntry("aName", "X{{a}}Y"));

  t.is(pt.name, "matcherName");

  t.is(entry.name, "aName");
  t.is(await entry.string, "X3Y");
});

test.skip("property transform circular", async t => {
  const pt = createExpressionTransformer(
    () => true,
    { a: "{{b}}", b: "{{c}}", c: "{{a}}" },
    "matcherName"
  );

  try {
    const entry = await pt.transform(
      new StringContentEntry("aName", "X{{a}}Y")
    );
   // t.fail("unreachable");
  } catch (e) {
    t.is(e.message, "Probably circular reference evaluating: a");
  }
});
