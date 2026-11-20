/* How diseases spread: routes of transmission for the Transmission page (transmission.html).
   Routes: Ch. 13 slide 24 (Transmission of Disease) + slide 42 rows, split per the instructor:
   droplets vs. airborne, fomites vs. autoinoculation, plus fecal-oral, contaminated food, and the parenteral route (wounds).
   p = PRIMARY route(s), s = other routes. The quiz only tests p.
   Viruses: Ch. 13 slides. The main "Transmission:" bullet = primary; its sub-bullet = other routes.
   Bacteria: the "How it spreads" boxes in the Ch. 11 tours; the rest were filled in and reviewed by the instructor.
   Normal flora that cause disease from inside your own body are left out on purpose. */
(function(){
/* route groups: the tabs at the top of the page, each with its own color */
var GROUPS = [
  {id: "air", ic: "🌬️", name: "Through the air"},
  {id: "food", ic: "🍽️", name: "Food and water"},
  {id: "fluids", ic: "🩸", name: "Body fluids"},
  {id: "touch", ic: "✋", name: "Touch"},
  {id: "animals", ic: "🦟", name: "Animals"},
  {id: "skin", ic: "🩹", name: "Breaks in the skin"}
];
var ROUTES = [
  {id: "drop", grp: "air", short: "Droplets", ic: "💨", name: "Respiratory droplets", def: "Coughing, sneezing, talking, or kissing (saliva). Big droplets only travel a short distance."},
  {id: "air", grp: "air", short: "Airborne", ic: "🌫️", name: "Airborne", def: "Tiny particles (aerosols) hang in the air and travel long distances."},
  {id: "fecal", grp: "food", short: "Fecal-oral", ic: "🚰", name: "Fecal-oral", def: "Microbes from feces get into water or food, then get swallowed."},
  {id: "food", grp: "food", short: "Contaminated food", ic: "🍽️", name: "Contaminated food", def: "Eating food that carries the microbe or its toxin."},
  {id: "blood", grp: "fluids", short: "Blood", ic: "🩸", name: "Blood", def: "Transfusions, needle sticks, or transplants."},
  {id: "sex", grp: "fluids", short: "Sexual contact", ic: "💞", name: "Sexual contact", def: "Genital or oral sex."},
  {id: "vert", grp: "fluids", short: "Vertical", ic: "🤰", name: "Vertical", def: "Passed from parent to baby during pregnancy or birth."},
  {id: "contact", grp: "touch", short: "Direct contact", ic: "✋", name: "Direct contact", def: "Touching skin, sores, lesions, or mucous membranes."},
  {id: "fomite", grp: "touch", short: "Fomites", ic: "🚪", name: "Fomites", def: "Touching a contaminated object or surface, then your mouth, eyes, or nose."},
  {id: "auto", grp: "touch", short: "Autoinoculation", ic: "🔁", name: "Autoinoculation", def: "Spreading it to another part of your own body by scratching or touching."},
  {id: "vector", grp: "animals", short: "Vectors", ic: "🦟", name: "Vectors", def: "Carried by an animal like a mosquito, tick, flea, or louse."},
  {id: "bite", grp: "animals", short: "Animal bites", ic: "🐕", name: "Animal bites", def: "From an infected animal's bite or scratch."},
  {id: "wound", grp: "skin", short: "Wounds", ic: "🩹", name: "Wounds (parenteral route)", def: "Microbes enter the tissue directly through a puncture, cut, burn, or wound."}
];

/* k: "b" bacterium (id from the tours), "v" virus (id from body-map-data.js). note: one line shown on its card.
   dz (viruses): the disease, shown on the back of its flip card; bacteria use the disease text from the tours. */
var TX = {
  /* ---------- viruses (Ch. 13 slides) ---------- */
  variola: {k: "v", dz: "smallpox", p: ["drop", "air"], s: ["contact"]},
  hsv1: {k: "v", dz: "cold sores (fever blisters)", p: ["contact"], s: ["sex", "vert", "drop", "fomite", "auto"], note: "skin and mucosal contact (mouth)"},
  hsv2: {k: "v", dz: "genital herpes", p: ["sex", "vert"]},
  vzv: {k: "v", dz: "chickenpox; shingles when it reactivates", p: ["air", "contact"], s: ["drop", "fomite", "vert"], note: "touching the lesions"},
  ebv: {k: "v", dz: "mononucleosis (\"mono\")", p: ["drop", "contact"], note: "saliva and kissing"},
  hhv6: {k: "v", dz: "roseola", p: ["drop"], s: ["blood"], note: "saliva; blood = transplants"},
  hhv8: {k: "v", dz: "Kaposi sarcoma", p: ["drop"], s: ["blood", "sex", "vert"], note: "saliva"},
  hbv: {k: "v", dz: "hepatitis B", p: ["blood", "sex", "vert"]},
  adeno: {k: "v", dz: "colds, pneumonia-like illness, pink eye", p: ["drop"], s: ["fecal", "contact", "fomite"]},
  jc: {k: "v", dz: "PML (brain infection) in severely immunocompromised people", p: ["drop"]},
  bk: {k: "v", dz: "bladder and kidney damage; kidney transplant failure", p: ["drop"], s: ["blood"], note: "blood = kidney transplants"},
  hpv: {k: "v", dz: "genital warts; cervical and other cancers", p: ["sex"], s: ["vert", "contact"]},
  b19: {k: "v", dz: "fifth disease (\"slapped-cheek\" rash)", p: ["drop", "blood"], s: ["vert"], note: "blood = blood products"},
  cov: {k: "v", dz: "common colds, SARS, MERS, COVID-19", p: ["drop", "air"]},
  yf: {k: "v", dz: "yellow fever", p: ["vector"], note: "mosquitoes"},
  dengue: {k: "v", dz: "dengue", p: ["vector"], note: "mosquitoes"},
  zika: {k: "v", dz: "Zika", p: ["vector"], s: ["sex"], note: "mosquitoes"},
  wnv: {k: "v", dz: "West Nile (can cause encephalitis or meningitis)", p: ["vector"], note: "mosquitoes"},
  hcv: {k: "v", dz: "hepatitis C", p: ["blood"]},
  ev: {k: "v", dz: "hand-foot-and-mouth disease", p: ["drop", "contact"], s: ["fecal"], note: "saliva and mucosal contact"},
  polio: {k: "v", dz: "polio", p: ["fecal"], note: "water contaminated with feces"},
  rubella: {k: "v", dz: "rubella (German measles)", p: ["air"], s: ["vert"]},
  measles: {k: "v", dz: "measles", p: ["air", "drop"], note: "extremely contagious"},
  mumps: {k: "v", dz: "mumps", p: ["drop"], note: "saliva and respiratory secretions"},
  rsv: {k: "v", dz: "pneumonia-like illness in infants", p: ["air", "drop"]},
  rabies: {k: "v", dz: "rabies", p: ["bite"]},
  flu: {k: "v", dz: "influenza (the flu)", p: ["air", "drop"]},
  hiv: {k: "v", dz: "AIDS", p: ["blood", "sex", "vert"]},

  /* ---------- bacteria ---------- */
  rrickettsii: {k: "b", p: ["vector"], note: "ticks"},
  bpertussis: {k: "b", p: ["drop"]},
  ngon: {k: "b", p: ["sex"], s: ["vert"], note: "vertical = during birth"},
  nmen: {k: "b", p: ["drop"]},
  vcholerae: {k: "b", p: ["fecal"], s: ["food"], note: "contaminated water; poor sanitation"},
  cjejuni: {k: "b", p: ["food"], s: ["fecal"], note: "undercooked poultry, raw milk, contaminated water"},
  tpallidum: {k: "b", p: ["sex"], s: ["vert"], note: "vertical = congenital syphilis"},
  bburgdorferi: {k: "b", p: ["vector"], note: "Ixodes (blacklegged) ticks"},
  brf: {k: "b", p: ["vector"], note: "soft ticks or body lice"},
  cdiphtheriae: {k: "b", p: ["drop"], s: ["fomite"]},
  mtb: {k: "b", p: ["air"], note: "usually after long contact in shared air"},
  mleprae: {k: "b", p: ["drop"], note: "prolonged close contact"},
  lpneumophila: {k: "b", p: ["air"], note: "the only one caught from AC units and cooling towers; not person to person"},
  saureus: {k: "b", p: ["contact"], s: ["fomite", "auto", "food"], note: "food = enterotoxin food poisoning"},
  spyogenes: {k: "b", p: ["drop"], s: ["contact"]},
  spneumoniae: {k: "b", p: ["drop"]},
  ecoli: {k: "b", p: ["fecal"], s: ["food"], note: "traveler's diarrhea"},
  kpneumoniae: {k: "b", p: ["contact"], s: ["fomite"], note: "hospitals: hands and ventilators"},
  paeruginosa: {k: "b", p: ["fomite"], s: ["wound"], note: "contact lenses and hospital equipment; burns and wounds"},
  smarcescens: {k: "b", p: ["fomite"], note: "hospital equipment"},
  styphi: {k: "b", p: ["fecal"], s: ["food"], note: "carriers can spread it"},
  shigella: {k: "b", p: ["fecal"], s: ["contact"]},
  ypestis: {k: "b", p: ["vector"], s: ["drop"], note: "fleas; droplets = pneumonic plague"},
  ctrachomatis: {k: "b", p: ["sex"], s: ["vert"], note: "vertical = during birth"},
  ctetani: {k: "b", p: ["wound"], note: "spores from soil in deep puncture wounds"},
  cperfringens: {k: "b", p: ["wound"], s: ["food"], note: "spores from soil in wounds"},
  cbotulinum: {k: "b", p: ["food"], s: ["wound"], note: "improperly canned food; infants: spores in honey"},
  bcereus: {k: "b", p: ["food"], note: "stale rice"},
  lmono: {k: "b", p: ["food"], s: ["vert"], note: "deli meats, unpasteurized dairy; crosses the placenta"}
};
/* card names that differ from the tour's organism name */
var NAMES = {styphi: "Salmonella typhi", brf: "Borrelia (relapsing fever)"};
window.TXDATA = {GROUPS: GROUPS, ROUTES: ROUTES, TX: TX, NAMES: NAMES};
})();
