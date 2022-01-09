export function nameExtensionMatcher(extensions)
{
  const r = RegExp(`(${extensions.join('|')})$`);
  return (entry) => entry.name.match(r) ? true : false;
}
