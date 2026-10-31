/* Lab 2: Microscopic measurements. Content from the build brief. */
VLAB.add({
  n:2, title:"Microscopic measurements",
    key:["Calibrate the ocular micrometer against the stage micrometer (1 stage space = 10 µm).", "µm per ocular space = (stage spaces × µm per stage space) ÷ ocular spaces.", "100x value = 10x value ÷ 10. Measure cells under 100x."],
  learn:[
    {h:"Why calibrate?", kind:"facts", items:[
      {t:"The ocular micrometer has [[no fixed units|no units|no set units]]."},
      {t:"You [[calibrate]] it against the stage micrometer."},
      {t:"In our lab, one stage micrometer space = [[10 µm|10|10um|10 micrometers]]."}
    ]},
    {h:"Calibrate at 10x", kind:"steps", figs:[{type:"svg", name:"micrometer", wide:true}],
      tip:"Turn stage spaces into µm first. Then divide by the ocular spaces.",
      examples:[
        {title:"our lab (10 µm per stage space)", steps:["From A to B: <b>5</b> ocular spaces match <b>2</b> stage spaces.", "Stage distance: 2 × 10 µm = <b>20 µm</b>.", "Divide by the ocular spaces: 20 µm ÷ 5 = <b>4 µm</b>."], answer:"1 ocular space = 4 µm at 10x"},
        {title:"a different stage scale (5 µm per space)", steps:["From A to B: <b>20</b> ocular spaces match <b>8</b> stage spaces.", "Stage distance: 8 × 5 µm = <b>40 µm</b>.", "40 µm ÷ 20 = <b>2 µm</b>."], answer:"1 ocular space = 2 µm at 10x"}],
      items:[
      {t:"Line up one stage line with one ocular line. This is point [[A]].", why:"You need a starting point where the two rulers match."},
      {t:"Find the next exact match. This is point [[B]].", why:"Between A and B, both rulers cover the same distance."},
      {t:"Count the [[ocular]] spaces and the [[stage]] spaces between A and B."},
      {t:"µm per ocular space = (stage spaces × µm per stage space) ÷ [[ocular spaces|ocular]].", why:"The stage spaces tell you the real distance. Divide it among the ocular spaces."}
    ]},
    {h:"Calibrate for 100x", kind:"facts",
      examples:[{steps:["At 10x, 1 ocular space = <b>4 µm</b>.", "Divide by 10: 4 ÷ 10 = <b>0.4</b>."], answer:"1 ocular space = 0.4 µm at 100x"}],
      items:[
      {t:"100x calibration = 10x value ÷ [[10|ten]].", why:"We do not put the stage micrometer under the 100x. It would need oil on the stage micrometer."}
    ]},
    {h:"Measure cells", kind:"facts", figs:[{type:"svg", name:"measure", wide:true}],
      tip:"Count the ocular spaces the cell covers. Multiply by the <b>100x</b> value, not the 10x value.",
      examples:[
        {title:"a coccus", steps:["Use the 100x value: <b>0.4 µm</b> per space.", "The coccus covers <b>2</b> ocular spaces.", "2 × 0.4 = <b>0.8 µm</b>."], answer:"Diameter = 0.8 µm"},
        {title:"a bacillus", steps:["Use the 100x value: <b>0.4 µm</b> per space.", "Length: <b>4</b> spaces × 0.4 = <b>1.6 µm</b>.", "Width: <b>1</b> space × 0.4 = <b>0.4 µm</b>."], answer:"1.6 µm long, 0.4 µm wide"}],
      items:[
      {t:"Always measure cells under [[100x|100]]."},
      {t:"Cocci: measure the [[diameter]]."},
      {t:"Bacilli: measure the [[length]] and the [[width]]."}
    ]}
  ],
  practice:[
    {sim:"micrometer", title:"Calibrate the ocular micrometer", prompt:"Find point A, find point B, then count the spaces."}
  ],
  problems:[
    {title:"Calibrate at 10x", prompt:"The stage scale changes. Think about what one stage space means.", gen:"cal10"},
    {title:"Convert to 100x", gen:"to100"},
    {title:"Measure a cell", gen:"measure"},
    {title:"All three steps in one", prompt:"Calibrate, convert to 100x, then measure. Just like in lab.", gen:"fullcal"}
  ]
});
