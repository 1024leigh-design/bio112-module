/* Lab 11: Motility. Content from the build brief. */
VLAB.add({
  n:11, title:"Motility",
    key:["Stab 2/3 of the way down the center. 37°C for at least 2 days.", "Tetrazolium turns red where bacteria grow.", "Sharp red line = nonmotile. Cloudy red spread = motile."],
  learn:[
    {h:"The medium", kind:"facts", items:[
      {t:"[[Semisolid|semi-solid]] medium with [[tetrazolium]] salt."},
      {t:"Bacteria turn the colorless salt into an insoluble [[red]] product. Growth shows up red."}
    ]},
    {h:"Procedure", kind:"steps", figs:[{type:"svg", name:"stab", cap:"Stab 2/3 of the way down"}], items:[
      {t:"Stab with a [[needle]] [[2/3|two thirds|two-thirds|2 3]] of the way down the center of the tube."},
      {t:"Incubate at [[37°C|37|37 c]] for at least [[2 days|2|two days|two]]."}
    ]},
    {h:"Results", kind:"facts", tip:"Sharp line = stayed put = nonmotile. Fuzzy red cloud = swam away = motile.", figs:[
      {type:"tube", kind:"semisolid", medium:"#f4ecd2", growth:"nonmotile", capc:"#3f7bd1", cap:"Nonmotile"},
      {type:"tube", kind:"semisolid", medium:"#f4ecd2", growth:"motile", capc:"#3f7bd1", cap:"Motile"}
    ], items:[
      {t:"<b>Nonmotile</b> (<i>S. aureus</i>): sharp red line only along the [[stab]]."},
      {t:"<b>Motile</b> (<i>Proteus mirabilis</i>): [[cloudy]] red growth spreading away from the stab."}
    ]}
  ],
  practice:[
    {sim:"motility", title:"Grow a motility tube", prompt:"Inoculate, incubate, then read the tube.",
      stabQ:{q:"How do you inoculate the motility tube?", opts:["Stab with a needle 2/3 of the way down the center", "Stab with a needle all the way to the bottom", "Streak a loop across the surface", "Stab along the side of the tube"], a:0, why:"Stab 2/3 of the way down the center."},
      incQ:{q:"How do you incubate it?", opts:["37°C for at least 2 days", "37°C for 1 hour", "Room temperature for 15 minutes", "In the refrigerator overnight"], a:0, why:"37°C for at least 2 days."},
      orgs:[
        {name:"Staphylococcus aureus", motile:false, why:"A sharp red line only along the stab means nonmotile. This was <i>S. aureus</i>."},
        {name:"Proteus mirabilis", motile:true, why:"Cloudy red growth spreading away from the stab means motile. This was <i>Proteus mirabilis</i>."}]}
  ]
});
