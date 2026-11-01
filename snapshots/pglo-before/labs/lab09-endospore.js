/* Lab 9: Endospore staining (Schaeffer-Fulton only). Content from the build brief.
   The sort list comes from the course lecture slides. UV light and filtration are left out on purpose. */
VLAB.add({
  n:9, title:"Endospore staining",
  learn:[
    {h:"What endospores are", kind:"facts", figs:[{type:"svg", name:"sporecell", wide:true}], items:[
      {t:"Dormant, resistant structures made by [[Bacillus]] and [[Clostridium]]."},
      {t:"They resist heat, chemicals, [[drying|desiccation]], and radiation."},
      {t:"The thick spore [[coat]] keeps out normal stains, so [[heat]] is needed to drive the stain in."}
    ]},
    {h:"Schaeffer-Fulton method (the only one we use)", kind:"steps", top:[{type:"strip", steps:[{i:"flame", t:"Heat fix", s:"5 passes"}, {i:"hot", t:"Foil on hot plate", s:"LOW"}, {i:"bottle", c:"#2a9d4a", t:"Malachite green", s:"15 min, heating"}, {i:"rinse", t:"Rinse"}, {i:"bottle", c:"#d8456b", t:"Safranin", s:"about 30 s"}, {i:"blot", t:"Rinse, blot"}]}], figs:[{type:"svg", name:"spore", wide:true}], items:[
      {t:"Heat fix the smear: [[5|five]] passes through the flame."},
      {t:"Put the slide on [[foil]] on a hot plate set to [[low]]."},
      {t:"Flood with [[malachite green]]. Keep it heating for [[15 minutes|15 min|15]].", why:"Heat drives the stain through the thick spore coat."},
      {t:"[[Rinse]]."},
      {t:"[[Safranin]] for about [[30 seconds|30 sec|30]].", why:"Counterstain: the vegetative cells turn pink."},
      {t:"Rinse, then [[blot]]."}
    ]},
    {h:"Results", kind:"facts", figs:[
      {type:"field", seed:91, groups:[{shape:"longrod", arr:"single", color:"pink", n:9, sporeFrac:.6}, {shape:"spore", arr:"single", color:"green", n:5}], cap:"Green spores, pink vegetative cells"}
    ], items:[
      {t:"Spores: [[green]]."},
      {t:"Vegetative cells: [[pink]]."},
      {t:"[[Free spores|free endospores|free]] can sit outside the cells."}
    ]}
  ],
  problems:[
    {sim:"sort", title:"Does this method destroy endospores?", prompt:"Sort each method into the right box.",
      bins:[{id:"yes", label:"Destroys endospores"}, {id:"no", label:"Does NOT destroy endospores"}],
      cards:[
        {t:"Autoclaving (pressurized steam, 121°C, about 20 minutes)", bin:"yes", why:"Autoclaving destroys endospores.", hint:"Think pressurized steam."},
        {t:"Dry heat sterilization (160 to 170°C for 2 to 3 hours)", bin:"yes", why:"Dry heat sterilization destroys endospores.", hint:"It is called sterilization."},
        {t:"Ionizing radiation (gamma rays, X-rays, electron beams)", bin:"yes", why:"Ionizing radiation destroys endospores.", hint:"This is high-energy radiation."},
        {t:"High-level disinfectants with long exposure (glutaraldehyde, hydrogen peroxide)", bin:"yes", why:"High-level disinfectants with long exposure destroy endospores.", hint:"High-level, long exposure."},
        {t:"Pasteurization", bin:"no", why:"Spore formers like <i>Bacillus</i> and <i>Clostridium</i> survive pasteurization.", hint:"Spore formers survive it."},
        {t:"High pressure", bin:"no", why:"Endospores resist high pressure.", hint:"Endospores resist it."},
        {t:"Intermediate-level disinfectants (alcohols, phenolics, iodophors)", bin:"no", why:"Intermediate-level disinfectants do not destroy endospores.", hint:"Only high-level disinfectants work."},
        {t:"Low-level disinfectants (quats, simple detergents)", bin:"no", why:"Low-level disinfectants do not destroy endospores.", hint:"Only high-level disinfectants work."},
        {t:"Refrigeration and freezing", bin:"no", why:"Cold slows growth. It does not kill most microbes.", hint:"Cold only slows growth."},
        {t:"Desiccation (drying)", bin:"no", why:"Many microbes survive drying until they are rehydrated.", hint:"Microbes can wait it out."}
      ], done:"Only four methods destroy endospores."}
  ]
});
