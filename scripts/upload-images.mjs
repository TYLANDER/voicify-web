/**
 * Upload Gemini-generated images to Sanity and patch documents
 * Usage: SANITY_TOKEN=<token> node scripts/upload-images.mjs
 */

import fs from 'fs';
import path from 'path';

const PROJECT_ID = '3uqiyfh2';
const DATASET = 'production';
const API_VERSION = '2025-03-24';
const TOKEN = process.env.SANITY_TOKEN || '';

const IMAGES_DIR =
  '/Users/tylerschmidt/.gemini/antigravity/brain/56d810bb-d7d2-4a7b-8395-4e53a136465f';

const IMAGE_MAP = [
  { docId: 'industry-restaurants', file: 'industry_restaurants_1774420573262.png' },
  { docId: 'industry-dental', file: 'industry_dental_1774420588688.png' },
  { docId: 'industry-hotels', file: 'industry_hotels_1774420622520.png' },
  { docId: 'industry-automotive', file: 'industry_automotive_1774420988882.png' },
  { docId: 'product-answering', file: 'product_answering_1774421001502.png' },
  { docId: 'product-ordering', file: 'product_ordering_1774421037685.png' },
  { docId: 'product-reservations', file: 'product_reservations_1774421050560.png' },
];

async function uploadImage(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);

  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/assets/images/${DATASET}?filename=${filename}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'image/png',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: fileBuffer,
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Upload failed: ${JSON.stringify(data)}`);
  }
  return data.document._id;
}

async function patchDocument(docId, assetId) {
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            patch: {
              id: docId,
              set: {
                'hero.backgroundImage': {
                  _type: 'image',
                  asset: { _type: 'reference', _ref: assetId },
                },
                'hero.backgroundType': 'image',
              },
            },
          },
        ],
      }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Patch failed: ${JSON.stringify(data)}`);
  }
  return data;
}

for (const { docId, file } of IMAGE_MAP) {
  const filePath = path.join(IMAGES_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ Skipping ${docId} — file not found: ${file}`);
    continue;
  }

  try {
    console.log(`Uploading ${file}...`);
    const assetId = await uploadImage(filePath);
    console.log(`  → Asset: ${assetId}`);

    await patchDocument(docId, assetId);
    console.log(`  ✓ Patched ${docId}`);
  } catch (err) {
    console.error(`  ✗ Failed ${docId}: ${err.message}`);
  }
}

console.log('\n✅ Image upload complete!');
