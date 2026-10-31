/* Lab 10: Acid-fast staining (Kinyoun method). Content from the build brief. */
(function(){
  const sa = c => ({type:"field", seed:101, groups:[{shape:"coccus", arr:"clusters", color:c, n:6}]});
  const ms = c => ({type:"field", seed:102, groups:[{shape:"taper", arr:"single", color:c, n:11}]});
  VLAB.add({
    n:10, title:"Acid-fast staining",
    key:["Mycolic acid makes cells acid-fast (<i>Mycobacterium</i>, <i>Nocardia</i>).", "Kinyoun: concentrated carbolfuchsin, 10 minutes, no heat. Ziehl-Neelsen uses heat.", "Acid-fast = fuchsia. Non-acid-fast = blue."],
    learn:[
      {h:"What makes a cell acid-fast", kind:"facts", items:[
        {t:"[[Mycolic acid]] (a waxy lipid) in the cell wall."},
        {t:"Acid-fast genera: [[Mycobacterium]] and [[Nocardia]]."}
      ]},
      {h:"Kinyoun method (the one we use)", kind:"steps", top:[{type:"strip", steps:[{i:"flame", t:"Heat fix", s:"5 passes"}, {i:"bottle", c:"#e0157f", t:"Carbolfuchsin", s:"10 min, NO heat"}, {i:"waste", t:"Rinse", s:"into waste beaker"}, {i:"bottle", c:"#f0d6e2", t:"Acid-alcohol", s:"until no color"}, {i:"bottle", c:"#2f63c4", t:"Methylene blue", s:"30 s, rinse"}, {i:"dry", t:"Air dry", s:"do not blot"}]}], figs:[{type:"svg", name:"stainstrip", wide:true, cap:"What each cell looks like after each step", cols:[["Carbolfuchsin", "10 min"], ["Acid-alcohol", "until clear"], ["Methylene blue", "30 s"]], rows:[{name:"Acid-fast", sub:"M. smegmatis", shape:"taper", colors:["fuchsia", "fuchsia", "fuchsia"]}, {name:"Non-acid-fast", sub:"S. aureus", shape:"coccus", arr:"clusters", colors:["fuchsia", "unstained", "blue"]}]}], items:[
        {t:"Heat fix the smear: [[5|five]] passes through the flame."},
        {t:"Flood with Kinyoun [[carbolfuchsin]] for [[10 minutes|10 min|10]], with [[no heat|no|none]].", why:"Kinyoun carbolfuchsin is more concentrated, so it does not need heat."},
        {t:"Keep the smear covered. Never let it [[dry|dry out]].", why:"A dried smear gives a false positive."},
        {t:"Rinse into the [[waste beaker|waste]]."},
        {t:"Decolorize with [[acid-alcohol|acid alcohol]] until no more color drains off.", why:"Non-acid-fast cells lose the carbolfuchsin."},
        {t:"Rinse."},
        {t:"[[Methylene blue]] for [[30 seconds|30 sec|30]].", why:"Counterstain: non-acid-fast cells turn blue."},
        {t:"Rinse. [[Air dry|air-dry|airdry]]. Do not blot."}
      ]},
      {h:"Kinyoun vs Ziehl-Neelsen", lead:"Know this one!", kind:"facts", figs:[{type:"svg", name:"kinyounzn", wide:true}], items:[
        {t:"Kinyoun carbolfuchsin is [[more concentrated|concentrated]] and needs [[no heat|none|no]]."},
        {t:"[[Ziehl-Neelsen|ziehl neelsen|zn]] uses heat (a hot plate) to drive the carbolfuchsin into the waxy cell wall."}
      ]},
      {h:"Results", kind:"facts", figs:[
        Object.assign(ms("fuchsia"), {cap:"<i>M. smegmatis</i>: acid-fast"}), Object.assign(sa("blue"), {cap:"<i>S. aureus</i>: non-acid-fast"})
      ], items:[
        {t:"Acid-fast: [[fuchsia|hot pink|pink]] (hot pink)."},
        {t:"Non-acid-fast: [[blue]]."},
        {t:"Controls: <i>M. smegmatis</i> is the [[positive|acid-fast|acid fast]] control. <i>S. aureus</i> is the [[negative|non-acid-fast|non acid fast]] control."}
      ]}
    ],
    mistakes:{items:[
      {name:"Letting the carbolfuchsin dry out", wrong:sa("fuchsia"), right:sa("blue"),
        see:"<i>S. aureus</i> (non-acid-fast) looks fuchsia.", q:"What kind of error is this?",
        opts:["A false positive: letting the carbolfuchsin dry out", "A false negative: the stain never got in", "The methylene blue was skipped", "<i>S. aureus</i> is acid-fast"], a:0,
        why:"Keep the smear covered with carbolfuchsin. Never let it dry. If it dries, you get a false positive."},
      {name:"Decolorizing too briefly", wrong:sa("fuchsia"), right:sa("blue"),
        see:"<i>S. aureus</i> (non-acid-fast) looks fuchsia.", q:"Why did this happen? What kind of error is it?",
        opts:["False positive: the acid-alcohol did not remove the carbolfuchsin", "False negative: too much acid-alcohol", "The smear was heat fixed too long", "Methylene blue turned the cells pink"], a:0,
        why:"Decolorize until no more color drains off. Too short leaves non-acid-fast cells fuchsia."},
      {name:"Decolorizing too long", wrong:ms("blue"), right:ms("fuchsia"),
        see:"<i>M. smegmatis</i> (acid-fast) looks blue.", q:"Why did this happen? What kind of error is it?",
        opts:["False negative: too much acid-alcohol removed the carbolfuchsin from acid-fast cells", "False positive: not enough acid-alcohol", "The carbolfuchsin dried out", "<i>M. smegmatis</i> has no mycolic acid"], a:0,
        why:"Stop when no more color drains off. Too long and even acid-fast cells lose the carbolfuchsin and pick up methylene blue."}
    ]}
  });
})();
