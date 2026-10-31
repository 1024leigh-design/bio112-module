/* Lab 4: Bacteria in the environment. Content from the build brief. No blood agar in our lab. */
VLAB.add({
  n:4, title:"Bacteria in the environment",
    key:["Mold colonies are often fuzzy or hairy.", "Cloudy broth = bacteria present. Only a plate shows how many types and colonies.", "Count scale: 0, + (1 to 10), ++ (11 to 50), +++ (51 to 100), ++++ (over 100)."],
  learn:[
    {h:"What we did", kind:"facts", top:[{type:"strip", steps:[{i:"plate", t:"TSA plate", s:"exposed to a place"}, {i:"tube", t:"Broth", s:"inoculated with a swab"}, {i:"incub", c:" ", t:"Incubate"}, {i:"count", t:"Read results"}]}], items:[
      {t:"[[TSA]] plates were exposed to different places: lab air, outside air, lips, fingertips, coins, hair, and dust."},
      {t:"A [[nutrient broth|broth]] was inoculated with a swab."}
    ]},
    {h:"Reading the plates", kind:"facts", figs:[
      {type:"plate", scatter:[[10, 41, "white", 3, 6], [3, 17, "yellow", 3, 5]], extra:'<circle cx="70" cy="130" r="16" fill="#e8e8e2" opacity=".9"/><circle cx="70" cy="130" r="16" fill="none" stroke="#cfcfc6" stroke-width="5" stroke-dasharray="1 2"/>', cap:"Bacterial colonies, plus one fuzzy mold colony"}
    ], items:[
      {t:"Bacterial colonies vs mold colonies: mold is often [[fuzzy|hairy|fuzzy or hairy]] or hairy."}
    ]},
    {h:"Reading the broth", kind:"facts", figs:[
      {type:"tube", kind:"broth", medium:"#f0e2b4", cloudy:"#e3d29a", cap:"Cloudy: bacteria present"},
      {type:"tube", kind:"broth", medium:"#f3e9c7", cap:"Clear: no growth"}
    ], items:[
      {t:"Cloudy broth = bacteria [[present|are present|growing]]."},
      {t:"Clear broth = [[no growth|none]]."},
      {t:"A broth cannot show how many types or how many colonies. A [[plate]] can."}
    ]},
    {h:"Colony count scale", kind:"facts", figs:[{type:"svg", name:"countscale", wide:true}], items:[
      {t:"<b>0</b> = no colonies"},
      {t:"<b>+</b> = [[1 to 10|1-10|1 10]] colonies"},
      {t:"<b>++</b> = [[11 to 50|11-50|11 50]] colonies"},
      {t:"<b>+++</b> = [[51 to 100|51-100|51 100]] colonies"},
      {t:"<b>++++</b> = [[over 100|more than 100|>100|100+]] colonies"}
    ]}
  ]
});
