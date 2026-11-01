/* Lab 13: Pure culture techniques. Content from the build brief.
   Instructor: one plate, incubated at room temperature for one day, then moved to 37°C.
   Students tell the three organisms apart by colony color. */
(function(){
  VLAB.add({
    n:13, title:"Pure culture techniques",
    learn:[
      {h:"Key words", kind:"facts", items:[
        {t:"<b>Pure culture:</b> [[one|1|one kind]] kind of organism."},
        {t:"<b>Mixed culture:</b> [[more than one|2 or more|many]] kind."},
        {t:"<b>Colony:</b> a visible mass of cells grown from [[one cell|one|1|a single cell|1 cell]]."}
      ]},
      {h:"Our mixed culture", kind:"facts", figs:[{type:"svg", name:"rt37", wide:true}], lead:"Tell the three apart by colony color.", items:[
        {t:"<i>Serratia marcescens</i>: [[red]] at room temperature, [[white]] at 37°C.", why:"It makes its red pigment at room temperature, not at 37°C."},
        {t:"<i>Micrococcus luteus</i>: [[yellow]]."},
        {t:"<i>Bacillus megaterium</i>: [[white]]."}
      ]},
      {h:"Streak methods", kind:"facts", figs:[{type:"streak", id:"quadrant", cap:"Quadrant"}, {type:"streak", id:"radiant", cap:"Radiant"}, {type:"streak", id:"tstreak", cap:"T streak"}, {type:"streak", id:"continuous", cap:"Continuous"}], items:[
        {t:"Four streak methods: [[quadrant]], radiant, T streak, and continuous."},
        {t:"Flame the loop between areas, except in the [[continuous]] streak."}
      ]},
      {h:"Step by step", kind:"steps", top:[{type:"strip", steps:[{i:"plate", t:"Streak", s:"mixed culture, 1 plate"}, {i:"incub", c:"RT", t:"Room temp", s:"1 day"}, {i:"incub", c:"37°C", t:"Then 37°C"}, {i:"needle", t:"Isolated colony", s:"to a slant"}, {i:"slide", c:"#5a2a98", t:"Gram stain", s:"pure?"}]}], items:[
        {t:"Streak the mixed culture on [[one|1]] plate."},
        {t:"Incubate at [[room temperature|rt|room temp]] for one day. Then move it to [[37°C|37|37 c]].", why:"<i>S. marcescens</i> makes its red pigment at room temperature, so you can tell it apart by color."},
        {t:"Pick an [[isolated]] colony with a sterile [[needle]]. Subculture it to a [[slant]].", why:"An isolated colony grew from one cell, so it is one kind of organism."},
        {t:"[[Gram stain|gram]] each slant to check purity.", why:"One cell type = pure. More than one = contaminated."}
      ]},
      {h:"Expected Gram stain results", kind:"facts", figs:[
        {type:"field", seed:131, groups:[{shape:"shortrod", arr:"single", color:"pink", n:11}], cap:"<i>S. marcescens</i>"},
        {type:"field", seed:132, groups:[{shape:"coccus", arr:"single", color:"purple", n:12}], cap:"<i>M. luteus</i>"},
        {type:"field", seed:133, groups:[{shape:"longrod", arr:"single", color:"purple", n:9}], cap:"<i>B. megaterium</i>"}
      ], items:[
        {t:"<i>S. marcescens</i>: short [[pink]] rods."},
        {t:"<i>M. luteus</i>: [[purple]] cocci."},
        {t:"<i>B. megaterium</i>: long [[purple]] rods."}
      ]},
      {h:"Pour plate (Learn only: we did not run this lab)", kind:"facts", items:[
        {t:"A diluted sample is mixed into [[molten agar|melted agar]], then poured."},
        {t:"Some colonies grow [[inside|in]] the agar and cannot be picked."}
      ]}
    ],
    practice:[
      {sim:"streak", title:"Draw the four streak patterns", prompt:"Pick a pattern. Draw it on the plate. Then compare it to the example.",
        patterns:[
          {id:"quadrant", name:"Quadrant", how:"Four areas. Flame the loop between areas. Pull from the last area into the next one.", check:"Four areas? Did each area start in the one before it?"},
          {id:"radiant", name:"Radiant", how:"Draw one line across the plate first. Flame the loop. Then streak lines out from that line.", check:"Did you start with one line across? Do your lines spread out from it?"},
          {id:"tstreak", name:"T streak", how:"A T splits the plate into three sections. Flame the loop between sections. Pull from the last section into the next one.", check:"Three sections? Did each section start in the one before it?"},
          {id:"continuous", name:"Continuous", how:"One streak back and forth across the whole plate. Do not flame between areas.", check:"One unbroken streak that covers the plate?"}
        ]},
      {sim:"pick", title:"Pick an isolated colony", prompt:"Colors: red = <i>S. marcescens</i>, yellow = <i>M. luteus</i>, white = <i>B. megaterium</i>. Pick a colony, subculture it to a slant, then Gram stain it.",
        orgs:{
          sm:{name:"Serratia marcescens", colony:"#d23b3b", colonyName:"red", shape:"shortrod", gram:"pink", cells:"short pink rods"},
          ml:{name:"Micrococcus luteus", colony:"yellow", colonyName:"yellow", shape:"coccus", gram:"purple", cells:"purple cocci"},
          bm:{name:"Bacillus megaterium", colony:"white", colonyName:"white", shape:"longrod", gram:"purple", cells:"long purple rods"}}}
    ]
  });
})();
