/* Lab 8: Gram staining. Content from the build brief. */
(function(){
  const F = (shape, arr, color, seed, cap) => ({type:"field", seed, cap, groups:[{shape, arr, color, n:arr === "clusters" ? 6 : 10}]});
  VLAB.add({
    n:8, title:"Gram staining",
    learn:[
      {h:"Procedure", kind:"steps", items:[
        {t:"Start with a heat fixed smear (5 passes through the flame)."},
        {t:"Crystal violet for [[1 minute|1 min|1|one minute|60 seconds]]. Rinse.", why:"Primary stain: every cell turns purple."},
        {t:"Gram's [[iodine]] for 1 minute. Rinse with water.", why:"Mordant: forms the crystal violet-iodine complex."},
        {t:"[[95% ethanol|95 ethanol|ethanol|alcohol|95% alcohol]] until it runs clear (about 10 to 20 seconds). Rinse.", why:"Decolorizer: gram negative cells lose the crystal violet."},
        {t:"[[Safranin]] for [[20 seconds|20 sec|20]]. Rinse, blot.", why:"Counterstain: the colorless gram negative cells turn pink."}
      ]},
      {h:"The four reagents", kind:"facts", items:[
        {t:"Primary stain: [[crystal violet]]."},
        {t:"Mordant: [[iodine|gram's iodine|grams iodine]]."},
        {t:"Decolorizer: [[ethanol|95% ethanol|alcohol]]."},
        {t:"Counterstain: [[safranin]]."}
      ]},
      {h:"Why the colors are different", kind:"facts", items:[
        {t:"<b>Gram positive:</b> [[thick]] peptidoglycan. Keeps the crystal violet-iodine complex. [[Purple]]."},
        {t:"<b>Gram negative:</b> [[thin]] peptidoglycan plus an [[outer membrane]]. Loses the crystal violet. Picks up safranin. [[Pink]]."},
        {t:"Gram negative cells are harder to kill with many antibiotics and disinfectants. The [[outer membrane]] is a barrier."},
        {t:"Most reliable on [[16 to 24|16-24|16 24]] hour cultures."}
      ]},
      {h:"Our controls", kind:"facts", figs:[
        F("coccus", "clusters", "purple", 81, "<i>S. aureus</i>"), F("longrod", "single", "purple", 82, "<i>B. megaterium</i>"),
        F("shortrod", "single", "pink", 83, "<i>E. coli</i>"), F("taper", "single", "purple", 84, "<i>M. smegmatis</i>")
      ], items:[
        {t:"<i>S. aureus</i>: [[purple]] cocci."},
        {t:"<i>B. megaterium</i>: purple long rods. Can look gram-variable, but counted as gram [[positive]]."},
        {t:"<i>E. coli</i>: [[pink]] short rods."},
        {t:"<i>Mycobacterium smegmatis</i>: purple rods with [[tapered]] ends."}
      ]}
    ],
    practice:[
      {sim:"stain", title:"Virtual Gram stain", prompt:"Pick a smear. Then pick the next reagent and the time. Watch the slide change.",
        startMsg:"Your smear is heat fixed and ready. Pick the first reagent.",
        orgs:[
          {id:"sa", name:"<i>S. aureus</i>", shape:"coccus", arr:"clusters", type:"gp", n:6},
          {id:"bm", name:"<i>B. megaterium</i>", shape:"longrod", type:"gp"},
          {id:"ec", name:"<i>E. coli</i>", shape:"shortrod", type:"gn", n:11},
          {id:"ms", name:"<i>M. smegmatis</i>", shape:"taper", type:"gp", n:11}],
        palette:[
          {id:"cv", label:"Crystal violet", c:"#5a2a98"}, {id:"iodine", label:"Gram's iodine", c:"#8a5a1a"}, {id:"etoh", label:"95% ethanol", c:"#c9dbee"},
          {id:"saf", label:"Safranin", c:"#d8456b"}, {id:"rinse", label:"Rinse with water", c:"#9fd1f0"}, {id:"blot", label:"Blot dry", c:"#f3efe2"},
          {id:"mb", label:"Methylene blue", c:"#2a4fb0"}, {id:"mg", label:"Malachite green", c:"#2f9e4f"}, {id:"cf", label:"Carbolfuchsin", c:"#c2185b"}],
        distract:{
          mb:"Methylene blue is not part of the Gram stain. It is the simple stain (Lab 7) and the acid-fast counterstain (Lab 10).",
          mg:"Malachite green is not part of the Gram stain. It is the endospore stain (Lab 9).",
          cf:"Carbolfuchsin is not part of the Gram stain. It is the acid-fast stain (Lab 10)."},
        steps:[
          {r:"cv", label:"Crystal violet", time:"1 minute", times:["20 seconds", "1 minute", "2 minutes", "10 minutes"], show:{gp:"purple", gn:"purple"}, why:"Primary stain: every cell is purple now.", timeWhy:"Check the protocol: crystal violet stays on for 1 minute."},
          {r:"rinse", label:"Rinse with water", hint:"Rinse off the crystal violet first."},
          {r:"iodine", label:"Gram's iodine", time:"1 minute", times:["20 seconds", "1 minute", "15 minutes"], why:"Mordant: it forms the crystal violet-iodine complex. Cells stay purple.", timeWhy:"Check the protocol: Gram's iodine stays on for 1 minute."},
          {r:"rinse", label:"Rinse with water", hint:"Rinse off the iodine before you decolorize."},
          {r:"etoh", label:"95% ethanol", time:"Until it runs clear (about 10 to 20 seconds)", times:["Until it runs clear (about 10 to 20 seconds)", "2 minutes", "10 minutes"], show:{gn:"unstained"}, why:"Decolorizer: gram negative cells lose the crystal violet and turn colorless.", timeWhy:"Too long pulls the color out of gram positive cells too. Stop when it runs clear."},
          {r:"rinse", label:"Rinse with water", hint:"Stop the decolorizer with water."},
          {r:"saf", label:"Safranin", time:"20 seconds", times:["20 seconds", "2 minutes", "15 minutes"], show:{gn:"pink"}, why:"Counterstain: colorless gram negative cells turn pink. Gram positive cells stay purple.", timeWhy:"Check the protocol: safranin stays on for 20 seconds."},
          {r:"rinse", label:"Rinse with water", hint:"Rinse off the safranin."},
          {r:"blot", label:"Blot dry", hint:"The last step dries the slide."}],
        result:{
          sa:"<i>S. aureus</i>: purple cocci. Gram positive.",
          bm:"<i>B. megaterium</i>: purple long rods. Gram positive.",
          ec:"<i>E. coli</i>: pink short rods. Gram negative.",
          ms:"<i>M. smegmatis</i>: purple rods with tapered ends."}}
    ],
    mistakes:{items:[
      {name:"Decolorizing too long", wrong:F("coccus", "clusters", "pink", 85), right:F("coccus", "clusters", "purple", 85),
        see:"<i>S. aureus</i>, a gram positive, looks pink.", opts:["Too much ethanol pulled the crystal violet out of the gram positive cells", "The iodine was left on too long", "Safranin is stronger than crystal violet", "The cells were gram negative all along"], a:0,
        why:"Too much ethanol pulls the crystal violet out of gram positive cells too. Then safranin turns them pink."},
      {name:"Decolorizing too short", wrong:F("shortrod", "single", "purple", 86), right:F("shortrod", "single", "pink", 86),
        see:"<i>E. coli</i>, a gram negative, looks purple.", opts:["Not enough ethanol: the gram negative cells kept the crystal violet", "The safranin was left on too long", "The smear was not heat fixed", "<i>E. coli</i> has thick peptidoglycan"], a:0,
        why:"The ethanol did not have time to remove the crystal violet from the gram negative cells."},
      {name:"Skipping the iodine", wrong:F("coccus", "clusters", "pink", 87), right:F("coccus", "clusters", "purple", 87),
        see:"<i>S. aureus</i>, a gram positive, may look pink.", opts:["No mordant, so no crystal violet-iodine complex to hold the color", "Iodine is the counterstain", "Iodine kills the cells", "Without iodine, the safranin cannot work"], a:0,
        why:"Iodine is the mordant. Without the crystal violet-iodine complex, the ethanol can wash the crystal violet out of gram positive cells."},
      {name:"Using an old culture", wrong:F("longrod", "single", "pink", 88), right:F("longrod", "single", "purple", 88),
        see:"<i>B. megaterium</i>, a gram positive, may stain pink.", opts:["Gram stains are most reliable on 16 to 24 hour cultures", "Old cultures have more safranin", "Old cells are bigger", "Old cultures cannot be heat fixed"], a:0,
        why:"Use a 16 to 24 hour culture. In an old culture, gram positive cells may stain pink."}
    ]}
  });
})();
