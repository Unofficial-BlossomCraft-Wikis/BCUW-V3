export async function GET({  }) {
  const response = await fetch(
    "http://unofficial-blossomcraft-wikis.github.io/BCUW-contributors/contributors.json"
  );
  return new Response(await response.arrayBuffer());
}
