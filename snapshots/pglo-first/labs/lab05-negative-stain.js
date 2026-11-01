/* Lab 5: Negative staining. Content from the build brief. */
VLAB.add({
  n:5, title:"Negative staining",
  learn:[
    {h:"How dyes work", kind:"facts", items:[
      {t:"Dyes have a colored ion called the [[chromophore]]."},
      {t:"Acidic dyes have a [[negative]] chromophore (an anion)."},
      {t:"Basic dyes have a [[positive]] chromophore (a cation)."},
      {t:"Bacteria are [[negatively|negative]] charged at neutral pH, so acidic dyes are [[repelled|pushed away]].", why:"Like charges push each other away."},
      {t:"In a negative stain, the [[background]] stains and the cells stay clear."}
    ]},
    {h:"What it is for", kind:"facts", items:[
      {t:"Shows cell [[shape]] and size."},
      {t:"Uses [[no heat fixing|no heat fix|no heat|none]]."}
    ]},
    {h:"Procedure", kind:"steps", figs:[
      {type:"field", bg:"dark", seed:52, groups:[{shape:"coccus", arr:"chains", color:"clear", n:4}, {shape:"rod", arr:"single", color:"clear", n:6}], cap:"Clear cells on a dark background"}
    ], items:[
      {t:"Put a drop of [[nigrosine]] near one end of a slide.", why:"Nigrosine is the acidic dye."},
      {t:"Mix in a teeth scraping with a [[toothpick]].", why:"Your teeth scraping is the bacteria sample."},
      {t:"Push a [[spreader]] slide through the drop.", why:"This spreads a thin film across the slide."},
      {t:"Flame the edge of the spreader slide.", why:"It touched your sample."},
      {t:"Let it [[air dry|airdry|air-dry]] completely.", why:"No heat fixing in this stain."},
      {t:"View under [[oil|oil immersion]].", why:"Use the 100x oil immersion objective to see bacteria."}
    ]},
    {h:"Shapes", kind:"facts", items:[
      {t:"[[Coccus|cocci]]: sphere."},
      {t:"[[Bacillus|bacilli]]: rod."},
      {t:"[[Spirillum|spirilla]]: spiral."}
    ]},
    {h:"Arrangements", kind:"facts", items:[
      {t:"Diplo = [[pairs|pair|two]]: diplococci, diplobacilli."},
      {t:"Strepto = [[chains|chain]]: streptococci, streptobacilli."},
      {t:"Staphylo = [[clusters|cluster|grape-like clusters]]: staphylococci."},
      {t:"[[Tetrads|tetrad]]: cocci in groups of four."},
      {t:"[[Sarcinae|sarcina]]: cocci in cubes of eight."},
      {t:"[[Palisades|palisade]]: rods lined up side by side."}
    ]}
  ],
  problems:[
    {title:"Name the arrangement", prompt:"A new set of cells every time.", gen:"arr"}
  ]
});
