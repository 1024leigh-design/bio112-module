/* Lab 14: Serial dilution and plate counts. Content from the build brief. */
VLAB.add({
  n:14, title:"Serial dilution and plate counts",
  learn:[
    {h:"Key ideas", kind:"facts", figs:[{type:"svg", name:"dilplates", wide:true, cap:"Each tube is more dilute, so its plate has fewer colonies."}], items:[
      {t:"A serial dilution dilutes a sample step by step, so some plates have a [[countable]] number of colonies."},
      {t:"CFU = [[colony forming unit|colony-forming unit]]. One colony started from one live cell (or clump)."},
      {t:"Dilution factor for one tube = volume added ÷ [[total volume]]."},
      {t:"Total dilution = [[multiply|multiplying|multiply the dilution factors]] the dilution factors of each tube."},
      {t:"cells/mL in the original = CFUs ÷ (total dilution × [[volume plated|volume]] in mL)."},
      {t:"µL to mL: divide by [[1000|1,000]]. So 100 µL = [[0.1|.1]] mL."}
    ]},
    {h:"Our protocol (6 tubes, A to F, <i>E. coli</i> broth culture)", kind:"steps", top:[{type:"svg", name:"dilseries", wide:true}], items:[
      {t:"Tubes A and B: [[9.9]] mL sterile water + [[0.1|.1]] mL. Tube A gets 0.1 mL of the original culture. Tube B gets 0.1 mL from tube A.", why:"0.1 ÷ 10 = 1/100. Each is a 1/100 dilution."},
      {t:"Tubes C to F: [[9]] mL sterile water + [[1]] mL from the previous tube.", why:"1 ÷ 10 = 1/10. Each is a 1/10 dilution."},
      {t:"Plate [[100 µL|100|100ul|100 ul]] (0.1 mL) from each tube with a [[micropipette|pipette]]."},
      {t:"Spread with a spreader dipped in [[isopropanol|isopropyl alcohol|alcohol]] and flamed between plates."},
      {t:"Incubate at [[37°C|37|37 c]]."}
    ]},
    {h:"How to do the math", kind:"facts", lead:"Five skills. Learn them in this order.",
      examples:[
        {title:"1. Dilution factor for one tube", steps:["Tube A gets <b>0.1 mL</b> of culture plus <b>9.9 mL</b> of water.", "Total volume = 0.1 + 9.9 = <b>10 mL</b>. (Always add what you put in!)", "Dilution factor = volume added ÷ total volume = 0.1 ÷ 10 = <b>1/100</b>."], answer:"1/100, which is the same as 10<sup>-2</sup>"},
        {title:"2. Total dilution", steps:["Multiply the dilution factors, tube by tube.", "Tube B: 1/100 × 1/100 = <b>1/10,000 = 10<sup>-4</sup></b>.", "Shortcut: add the exponents. 10<sup>-2</sup> × 10<sup>-2</sup> = 10<sup>-2 + -2</sup> = 10<sup>-4</sup>.", "Tube C: 10<sup>-4</sup> × 10<sup>-1</sup> = <b>10<sup>-5</sup></b>. Each 1/10 tube adds one more -1."], answer:"A = 10<sup>-2</sup>, B = 10<sup>-4</sup>, C = 10<sup>-5</sup>, D = 10<sup>-6</sup>, E = 10<sup>-7</sup>, F = 10<sup>-8</sup>"},
        {title:"3. µL to mL", steps:["There are 1000 µL in 1 mL.", "Divide µL by 1000: 100 µL ÷ 1000 = <b>0.1 mL</b>."], answer:"100 µL = 0.1 mL"},
        {title:"4. Pick the plate", steps:["Plate D: more than 200 colonies. That is TNTC. Skip it.", "Plate E: <b>52</b> separate colonies. Use this one."], answer:"Use plate E (52 colonies, total dilution 10<sup>-7</sup>)"},
        {title:"5. cells/mL in the original culture", steps:["Write the formula: cells/mL = CFUs ÷ (total dilution × mL plated).", "Plug in: 52 ÷ (10<sup>-7</sup> × 0.1).", "Multiply the bottom first: 10<sup>-7</sup> × 0.1 = <b>10<sup>-8</sup></b>.", "Dividing by 10<sup>-8</sup> is the same as multiplying by 10<sup>8</sup>: 52 × 10<sup>8</sup>.", "Scientific notation: move the decimal one place left and add 1 to the exponent: <b>5.2 × 10<sup>9</sup></b>."], answer:"5.2 × 10<sup>9</sup> cells/mL"}],
      tip:"Do not forget the units! The final answer is in <b>cells/mL</b>.",
      items:[
      {t:"Dilution factor = volume added ÷ [[total volume|total]]."},
      {t:"Total dilution = [[multiply|multiplying]] every tube's dilution factor."},
      {t:"cells/mL = CFUs ÷ (total dilution × [[mL plated|volume plated|ml]])."}
    ]},
    {h:"Total dilutions", kind:"facts", items:[
      {t:"A = 10<sup>-2</sup>. B = [[10<sup>-4</sup>|10^-4|10-4|1/10000|0.0001]]."},
      {t:"C = 10<sup>-5</sup>. D = [[10<sup>-6</sup>|10^-6|10-6|1/1000000|0.000001]]."},
      {t:"E = 10<sup>-7</sup>. F = [[10<sup>-8</sup>|10^-8|10-8|1/100000000|0.00000001]]."}
    ]},
    {h:"Counting", kind:"facts", items:[
      {t:"More than [[200]] colonies = TNTC (too numerous to count)."},
      {t:"Write \"&gt;200\" or \"TNTC\". Do [[not]] use that plate for the calculation."},
      {t:"Reasons a plate gives a different estimate: colonies merged or too crowded to count, [[pipetting|pipette]] error, cells clumped, not mixed well between tubes, contamination."}
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
