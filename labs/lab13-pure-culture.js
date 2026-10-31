/* Lab 13: Pure culture techniques. Content from the build brief.
   TODO (CONFIRM with instructor): how students tell Serratia marcescens apart from Bacillus megaterium on
   our 37°C plates. Both can look white at 37°C. Do not fill this in until the instructor confirms. */
(function(){
  const SERRATIA_TODO = "CONFIRM how students tell <i>Serratia marcescens</i> apart from <i>Bacillus megaterium</i> on our 37°C plates (both can look white at 37°C).";
  VLAB.add({
    n:13, title:"Pure culture techniques",
    learn:[
      {h:"Key words", kind:"facts", items:[
        {t:"<b>Pure culture:</b> [[one|1|one kind]] kind of organism."},
        {t:"<b>Mixed culture:</b> [[more than one|2 or more|many]] kind."},
        {t:"<b>Colony:</b> a visible mass of cells grown from [[one cell|one|1|a single cell|1 cell]]."}
      ]},
      {h:"Our mixed culture", kind:"facts", todo:SERRATIA_TODO, items:[
        {t:"<i>Serratia marcescens</i>: [[red]] at room temperature, [[white]] at 37°C.", why:"It makes its red pigment at room temperature, not at 37°C."},
        {t:"<i>Micrococcus luteus</i>: [[yellow]]."},
        {t:"<i>Bacillus megaterium</i>: [[white]]."}
      ]},
      {h:"Streak methods", kind:"facts", items:[
        {t:"Four streak methods: [[quadrant]], radiant, T streak, and continuous."},
        {t:"Flame the loop between areas, except in the [[continuous]] streak."}
      ]},
      {h:"Day by day", kind:"steps", items:[
        {t:"<b>Day 1:</b> streak the mixed culture on a plate. Incubate at [[37°C|37|37 c]]."},
        {t:"<b>Day 2:</b> pick an [[isolated]] colony with a sterile [[needle]]. Subculture it to a [[slant]].", why:"An isolated colony grew from one cell, so it is one kind of organism."},
        {t:"<b>Day 3:</b> [[Gram stain|gram]] each slant to check purity.", why:"One cell type = pure. More than one = contaminated."}
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
        todo:"Check that the four example drawings match the lab manual figures, especially the radiant streak.",
        patterns:[
          {id:"quadrant", name:"Quadrant", how:"Four areas. Flame the loop between areas. Pull from the last area into the next one.", check:"Four areas? Did each area start in the one before it?"},
          {id:"radiant", name:"Radiant", how:"Put the sample in one area near the edge. Flame the loop. Streak lines out from that area.", check:"Do your lines spread out from the first area?"},
          {id:"tstreak", name:"T streak", how:"A T splits the plate into three sections. Flame the loop between sections. Pull from the last section into the next one.", check:"Three sections? Did each section start in the one before it?"},
          {id:"continuous", name:"Continuous", how:"One streak back and forth across the whole plate. Do not flame between areas.", check:"One unbroken streak that covers the plate?"}
        ]},
      {sim:"pick", title:"Pick an isolated colony", prompt:"Day 2: pick a colony. Day 3: Gram stain your slant and check if it is pure.",
        todo:SERRATIA_TODO,
        orgs:{
          sm:{name:"Serratia marcescens", colony:"white", colonyName:"white", shape:"shortrod", gram:"pink", cells:"short pink rods"},
          ml:{name:"Micrococcus luteus", colony:"yellow", colonyName:"yellow", shape:"coccus", gram:"purple", cells:"purple cocci"},
          bm:{name:"Bacillus megaterium", colony:"white", colonyName:"white", shape:"longrod", gram:"purple", cells:"long purple rods"}}}
    ]
  });
})();
