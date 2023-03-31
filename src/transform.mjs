export * from "./properties-transformer.mjs";
export * from "./expression-transformer.mjs";
export * from "./matcher.mjs";

/**
 * Apply transformers.
 * @param {AsyncIterator<ContentEntry>} source
 * @param {Transformer[]} transformers
 * @param {Boolean]} onlyMatching filter out all none matching entries
 */
export async function* transform(source, transformers = [], onlyMatching) {
  const usedTransformers = new Set();

  for await (let entry of source) {
    let didMatch = false;
    for (const t of transformers) {
      if (t.match(entry)) {
        didMatch = true;
        entry = await t.transform(entry);
        usedTransformers.add(t);
      }
    }

    if (didMatch || !onlyMatching) {
      yield entry;
    }
  }

  for (const t of transformers) {
    if (!usedTransformers.has(t) && t.createEntryWhenMissing !== undefined) {
      yield t.transform(await t.createEntryWhenMissing());
    }
  }
}
