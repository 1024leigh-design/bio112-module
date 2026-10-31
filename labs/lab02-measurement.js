/* Lab 2: Microscopic measurements. Content from the build brief. */
VLAB.add({
  n:2, title:"Microscopic measurements",
  learn:[
    {h:"Why calibrate?", kind:"facts", items:[
      {t:"The ocular micrometer has [[no fixed units|no units|no set units]]."},
      {t:"You [[calibrate]] it against the stage micrometer."},
      {t:"In our lab, one stage micrometer space = [[10 µm|10|10um|10 micrometers]]."}
    ]},
    {h:"Calibrate at 10x", kind:"steps", items:[
      {t:"Line up one stage line with one ocular line. This is point [[A]].", why:"You need a starting point where the two rulers match."},
      {t:"Find the next exact match. This is point [[B]].", why:"Between A and B, both rulers cover the same distance."},
      {t:"Count the [[ocular]] spaces and the [[stage]] spaces between A and B."},
      {t:"µm per ocular space = (stage spaces × µm per stage space) ÷ [[ocular spaces|ocular]].", why:"The stage spaces tell you the real distance. Divide it among the ocular spaces."}
    ]},
    {h:"Calibrate for 100x", kind:"facts", items:[
      {t:"100x calibration = 10x value ÷ [[10|ten]].", why:"We do not put the stage micrometer under the 100x. It would need oil on the stage micrometer."}
    ]},
    {h:"Measure cells", kind:"facts", items:[
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
    {title:"Measure a cell", gen:"measure"}
  ]
});
