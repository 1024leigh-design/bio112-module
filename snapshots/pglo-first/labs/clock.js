/* Hub activity: "20 minutes on the clock".
   TODO (CONFIRM with instructor): check these times and fits / does not fit answers against the instructor's key.
   fits:null means the answer is waiting on the instructor. Do not fill those in until the key is confirmed. */
VLAB.clock = {
  prompt:"Each procedure below shows its staining or wait time. Mark which ones fit in a 20 minute lab.",
  reminder:"Smear prep and air drying also take time. Add them in!",
  todo:"CONFIRM these times and answers match the instructor's key. The acid-fast and endospore answers are blank until then.",
  items:[
    {name:"Gram stain", time:"A few minutes of staining", fits:true, why:"The staining takes only a few minutes. Smear prep and drying fit in too."},
    {name:"Simple stain", time:"2 minute stain", fits:true, why:"A 2 minute stain, plus smear prep and drying."},
    {name:"Acid-fast (Kinyoun)", time:"10 minutes of carbolfuchsin", fits:null, why:"Add it up: 10 minutes of carbolfuchsin, plus smear prep, air drying, decolorizing, and the counterstain.",
      slow:{q:"What is the slowest step?", opts:["10 minutes of carbolfuchsin", "Acid-alcohol decolorizing", "30 seconds of methylene blue", "Rinsing"], a:0, why:"The carbolfuchsin stays on for 10 minutes."}},
    {name:"Endospore (Schaeffer-Fulton)", time:"15 minutes of heated malachite green", fits:null, why:"Add it up: 15 minutes of heated malachite green, plus smear prep, air drying, heat fixing, and the safranin.",
      slow:{q:"What is the slowest step?", opts:["15 minutes of heated malachite green", "About 30 seconds of safranin", "Heat fixing (5 passes)", "Rinsing"], a:0, why:"The malachite green heats for 15 minutes."}},
    {name:"pGLO Day 1", time:"About 1 hour on ice, plus 1 hour of recovery", fits:false, why:"About 2 hours of waiting. That cannot fit in 20 minutes.",
      slow:{q:"What makes it slow?", opts:["About 1 hour on ice plus 1 hour of recovery", "The 45 second heat shock", "Adding 4 µL of plasmid", "Labeling the tubes"], a:0, why:"The hour on ice and the hour of recovery."}},
    {name:"Subculture", time:"Quick", fits:true, why:"A subculture is quick."},
    {name:"Reading motility tubes", time:"Quick", fits:true, why:"Reading the tubes is quick. (The incubation already happened.)"}
  ]
};
