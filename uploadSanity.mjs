import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: '3uqiyfh2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'skZf3iIlEZ4v8vKcJ4nkESNpjL66jY0SuOIawBi8lbTJqTwodtmzloJlpLmkpZaSFEgwqrLqbjaFF3kDL'
});

const IMAGES_DIR = '/Users/tylerschmidt/.gemini/antigravity/brain/56d810bb-d7d2-4a7b-8395-4e53a136465f';

const TARGET_PAGES = {
  'Restaurants': 'industry_restaurants_1774420573262.png',
  'Dental': 'industry_dental_1774420588688.png',
  'Hotels': 'industry_hotels_1774420622520.png',
  'Medical': 'industry_medical_1774420959404.png',
  'Automotive': 'industry_automotive_1774420988882.png',
  'Voice AI Answering': 'product_answering_1774421001502.png',
  'Voice AI Ordering': 'product_ordering_1774421037685.png',
  'Voice AI Reservations': 'product_reservations_1774421050560.png'
};

async function main() {
  console.log("Fetching documents...");
  const docs = await client.fetch(`*[_type in ["industryPage", "productPage"]] { _id, title }`);
  
  for (const doc of docs) {
    if (TARGET_PAGES[doc.title]) {
      const filename = TARGET_PAGES[doc.title];
      const filePath = path.join(IMAGES_DIR, filename);
      
      if (!fs.existsSync(filePath)) {
        console.log(`Missing generated file for ${doc.title}: ${filename}`);
        continue;
      }
      
      console.log(`Uploading ${filename} for ${doc.title}...`);
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: filename
      });
      console.log(`Asset uploaded: ${asset._id}`);
      
      console.log(`Patching document ${doc.title} (${doc._id})...`);
      await client.patch(doc._id)
        .set({
          'hero.backgroundImage': {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id }
          },
          'hero.backgroundType': 'image'
        })
        .commit();
        
      console.log(`Successfully updated ${doc.title}.`);
    }
  }
  console.log("Done updating Sanity CMS!");
}

main().catch(console.error);
