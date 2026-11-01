/* Lab 7: Simple staining. Content from the build brief. */
VLAB.add({
  n:7, title:"Simple staining",
  learn:[
    {h:"What a simple stain does", kind:"facts", items:[
      {t:"Uses [[one|1]] basic dye: [[methylene blue]]."},
      {t:"Shows cell [[shape]], size, and arrangement."}
    ]},
    {h:"Procedure", kind:"steps", items:[
      {t:"Start with a heat fixed smear (5 passes through the flame).", why:"See Lab 6."},
      {t:"Flood with methylene blue for [[2 minutes|2 min|2|two minutes]].", why:"The basic dye sticks to the negatively charged cells."},
      {t:"Rinse until the runoff is [[clear]].", why:"This removes extra dye."},
      {t:"[[Blot]] dry."},
      {t:"View on [[10x|10]], then on [[100x|100]] with oil."}
    ]},
    {h:"Our organisms", kind:"facts", figs:[
      {type:"field", seed:71, groups:[{shape:"coccus", arr:"clusters", color:"blue", n:6}], cap:"<i>S. aureus</i>: blue cocci"},
      {type:"field", seed:72, groups:[{shape:"longrod", arr:"single", color:"blue", n:9}], cap:"<i>B. megaterium</i>: blue rods"}
    ], items:[
      {t:"<i>Staphylococcus aureus</i>, from a [[broth]]."},
      {t:"<i>Bacillus megaterium</i>, from a [[slant]]."}
    ]},
    {h:"Two shapes in a pure culture?", kind:"facts", items:[
      {t:"The bacteria may be [[pleomorphic]]."},
      {t:"Or free [[endospores|spores|endospore]] may look like cocci."},
      {t:"An [[endospore]] stain can check."}
    ]}
  ]
});
