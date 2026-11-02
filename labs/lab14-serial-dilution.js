/* Lab 14: Serial dilution and plate counts. Content from the build brief. */
VLAB.add({
  n:14, title:"Serial dilution and plate counts",
  learn:[
    /* ---------- tab 1: protocol ---------- */
    {tab:"Protocol", h:"Words to know first", layout:"cards", cols:"5", items:[
      {big:"Inoculum", t:"The original culture: the cells you start with and want to count."},
      {big:"CFU", t:"Colony forming unit. One colony on a plate. Each colony grew from one live cell (or a clump of cells)."},
      {big:"Individual dilution factor", t:"How much one tube dilutes what you put into it. 1/10 means 10 times more dilute than the tube before it."},
      {big:"Total dilution factor", t:"How dilute a tube is compared with the original culture, after every tube before it."},
      {big:"Inoculum concentration", t:"How many live cells are in each mL of the original culture. Units: <b>cells/mL</b>."}
    ]},
    {tab:"Protocol", h:"Protocol, step by step", banner:"Dilute step by step until a plate has a countable number of colonies.", top:[{type:"svg", name:"dilseries", wide:true, scroll:true}],
      lead:"Six tubes, one transfer at a time. Mix each tube well before you move liquid out of it. Use a new tip for every transfer.", kind:"steps", items:[
      {pic:{name:"xfer", from:"Culture", to:"A", add:0.1, water:9.9, c:"#1683cc", cloudy:true}, t:"<b>Culture to A:</b> move [[0.1|.1]] mL of the original culture into tube A, which has [[9.9]] mL of sterile water.", why:"Tube A is a 1/100 dilution of the culture. $$\\frac{0.1}{0.1 + 9.9} = \\frac{0.1}{10} = \\frac{1}{100}$$"},
      {pic:{name:"xfer", from:"Tube A", to:"B", add:0.1, water:9.9, c:"#c2185b", cloudy:true}, t:"<b>A to B:</b> mix tube A. Move 0.1 mL from tube A into tube B, which has 9.9 mL of sterile water. Tube B is a [[1/100]] dilution of tube A.", why:"Same volumes as tube A. $$\\frac{0.1}{10} = \\frac{1}{100}$$"},
      {pic:{name:"xfer", from:"Tube B", to:"C", add:1, water:9, c:"#1f8a55", cloudy:true}, t:"<b>B to C:</b> mix tube B. Move [[1]] mL from tube B into tube C, which has [[9]] mL of sterile water.", why:"Tube C is a 1/10 dilution of tube B. $$\\frac{1}{1 + 9} = \\frac{1}{10}$$"},
      {pic:{name:"xfer", from:"Tube C", to:"D", add:1, water:9, c:"#a96c05"}, t:"<b>C to D:</b> mix tube C. Move 1 mL from tube C into tube D, which has 9 mL of sterile water. Tube D is a [[1/10]] dilution of tube C.", why:"Same volumes as tube C. $$\\frac{1}{1 + 9} = \\frac{1}{10}$$"},
      {pic:{name:"xfer", from:"Tube D", to:"E", add:1, water:9, c:"#5a2a98"}, t:"<b>D to E:</b> mix tube D. Move 1 mL from tube D into tube E, which has 9 mL of sterile water.", why:"Same volumes again. $$\\frac{1}{1 + 9} = \\frac{1}{10}$$"},
      {pic:{name:"xfer", from:"Tube E", to:"F", add:1, water:9, c:"#e4572e"}, t:"<b>E to F:</b> mix tube E. Move 1 mL from tube E into tube F, which has 9 mL of sterile water.", why:"Same volumes again. $$\\frac{1}{1 + 9} = \\frac{1}{10}$$"},
      {t:"<b>Plate:</b> pipette [[100 µL|100|100ul|100 ul]] (0.1 mL) from each tube onto its own plate. Spread with a spreader dipped in [[isopropanol|isopropyl alcohol|alcohol]] and flamed between plates.", afterFig:{type:"svg", name:"platecols"}, afterWide:true},
      {t:"<b>Incubate</b> the plates at [[37°C|37|37 c]]."}
    ]},
    /* ---------- tab 2: dilution factors ---------- */
    {tab:"Dilution factors", h:"Individual dilution factor: one tube", review:"exp", figs:[{type:"svg", name:"dfone", a:0.1, w:9.9, from:"Tube A", to:"Tube B", wide:"mid", cap:"Tubes A and B: 0.1 mL into 9.9 mL water"}, {type:"svg", name:"dfone", a:1, w:9, from:"Tube C", to:"Tube D", c:"#c2185b", wide:"mid", cap:"Tubes C, D, E, and F: 1 mL into 9 mL water"}], items:[
      {t:"Individual dilution factor = volume added ÷ [[total volume|total]]."},
      {t:"Total volume = volume added + the [[water]].", why:"$$0.1 \\text{ mL} + 9.9 \\text{ mL} = 10 \\text{ mL}$$ The total is 10 mL, not 9.9 mL."}
    ]},
    {tab:"Dilution factors", h:"Total dilution factor: all the tubes so far", banner:"Multiply the dilution factor of every tube along the way.", items:[
      {t:"Total dilution factor = [[multiply|multiplying]] the individual dilution factors of each tube."}
    ], sim:{sim:"dilchain", prompt:"Pick a tube. Tap <b>Next step</b> to see where each number comes from."}, tip:"Powers of 10? Add the exponents. $$10^{-2} \\times 10^{-2} \\times 10^{-1} = 10^{-2 + (-2) + (-1)} = 10^{-5}$$"},
    /* ---------- tab 3: count + CFU ---------- */
    {tab:"Count + CFU", banner:"$$\\text{cells/mL} = \\frac{\\text{CFUs}}{\\text{total dilution factor} \\times \\text{mL plated}}$$", review:"exp", layout:"cards", items:[
      {big:"CFU", t:"[[Colony forming unit|colony-forming unit]]. One colony started from one live cell (or clump)."},
      {big:"&gt; 200", t:"More than [[200]] colonies = TNTC. Write \"&gt;200\" or \"TNTC\". Do [[not]] use that plate."},
      {big:"µL to mL", t:"Divide by [[1000|1,000]]. So 100 µL = [[0.1|.1]] mL."}
    ], sim:{sim:"cfucalc", prompt:"Pick a tube to plate. Then tap <b>Next step</b> to build the equation. Each color shows where a number comes from. Tap the total dilution factor to see how it was calculated."}},
    {tab:"Count + CFU", h:"Why CFUs/mL is the same as cells/mL", items:[
      {t:"Each colony grew from [[one|1|a single]] live cell. So counting colonies (CFUs) counts the live cells you put on the plate.", why:"That is why CFU/mL and cells/mL mean the same thing here. It counts <b>live</b> cells only. A clump of cells makes just one colony, so the true number can be a little higher."}
    ]},
    {tab:"Count + CFU", h:"More than one countable plate? Average them", lead:"Use every plate you can count reliably (200 colonies or fewer, all separate).", kind:"steps", items:[
      {t:"Calculate cells/mL for [[each|every]] countable plate on its own."},
      {t:"[[Average|mean]] those cells/mL values. That is your best estimate of the inoculum concentration."}
    ], examples:[{title:"two countable plates", steps:[
      "Plate D: 156 colonies, total dilution factor $10^{-6}$, 0.1 mL plated. $$\\frac{156}{10^{-6} \\times 0.1} = \\frac{156}{10^{-7}} = 1.56 \\times 10^{9}\\text{ cells/mL}$$",
      "Plate E: 16 colonies, total dilution factor $10^{-7}$, 0.1 mL plated. $$\\frac{16}{10^{-7} \\times 0.1} = \\frac{16}{10^{-8}} = 1.6 \\times 10^{9}\\text{ cells/mL}$$",
      "Average the two. $$\\frac{1.56 \\times 10^{9} + 1.6 \\times 10^{9}}{2} = 1.58 \\times 10^{9}\\text{ cells/mL}$$"], answer:"About 1.58 × 10<sup>9</sup> cells/mL in the original culture"}]},
    /* ---------- tab 4: common mistakes ---------- */
    {tab:"Common mistakes", h:"Mixing: the most important one", banner:"Every transfer depends on an evenly mixed tube.", lead:"Tap each <b>What if...?</b> to check yourself.", layout:"cards", cols:2, items:[
      {big:"Not mixing enough", ico:{i:"tube", c:"#e3d29a"}, t:"Pipette up and down [[several|many|enough]] times after you add the sample.", whatif:[{q:"you only mix once or twice?", a:"The cells stay bunched where the sample went in. The next transfer can pick up too many or too few cells, so every plate after it is off."}]},
      {big:"Wrong stop", ico:{i:"pipette"}, t:"Mix using the [[first]] stop only.", whatif:[{q:"you push to the second stop while mixing?", a:"The second stop blows air into the liquid. That makes bubbles and can spray droplets with cells out of the tube, so the volumes and the mixing are off."}]},
      {big:"Mixing volume too small", ico:{i:"pipette"}, t:"Moving 0.1 mL up and down in 10 mL is too [[little|small]] to mix the tube. Mix with a larger volume.", whatif:[{q:"you mix by moving only 0.1 mL?", a:"Most of the 10 mL never moves, so the cells are not spread evenly. The sample you take next may not match the rest of the tube."}]},
      {big:"Mixing too fast", ico:{i:"pipette"}, t:"Let the plunger up [[slowly|slow]].", whatif:[{q:"you let the plunger snap up fast?", a:"Liquid shoots up past the tip into the pipette itself. Cells get inside the pipette and can drip into later tubes, and you lose volume."}]},
      {big:"Not switching tips", ico:{i:"pipette"}, t:"Use a [[new|fresh|clean]] tip for every transfer.", whatif:[{q:"you use the same tip for the next tube?", a:"Cells from the more concentrated tube cling inside the old tip. They get carried into the next tube, so later tubes have extra cells and your count comes out too high."}]}
    ]},
    {tab:"Common mistakes", h:"Other things that change the count", layout:"cards", cols:2, items:[
      {big:"Merged colonies", ico:{i:"count"}, t:"Colonies [[merged|merge]] or were too crowded to count.", whatif:[{q:"two colonies merge?", a:"They look like one colony. You count too few, so your estimate is too low."}]},
      {big:"Pipetting error", ico:{i:"pipette"}, t:"A [[pipetting|pipette]] error in the volume.", whatif:[{q:"you move 0.2 mL instead of 0.1 mL?", a:"About twice as many cells go into the next tube. Every plate after it has more colonies than it should."}]},
      {big:"Clumped cells", ico:{i:"plate"}, t:"Cells [[clumped|clump]] together.", whatif:[{q:"cells stay in clumps?", a:"A whole clump makes just one colony. You count too few, so your estimate is too low."}]},
      {big:"Contamination", ico:{i:"flame"}, t:"[[Contamination|contaminated]].", whatif:[{q:"a plate gets contaminated?", a:"Extra colonies grow that did not come from your culture, so your count is too high."}]}
    ]},
    {tab:"Common mistakes", h:"Math mistakes to watch for", layout:"cards", cols:2, items:[
      {big:"Forgot µL to mL", t:"Always change µL to mL before you divide.", whatif:[{q:"you use 100 instead of 0.1?", a:"Your answer comes out 1000 times too small. Change units first: $$\\frac{100\\ \\mu\\text{L}}{1000} = 0.1 \\text{ mL}$$"}]},
      {big:"Added instead of multiplied", t:"Multiply dilution factors. Never add them.", whatif:[{q:"you add 1/100 + 1/100?", a:"You get 2/100. Multiply instead: $$\\frac{1}{100} \\times \\frac{1}{100} = \\frac{1}{10{,}000}$$"}]},
      {big:"Wrong total volume", t:"Total volume = added + water.", whatif:[{q:"you use 9.9 mL as the total?", a:"The total is 10 mL, not 9.9 mL: $$\\frac{0.1}{0.1 + 9.9} = \\frac{0.1}{10} = \\frac{1}{100}$$"}]},
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
