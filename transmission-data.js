/* How diseases spread: routes of transmission for the Transmission page (transmission.html).
   Routes: Ch. 13 slide 24 (Transmission of Disease) + slide 42 rows, split per the instructor:
   droplets vs. airborne, fomites vs. autoinoculation, plus fecal-oral, contaminated food, and the parenteral route (wounds).
   p = PRIMARY route(s), s = other routes. The quiz only tests p.
   Viruses: Ch. 13 slides. The main "Transmission:" bullet = primary; its sub-bullet = other routes.
   Bacteria: the "How it spreads" boxes in the Ch. 11 tours; the rest were filled in and reviewed by the instructor.
   Normal flora that cause disease from inside your own body are left out on purpose. */
(function(){
var ROUTES = [
  {id: "drop", ic: "💨", name: "Respiratory droplets", def: "Coughing, sneezing, talking, or kissing (saliva). Big droplets only travel a short distance."},
  {id: "air", ic: "🌫️", name: "Airborne", def: "Tiny particles (aerosols) hang in the air and travel long distances."},
  {id: "fecal", ic: "🚰", name: "Fecal-oral", def: "Microbes from feces get into water or food, then get swallowed."},
  {id: "food", ic: "🍽️", name: "Contaminated food", def: "Eating food that carries the microbe or its toxin."},
  {id: "blood", ic: "🩸", name: "Blood", def: "Transfusions, needle sticks, or transplants."},
  {id: "sex", ic: "💞", name: "Sexual contact", def: "Genital or oral sex."},
  {id: "vert", ic: "🤰", name: "Vertical", def: "Passed from parent to baby during pregnancy or birth."},
  {id: "contact", ic: "✋", name: "Direct contact", def: "Touching skin, sores, lesions, or mucous membranes."},
  {id: "fomite", ic: "🚪", name: "Fomites", def: "Touching a contaminated object or surface, then your mouth, eyes, or nose."},
  {id: "auto", ic: "🔁", name: "Autoinoculation", def: "Spreading it to another part of your own body by scratching or touching."},
  {id: "vector", ic: "🦟", name: "Vectors", def: "Carried by an animal like a mosquito, tick, flea, or louse."},
  {id: "bite", ic: "🐕", name: "Animal bites", def: "From an infected animal's bite or scratch."},
  {id: "wound", ic: "🩹", name: "Wounds (parenteral route)", def: "Microbes enter the tissue directly through a puncture, cut, burn, or wound."}
];

/* k: "b" bacterium (id from the tours), "v" virus (id from body-map-data.js). note: one line shown on its card. */
var TX = {
  /* ---------- viruses (Ch. 13 slides) ---------- */
  variola: {k: "v", p: ["drop", "air"], s: ["contact"]},
  hsv1: {k: "v", p: ["contact"], s: ["sex", "vert", "drop", "fomite", "auto"], note: "skin and mucosal contact (mouth)"},
  hsv2: {k: "v", p: ["sex", "vert"]},
  vzv: {k: "v", p: ["air", "contact"], s: ["drop", "fomite", "vert"], note: "touching the lesions"},
  ebv: {k: "v", p: ["drop", "contact"], note: "saliva and kissing"},
  hhv6: {k: "v", p: ["drop"], s: ["blood"], note: "saliva; blood = transplants"},
  hhv8: {k: "v", p: ["drop"], s: ["blood", "sex", "vert"], note: "saliva"},
  hbv: {k: "v", p: ["blood", "sex", "vert"]},
  adeno: {k: "v", p: ["drop"], s: ["fecal", "contact", "fomite"]},
  jc: {k: "v", p: ["drop"]},
  bk: {k: "v", p: ["drop"], s: ["blood"], note: "blood = kidney transplants"},
  hpv: {k: "v", p: ["sex"], s: ["vert", "contact"]},
  b19: {k: "v", p: ["drop", "blood"], s: ["vert"], note: "blood = blood products"},
  cov: {k: "v", p: ["drop", "air"]},
  yf: {k: "v", p: ["vector"], note: "mosquitoes"},
  dengue: {k: "v", p: ["vector"], note: "mosquitoes"},
  zika: {k: "v", p: ["vector"], s: ["sex"], note: "mosquitoes"},
  wnv: {k: "v", p: ["vector"], note: "mosquitoes"},
  hcv: {k: "v", p: ["blood"]},
  ev: {k: "v", p: ["drop", "contact"], s: ["fecal"], note: "saliva and mucosal contact"},
  polio: {k: "v", p: ["fecal"], note: "water contaminated with feces"},
  rubella: {k: "v", p: ["air"], s: ["vert"]},
  measles: {k: "v", p: ["air", "drop"], note: "extremely contagious"},
  mumps: {k: "v", p: ["drop"], note: "saliva and respiratory secretions"},
  rsv: {k: "v", p: ["air", "drop"]},
  rabies: {k: "v", p: ["bite"]},
  flu: {k: "v", p: ["air", "drop"]},
  hiv: {k: "v", p: ["blood", "sex", "vert"]},

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
window.TXDATA = {ROUTES: ROUTES, TX: TX, NAMES: NAMES};
})();
