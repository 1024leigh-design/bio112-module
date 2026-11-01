/* Hub activity: "On the clock". Students pick a time limit, then mark which procedures fit.
   Instructor-confirmed: the 20 minute answers.
   TODO (CONFIRM with instructor): the 1, 2, and 3 hour answers are worked out from the protocol times. */
VLAB.clock = {
  prompt:"Pick a time limit. Then mark which procedures fit in that time.",
  reminder:"Smear prep and air drying also take time. Add them in!",
  todo:"CONFIRM the 1, 2, and 3 hour answers (the 20 minute answers are confirmed). Everything fits in 1 hour except pGLO Day 1. pGLO Day 1 does not fit in 2 hours (1 hour on ice + 1 hour recovery + the other steps). It fits in 3 hours.",
  limits:[{id:"20m", label:"20 minutes"}, {id:"1h", label:"1 hour"}, {id:"2h", label:"2 hours"}, {id:"3h", label:"3 hours"}],
  items:[
    {name:"Gram stain", time:"A few minutes of staining", fits:{"20m":true, "1h":true, "2h":true, "3h":true}, why:"Only a few minutes of staining, plus smear prep and drying."},
    {name:"Simple stain", time:"2 minute stain", fits:{"20m":true, "1h":true, "2h":true, "3h":true}, why:"A 2 minute stain, plus smear prep and drying."},
    {name:"Acid-fast (Kinyoun)", time:"10 minutes of carbolfuchsin", fits:{"20m":true, "1h":true, "2h":true, "3h":true}, why:"10 minutes of carbolfuchsin, plus smear prep, air drying, decolorizing, and the counterstain.",
      slow:{q:"What is the slowest step?", opts:["10 minutes of carbolfuchsin", "Acid-alcohol decolorizing", "30 seconds of methylene blue", "Rinsing"], a:0, why:"The carbolfuchsin stays on for 10 minutes."}},
    {name:"Endospore (Schaeffer-Fulton)", time:"15 minutes of heated malachite green", fits:{"20m":false, "1h":true, "2h":true, "3h":true}, why:{"20m":"15 minutes of heated malachite green, plus smear prep, air drying, heat fixing, and the safranin. That is too long for 20 minutes.", "1h":"15 minutes of heated malachite green, plus smear prep, air drying, heat fixing, and the safranin. It fits in an hour.", "2h":"It fits easily.", "3h":"It fits easily."},
      slow:{q:"What is the slowest step?", opts:["15 minutes of heated malachite green", "About 30 seconds of safranin", "Heat fixing (5 passes)", "Rinsing"], a:0, why:"The malachite green heats for 15 minutes."}},
    {name:"pGLO Day 1", time:"About 1 hour on ice, plus 1 hour of recovery", fits:{"20m":false, "1h":false, "2h":false, "3h":true},
      why:{"20m":"About 2 hours of waiting. That cannot fit in 20 minutes.", "1h":"The hour on ice alone uses up the whole hour.",
        "2h":"1 hour on ice + 1 hour of recovery is already 2 hours. The heat shock, 2 to 10 minutes back on ice, and plating push it past 2 hours.",
        "3h":"About 2 hours of waiting, plus the heat shock, ice, and plating. That fits in 3 hours."},
      slow:{q:"What makes it slow?", opts:["About 1 hour on ice plus 1 hour of recovery", "The 45 second heat shock", "Adding 4 µL of plasmid", "Labeling the tubes"], a:0, why:"The hour on ice and the hour of recovery."}},
    {name:"Subculture", time:"Quick", fits:{"20m":true, "1h":true, "2h":true, "3h":true}, why:"A subculture is quick."},
    {name:"Reading motility tubes", time:"Quick", fits:{"20m":true, "1h":true, "2h":true, "3h":true}, why:"Reading the tubes is quick. (The incubation already happened.)"}
  ]
};
