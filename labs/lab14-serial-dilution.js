/* Lab 14: Serial dilution and plate counts. Content from the build brief. */
VLAB.add({
  n:14, title:"Serial dilution and plate counts",
  learn:[
    /* ---------- tab 1 ---------- */
    {tab:"The tubes", banner:"Dilute step by step until a plate has a countable number of colonies.", top:[{type:"svg", name:"dilseries", wide:true, scroll:true}],
      lead:"Six tubes, one transfer at a time. Mix each tube well before you move liquid out of it.", kind:"steps", items:[
      {pic:{name:"xfer", from:"Culture", to:"A", add:0.1, water:9.9, c:"#1683cc", cloudy:true}, t:"<b>Culture to A:</b> move [[0.1|.1]] mL of the original culture into tube A, which has [[9.9]] mL of sterile water.", why:"0.1 ÷ (0.1 + 9.9) = 0.1 ÷ 10 = 1/100. Tube A is a 1/100 dilution of the culture."},
      {pic:{name:"xfer", from:"Tube A", to:"B", add:0.1, water:9.9, c:"#c2185b", cloudy:true}, t:"<b>A to B:</b> mix tube A. Move 0.1 mL from tube A into tube B, which has 9.9 mL of sterile water. Tube B is a [[1/100]] dilution of tube A.", why:"Same volumes as tube A: 0.1 ÷ 10 = 1/100."},
      {pic:{name:"xfer", from:"Tube B", to:"C", add:1, water:9, c:"#1f8a55", cloudy:true}, t:"<b>B to C:</b> mix tube B. Move [[1]] mL from tube B into tube C, which has [[9]] mL of sterile water.", why:"1 ÷ (1 + 9) = 1 ÷ 10 = 1/10. Tube C is a 1/10 dilution of tube B."},
      {pic:{name:"xfer", from:"Tube C", to:"D", add:1, water:9, c:"#a96c05"}, t:"<b>C to D:</b> mix tube C. Move 1 mL from tube C into tube D, which has 9 mL of sterile water. Tube D is a [[1/10]] dilution of tube C.", why:"1 ÷ 10 = 1/10."},
      {pic:{name:"xfer", from:"Tube D", to:"E", add:1, water:9, c:"#5a2a98"}, t:"<b>D to E:</b> mix tube D. Move 1 mL from tube D into tube E, which has 9 mL of sterile water.", why:"1 ÷ 10 = 1/10 again."},
      {pic:{name:"xfer", from:"Tube E", to:"F", add:1, water:9, c:"#e4572e"}, t:"<b>E to F:</b> mix tube E. Move 1 mL from tube E into tube F, which has 9 mL of sterile water.", why:"1 ÷ 10 = 1/10 again."}
    ]},
    {tab:"The tubes", h:"Then plate and incubate", layout:"cards", cols:2, items:[
      {big:"Plate", ico:{i:"pipette"}, t:"Plate [[100 µL|100|100ul|100 ul]] (0.1 mL) from each tube with a micropipette. Spread with a spreader dipped in [[isopropanol|isopropyl alcohol|alcohol]] and flamed between plates."},
      {big:"Incubate", ico:{i:"incub", c:"37°C"}, t:"Incubate the plates at [[37°C|37|37 c]]."}
    ]},
    {tab:"The tubes", h:"Where does the dilution factor come from?", review:"exp", figs:[{type:"svg", name:"dfone", a:0.1, w:9.9, wide:"mid", cap:"Tubes A and B"}, {type:"svg", name:"dfone", a:1, w:9, c:"#c2185b", wide:"mid", cap:"Tubes C, D, E, and F"}], items:[
      {t:"Dilution factor = volume added ÷ [[total volume|total]]."},
      {t:"Total volume = volume added + the [[water]].", why:"0.1 mL + 9.9 mL = 10 mL, not 9.9 mL."}
    ]},
    /* ---------- tab 2 ---------- */
    {tab:"Total dilution", banner:"Multiply the dilution factor of every tube along the way.", review:"exp", items:[
      {t:"Total dilution = [[multiply|multiplying]] the dilution factors of each tube."}
    ], sim:{sim:"dilchain", prompt:"Pick a tube. Tap <b>Next step</b> to see where each number comes from."}, tip:"Powers of 10? Add the exponents. 10<sup>-2</sup> × 10<sup>-2</sup> × 10<sup>-1</sup> = 10<sup>-5</sup>."},
    /* ---------- tab 3 ---------- */
    {tab:"Count + CFU", banner:"cells/mL = CFUs ÷ (total dilution × mL plated)", review:"exp", layout:"cards", items:[
      {big:"CFU", t:"[[Colony forming unit|colony-forming unit]]. One colony started from one live cell (or clump)."},
      {big:"&gt; 200", t:"More than [[200]] colonies = TNTC. Write \"&gt;200\" or \"TNTC\". Do [[not]] use that plate."},
      {big:"µL to mL", t:"Divide by [[1000|1,000]]. So 100 µL = [[0.1|.1]] mL."}
    ], sim:{sim:"cfucalc", prompt:"Pick a tube to plate. Then tap <b>Next step</b> to build the equation. Each color shows where a number comes from."}},
    /* ---------- tab 4 ---------- */
    {tab:"Common mistakes", banner:"Why might a plate give a different estimate?", lead:"Tap each <b>What if...?</b> to check yourself.", layout:"cards", cols:2, items:[
      {big:"Merged colonies", ico:{i:"count"}, t:"Colonies [[merged|merge]] or were too crowded to count.", whatif:[{q:"two colonies merge?", a:"They look like one colony. You count too few, so your estimate is too low."}]},
      {big:"Pipetting error", ico:{i:"pipette"}, t:"A [[pipetting|pipette]] error.", whatif:[{q:"you move 0.2 mL instead of 0.1 mL?", a:"About twice as many cells go into the next tube. Every plate after it has more colonies than it should."}]},
      {big:"Clumped cells", ico:{i:"plate"}, t:"Cells [[clumped|clump]] together.", whatif:[{q:"cells stay in clumps?", a:"A whole clump makes just one colony. You count too few, so your estimate is too low."}]},
      {big:"Not mixed", ico:{i:"tube", c:"#e3d29a"}, t:"Not [[mixed|mixing]] well between tubes.", whatif:[{q:"you skip mixing before a transfer?", a:"The cells are not spread evenly, so the 1 mL you move can carry too many or too few cells."}]},
      {big:"Contamination", ico:{i:"flame"}, t:"[[Contamination|contaminated]].", whatif:[{q:"a plate gets contaminated?", a:"Extra colonies grow that did not come from your culture, so your count is too high."}]}
    ]},
    {tab:"Common mistakes", h:"Math mistakes to watch for", layout:"cards", cols:2, items:[
      {big:"Forgot µL to mL", t:"Always change µL to mL before you divide.", whatif:[{q:"you use 100 instead of 0.1?", a:"Your answer comes out 1000 times too small."}]},
      {big:"Added instead of multiplied", t:"Multiply dilution factors. Never add them.", whatif:[{q:"you add 1/100 + 1/100?", a:"You get 2/100. The right total is 1/100 × 1/100 = 1/10,000."}]},
      {big:"Wrong total volume", t:"Total volume = added + water.", whatif:[{q:"you use 9.9 mL as the total?", a:"The total is 0.1 + 9.9 = 10 mL, so the factor is 1/100."}]},
      {big:"Used a TNTC plate", t:"Pick a plate you can count.", whatif:[{q:"you use a plate with more than 200 colonies?", a:"You cannot count it accurately. Use a plate with 200 or fewer colonies."}]}
    ]}
  ],
  practice:[
    {sim:"dilution", title:"Virtual dilution series", prompt:"Set the volumes, plate, then count colonies and calculate cells/mL.",
      hint1:"Tubes A and B: 9.9 mL water + 0.1 mL. Tubes C to F: 9 mL water + 1 mL.",
      tubes:[
        {name:"A", water:9.9, add:0.1, from:"Original culture"}, {name:"B", water:9.9, add:0.1, from:"Tube A"},
        {name:"C", water:9, add:1, from:"Tube B"}, {name:"D", water:9, add:1, from:"Tube C"},
        {name:"E", water:9, add:1, from:"Tube D"}, {name:"F", water:9, add:1, from:"Tube E"}]}
  ],
  problems:[
    {title:"Dilution factor for one tube", gen:"dilfactor"},
    {title:"Total dilution", gen:"totaldil"},
    {title:"µL and mL", gen:"ul2ml"},
    {title:"Choose the plate to use", gen:"reliable"},
    {title:"Calculate cells/mL", prompt:"Show your units.", gen:"cellsml"},
    {title:"Scientific notation warm-up", prompt:"Big numbers are easier in scientific notation.", gen:"sci"},
    {title:"A whole new dilution series", prompt:"Different volumes than our lab. Work tube by tube.", gen:"chain"},
    {title:"Work backward: how many colonies?", prompt:"Use the same formula, rearranged.", gen:"expected"}
  ]
});
