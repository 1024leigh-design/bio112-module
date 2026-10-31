/* Lab 1: Brightfield microscopy. Content from the BIO 112 lab manual and instructor slides (build brief).
   [[answer|other accepted answers]] marks a Test mode blank. */
VLAB.add({
  n:1, title:"Brightfield microscopy",
  learn:[
    {h:"Parts of the microscope", kind:"facts", figs:[{type:"microscope", cap:"Tap the Practice tab to explore each part."}], items:[
      {t:"The [[ocular|eyepiece|ocular lens]] (eyepiece) magnifies [[10x|10]]."},
      {t:"Objectives: [[4x|4]] scanning, 10x low power, [[40x|40]] high-dry, and [[100x|100]] oil immersion."},
      {t:"The [[revolving nosepiece|nosepiece]] holds the objectives."},
      {t:"The [[stage]] holds the slide. The mechanical stage control moves the slide."},
      {t:"The [[condenser]] has an iris diaphragm. The iris diaphragm controls how much light reaches the specimen."},
      {t:"The [[coarse]] focus knob makes big moves. The [[fine]] focus knob makes small moves."},
      {t:"The light source is in the base. The [[voltage]] control sets how bright it is."}
    ]},
    {h:"Total magnification", kind:"facts", items:[
      {t:"Total magnification = [[ocular|eyepiece]] × [[objective]]."},
      {t:"With the 10x ocular: 4x objective = [[40x|40]]. 10x = [[100x|100]]. 40x = [[400x|400]]. 100x = [[1000x|1000|1,000x|1,000]]."}
    ]},
    {h:"Using oil immersion", kind:"steps", items:[
      {t:"Find the specimen on the [[10x|10]] objective.", why:"Low power shows more of the slide, so the specimen is easier to find."},
      {t:"Swing the nosepiece the other way, past the [[4x|4]] objective.", why:"This way the 40x never passes through the oil."},
      {t:"Add a drop of [[oil|immersion oil]] to the slide.", why:"The 100x is the oil immersion objective. It is used with oil."},
      {t:"Click the [[100x|100]] objective into place.", why:"It lands in the drop of oil."},
      {t:"Focus with the [[fine]] focus knob only.", why:"On 100x the lens is very close to the slide."}
    ]},
    {h:"Rules for our lab", kind:"facts", items:[
      {t:"Use only the [[10x|10]] and [[100x|100]] objectives."},
      {t:"Never rotate through the [[40x|40]] after adding oil.", why:"The 40x is the high-dry objective. Keep oil off it."}
    ]},
    {h:"Which way does the image move?", kind:"facts", items:[
      {t:"The light path crosses, so the image is [[upside down|upside-down|inverted]] and [[reversed|backwards|backward]]."},
      {t:"Move the slide left, and the image moves [[right]]."}
    ]},
    {h:"Putting the microscope away", kind:"steps", items:[
      {t:"Remove the slide."},
      {t:"Turn the voltage to the [[lowest]] setting."},
      {t:"Turn the lamp [[off]]."},
      {t:"[[Center|centre]] the stage."},
      {t:"Put the condenser at its [[highest]] position."},
      {t:"Put the [[4x|4]] objective in place."},
      {t:"Wipe the oculars, the 10x, and the 100x. Get all the [[oil]] off."},
      {t:"Wrap the [[cord]]."},
      {t:"Put on the dust [[cover]]."},
      {t:"Return it to its [[numbered]] spot."}
    ]}
  ],
  practice:[
    {sim:"scope", title:"Parts of the microscope"},
    {sim:"slidemove", title:"Move the slide", prompt:"Drag the slide (or use the buttons). Watch which way the image moves."}
  ],
  problems:[
    {title:"Total magnification", prompt:"New numbers every time. Type your answer, then tap Check.", gen:"mag"}
  ]
});
