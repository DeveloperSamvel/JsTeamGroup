import { createClient } from "pexels";

const client = createClient(
  "TrAOaNFEuh7CtaF1xbqatu4L7Je9VPjuwlGWdEZ9oVbfDaoCpyldLRZd"
);

client.photos.show({ id: 2014422 }).then((photo) => {});

async function getCuratedPhotos() {
  const curatedPhotos = await fetch("");
}
