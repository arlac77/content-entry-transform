
export function nameExtensionMatcher(extensions)
{
  const s = `(${extensions.map(/\./,"\\.").join('|')})$`;
  console.log("RE",s);

  const r = new RegExp(s);
  return (entry) => r.test(entry.name);
}
