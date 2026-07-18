/**
 * Temporary stock photography (Unsplash) used to preview the design before
 * the professional photo shoot is delivered. Every id here should eventually
 * be replaced by a real Manna photo — this file is the single place to do it.
 */
function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/${id}?q=80&w=${width}&auto=format&fit=crop`;
}

export const stockPhotos = {
  hero: unsplash("photo-1596463299966-b3bff2c15ad0", 1920),
  aboutTeaser: unsplash("photo-1613274554329-70f997f5789f"),
  editorialSplit: unsplash("photo-1651440204216-548382747b40"),

  dishes: {
    ensaladaCesar: unsplash("photo-1774971295729-682dcb737644"),
    jamonIberico: unsplash("photo-1607877200978-3cab430e00cd"),
    panConTomate: unsplash("photo-1656423521731-9665583f100c"),
    patatasBravas: unsplash("photo-1682313109801-f78b53acf07c"),
    croquetas: unsplash("photo-1548340748-6d2b7d7da280"),
    pimientosPadron: unsplash("photo-1565599837634-134bc3aadce8"),
  },

  galleryTeaser: [
    unsplash("photo-1630175860333-5131bda75071"),
    unsplash("photo-1728501650832-57bafbf10a37"),
    unsplash("photo-1568901346375-23c9450c58cd"),
    unsplash("photo-1547595628-c61a29f496f0"),
  ],

  gallery: {
    dishes: [
      unsplash("photo-1534080564583-6be75777b70a"),
      unsplash("photo-1596463299966-b3bff2c15ad0"),
      unsplash("photo-1655111205128-b6857267a2e9"),
      unsplash("photo-1682313014568-2ed4f520e020"),
      unsplash("photo-1622883464819-e086aa5d4830"),
    ],
    interior: [
      unsplash("photo-1709548145082-04d0cde481d4"),
      unsplash("photo-1573822028151-731623cb0722"),
      unsplash("photo-1636405189493-181ecf851006"),
      unsplash("photo-1679312061521-d7d619a8cfb7"),
    ],
    exterior: [
      unsplash("photo-1665758564802-f611df512d8d"),
      unsplash("photo-1624755298656-b8565abb35e1"),
      unsplash("photo-1689075326462-581d7705c0ef"),
    ],
  },
};
