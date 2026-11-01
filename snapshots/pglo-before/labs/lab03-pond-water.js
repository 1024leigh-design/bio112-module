/* Lab 3: Pond water. Content from the build brief. */
VLAB.add({
  n:3, title:"Pond water",
  learn:[
    {h:"Four groups and how to tell them apart", kind:"facts", figs:[
      {type:"svg", name:"pond", kind:"protozoa", cap:"Protozoa: one cell, moving"}, {type:"svg", name:"pond", kind:"algae", cap:"Algae: green, has a nucleus"},
      {type:"svg", name:"pond", kind:"cyano", cap:"Cyanobacteria: blue-green, no nucleus"}, {type:"svg", name:"pond", kind:"inv", cap:"Invertebrate: many cells"}], items:[
      {t:"<b>Protozoa:</b> [[single-celled|single celled|unicellular]] eukaryotes. Usually unpigmented. Usually moving. Examples: amoebas, paramecia."},
      {t:"<b>Algae:</b> single-celled or colonial/filamentous eukaryotes. [[Photosynthetic]]. Green or golden-brown."},
      {t:"<b>Cyanobacteria:</b> photosynthetic [[prokaryotes|prokaryote|prokaryotic]]. They are bacteria, not algae. Chlorophyll a. Called \"[[blue-green|blue green]].\""},
      {t:"<b>Microscopic invertebrates:</b> [[multicellular]]. Larger and transparent, with visible internal structures. Usually fast moving. Examples: rotifers, daphnia, roundworms."}
    ]},
    {h:"Features to check", kind:"facts", tip:"Ask in this order: one cell or many? Pigment? Nucleus? Size and movement?", items:[
      {t:"One cell or [[many cells|many|multicellular]]?"},
      {t:"Pigment? Green or golden-brown points to [[algae]]. Blue-green points to cyanobacteria."},
      {t:"Nucleus? Cyanobacteria are prokaryotes, so they have [[no nucleus|none|no]]."},
      {t:"Size and movement? Larger, fast, with visible insides points to an [[invertebrate|microscopic invertebrate|invertebrates]]."}
    ]}
  ],
  practice:[
    {sim:"sort", title:"What features would you check?", prompt:"Sort each feature card into the group it describes.",
      bins:[{id:"pro", label:"Protozoa"}, {id:"alg", label:"Algae"}, {id:"cya", label:"Cyanobacteria"}, {id:"inv", label:"Microscopic invertebrates"}],
      cards:[
        {t:"One cell, has a nucleus, no pigment, moving", bin:"pro", why:"Single-celled, unpigmented, moving eukaryote: protozoa.", hint:"It has a nucleus and no pigment."},
        {t:"Amoebas and paramecia", bin:"pro", why:"These are protozoa.", hint:"These are single-celled and move."},
        {t:"Green or golden-brown, has a nucleus", bin:"alg", why:"Photosynthetic eukaryotes that are green or golden-brown: algae.", hint:"It has a nucleus, so it is a eukaryote."},
        {t:"Colonial or filamentous, photosynthetic, has a nucleus", bin:"alg", why:"Algae can be single-celled, colonial, or filamentous.", hint:"Photosynthetic with a nucleus."},
        {t:"Photosynthetic, no nucleus", bin:"cya", why:"No nucleus means prokaryote: cyanobacteria.", hint:"No nucleus means prokaryote."},
        {t:"Blue-green, chlorophyll a", bin:"cya", why:"Cyanobacteria are the \"blue-green\" bacteria.", hint:"Which group is called blue-green?"},
        {t:"Bacteria, not algae", bin:"cya", why:"Cyanobacteria are bacteria.", hint:"This group is often mistaken for algae."},
        {t:"Many cells, transparent, visible internal structures", bin:"inv", why:"Multicellular with visible insides: a microscopic invertebrate.", hint:"It is multicellular."},
        {t:"Rotifers, daphnia, roundworms", bin:"inv", why:"These are microscopic invertebrates.", hint:"These are animals made of many cells."},
        {t:"Larger and usually fast moving", bin:"inv", why:"Microscopic invertebrates are larger and usually fast.", hint:"Which group is the biggest?"}
      ], done:"You can now tell all four groups apart."}
  ]
});
