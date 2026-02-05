import test from "ava";
import { StringContentEntry } from "content-entry";
import { createExpressionTransformer } from "content-entry-transform";

test("property transform", async t => {
  const pt = createExpressionTransformer(
    () => true,
    (e) => { return { a: 1, b: 2 }[e]; },
    "matcherName"
  );
  const entry = await pt.transform(
    new StringContentEntry("aName", undefined, "X{{a}}Y{{b}}{{a}}Z")
  );

  t.is(pt.name, "matcherName");

  //console.log(entry);
  t.is(entry.name, "aName");
  const string = await entry.string;
  t.is(typeof string, "string");
  t.is(string, "X1Y21Z");
});

test.skip("property transform none string result", async t => {
  const pt = createExpressionTransformer(
    () => true,
    (e) => { return { a: 1, b: [] }[e]; },
    "matcherName"
  );
  const entry = await pt.transform(
    new StringContentEntry("aName", undefined, "X{{a}}Y{{b}}{{a}}Z")
  );

  t.is(pt.name, "matcherName");

  //console.log(entry);
  t.is(entry.name, "aName");
  const string = await entry.string;
  t.is(typeof string, "string");
  t.is(string, "X1Y21Z");
});

test("property transform deep", async t => {
  const pt = createExpressionTransformer(
    () => true,
    { a: "a{{b}}a", b: "b{{c}}{{d}}b", c: 3, d: "4" },
    "matcherName"
  );
  const entry = await pt.transform(new StringContentEntry("aName", undefined, "X{{a}}{{d}}Y"));

  t.is(pt.name, "matcherName");

  t.is(entry.name, "aName");
  t.is(await entry.string, "Xab34ba4Y");
});

test("property transform circular", async t => {
  const pt = createExpressionTransformer(
    () => true,
    { a: "{{b}}", b: "{{c}}", c: "{{a}}" },
    "matcherName"
  );

  try {
    const entry = await pt.transform(
      new StringContentEntry("aName", undefined, "X{{a}}Y")
    );

    t.is(await entry.string, "Xab3baY");

    t.fail("unreachable");
  } catch (e) {
    t.is(e.message, "Circular reference evaluating: a");
  }
});

test("property transform unbalanced", async t => {
  const pt = createExpressionTransformer(() => true, {}, "matcherName");

  const entry = await pt.transform(
    new StringContentEntry("aName", undefined, "XYZ{{a open end")
  );

  t.is(await entry.string, "XYZ{{a open end");
});
