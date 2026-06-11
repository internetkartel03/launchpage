/* METALLIC.V1 — App Data */

const METALLIC = {
  betaDate: new Date('2025-09-01T00:00:00Z').getTime(),
  flagships: [
    {
      num: '01',
      name: 'MV1',
      nameFull: 'METALLIC\nMV1',
      imgKey: 'mv1',
      status: 'AVAILABLE NOW',
      available: true,
      category: 'FLAGSHIP',
      desc: 'The original. Signature streetwear drop from the METALLIC.V1 house.'
    },
    {
      num: '02',
      name: 'NAUGHTY PILOT',
      nameFull: 'NAUGHTY\nPILOT',
      imgKey: 'naughtyPilot',
      status: 'COMING SOON',
      available: false,
      category: 'FLAGSHIP',
      desc: 'Bold aviation-inspired streetwear. Coming soon.'
    },
    {
      num: '03',
      name: 'UNCENSORED',
      nameFull: 'UNCENSORED',
      imgKey: 'uncensored',
      status: 'COMING SOON',
      available: false,
      category: 'FLAGSHIP',
      desc: 'Raw. Unfiltered. No restrictions.'
    },
    {
      num: '04',
      name: 'ZOUK',
      nameFull: 'ZOUK',
      imgKey: 'zouk',
      status: 'COMING SOON',
      available: false,
      category: 'FLAGSHIP',
      desc: 'Culture-driven design rooted in movement and rhythm.'
    },
    {
      num: '05',
      name: 'FLUENTBRIDGE',
      nameFull: 'FLUENT\nBRIDGE',
      imgKey: 'fluentBridge',
      status: 'COMING SOON',
      available: false,
      category: 'FLAGSHIP',
      desc: 'The bridge between worlds. Language-inspired drop.'
    }
  ]
};

const ASSET_URLS = {
  products: {
    mv1: 'product-mv1.png',
    naughtyPilot: 'product-naughty-pilot.png',
    uncensored: 'product-uncensored.png',
    zouk: 'product-zouk.png',
    fluentBridge: 'product-fluentbridge.png'
  }
};

const REWARDS = [
  { num: '01', title: 'EARLY ACCESS', desc: 'Be first to access beta drops before public release.' },
  { num: '02', title: 'FOUNDING DISCOUNT', desc: 'Locked-in discount on all future flagship products.' },
  { num: '03', title: 'EXCLUSIVE CONTENT', desc: 'Behind-the-scenes content, process drops, and more.' },
  { num: '04', title: 'COMMUNITY ACCESS', desc: 'Join the private METALLIC.V1 community circle.' }
];
