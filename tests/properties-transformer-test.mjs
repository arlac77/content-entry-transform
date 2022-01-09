import test from "ava";
import { ContentEntry } from "content-entry";
import { createPropertiesTransformer } from "content-entry-transform";

test("property transform", async t => {
	const pt = createPropertiesTransformer({ mode: { value: 4711 }}, () => true );
	const entry = await pt.transform(new ContentEntry("aName"));

	t.is(entry.mode, 4711);
	t.is(entry.name, "aName");
});
