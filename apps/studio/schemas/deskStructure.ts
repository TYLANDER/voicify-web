import type { StructureBuilder } from 'sanity/structure';

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      // Products
      S.listItem()
        .title('Products')
        .icon(() => '📦')
        .child(S.documentTypeList('productPage').title('Product Pages')),

      // Industries
      S.listItem()
        .title('Industries')
        .icon(() => '🏢')
        .child(S.documentTypeList('industryPage').title('Industry Pages')),

      // Pages
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(S.documentTypeList('page').title('Pages')),

      S.divider(),

      // Resources
      S.listItem()
        .title('Articles')
        .icon(() => '✍️')
        .child(S.documentTypeList('article').title('Articles')),

      S.listItem()
        .title('Events')
        .icon(() => '📅')
        .child(S.documentTypeList('event').title('Events')),

      S.divider(),

      // Partners
      S.listItem()
        .title('Partners')
        .icon(() => '🤝')
        .child(S.documentTypeList('partner').title('Partners')),
    ]);
