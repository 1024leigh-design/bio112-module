/* Body Map data, shared by body-map.html and both Ch. 11 tours.
   vdz (viruses, from the Ch. 13 slides) is added to each site below: [virus id, what it causes there].
   flora: normal microbiota (Ch. 14 slides, Table 14.1, and the Ch. 11 slides).
   dz: [organism id, what it causes there], from the Ch. 11 tours and slides.
   An entry is a tour organism id, "@stopId|Label" for a genus (links to that genus stop), or "!Name|gram" for a genus not in the tours.
   These are examples, not a complete list. */
(function(){
var SITES = [
  {id: "brain", name: "Brain & spinal cord", flora: [], floraNote: "Normally sterile: no normal flora.",
    dz: [["nmen", "meningococcal meningitis (it normally lives in the throat!)"], ["spneumoniae", "meningitis"], ["sagalactiae", "meningitis in newborns"], ["lmono", "meningitis"], ["nasteroides", "nocardiosis that spreads to the brain"], ["ecoli", "opportunist in the wrong place: the spinal cord"], ["mtb", "disseminated (miliary) TB can spread to the brain"], ["cdiphtheriae", "the toxin travels in the blood and can damage the brain"]]},
  {id: "eyes", name: "Eyes", flora: ["sepi", "saureus", "@cutibacterium|Cutibacterium (Propionibacterium)", "@corynebacterium|Corynebacterium (diphtheroids)", "@streptococcus|Streptococci", "@micrococcus|Micrococcus"], floraNote: "These live on the conjunctiva.",
    dz: [["ngon", "eye infection in newborns that can cause blindness"], ["ctrachomatis", "trachoma"], ["paeruginosa", "eye infections (contact lenses)"]]},
  {id: "nose", name: "Nose & throat", flora: ["saureus", "sepi", "@corynebacterium|Corynebacterium (diphtheroids)", "spneumoniae", "nmen", "@neisseria|Neisseria", "!Haemophilus|−", "@fusobacteria|Fusobacterium", "@actinomyces|Actinomyces"],
    dz: [["spyogenes", "strep throat (the main cause) and scarlet fever"], ["cdiphtheriae", "diphtheria: pseudomembrane in the throat"], ["bpertussis", "whooping cough"], ["mleprae", "spreads in droplets from the nasal mucosa"]]},
  {id: "mouth", name: "Mouth", flora: ["@streptococcus|Streptococcus", "lactobacillus", "@actinomyces|Actinomyces", "@bacteroidetes|Bacteroides", "!Veillonella|−", "@neisseria|Neisseria", "!Haemophilus|−", "@fusobacteria|Fusobacterium", "@treponema|Treponema (harmless oral species, not T. pallidum)", "@staphylococcus|Staphylococcus", "@corynebacterium|Corynebacterium", "@micrococcus|Micrococcus"],
    dz: [["aisraelii", "actinomycosis (\"lumpy jaw\") when the mucosa is breached"], ["fuso", "periodontal (gum) disease and abscesses"], ["tpallidum", "congenital syphilis: Hutchinson's teeth"]]},
  {id: "lungs", name: "Lungs", flora: [], floraNote: "Healthy lungs have very few microbes.",
    dz: [["mtb", "tuberculosis"], ["banthracis", "inhalation anthrax: breathing in spores; the deadliest form"], ["spneumoniae", "pneumonia (it normally lives in the nose and throat!)"], ["kpneumoniae", "aspiration pneumonia, often nosocomial"], ["lpneumophila", "Legionnaires' disease"], ["cpneumoniae", "respiratory infections"], ["ctrachomatis", "pneumonia"], ["nasteroides", "pulmonary nocardiosis"], ["ypestis", "pneumonic plague"], ["smarcescens", "nosocomial pneumonia"], ["ecoli", "opportunist in the wrong place: the lungs"]]},
  {id: "heart", name: "Blood & heart", flora: [], floraNote: "Blood is normally sterile.",
    dz: [["sepi", "nosocomial bloodstream infections; endocarditis on artificial valves"], ["enterococcus", "endocarditis"], ["sagalactiae", "sepsis in newborns"], ["ypestis", "septicemic plague"], ["styphi", "typhoid fever"], ["smarcescens", "bacteremia"], ["paeruginosa", "sepsis (a nosocomial infection)"], ["saureus", "toxic shock syndrome; hemolysin destroys red blood cells"], ["cdiphtheriae", "myocarditis: the toxin travels in the blood to the heart"], ["tpallidum", "tertiary syphilis: heart damage"]]},
  {id: "stomach", name: "Stomach", flora: [], floraNote: "Stomach acid keeps most microbes out.",
    dz: [["hpylori", "gastritis and peptic ulcers"]]},
  {id: "liver", name: "Liver", flora: [], floraNote: "Normally sterile.",
    dz: []},
  {id: "gut", name: "Intestines", flora: ["ecoli", "@bacteroidetes|Bacteroides", "@fusobacteria|Fusobacterium", "lactobacillus", "enterococcus", "!Bifidobacterium|+", "enterobacter", "!Citrobacter|−", "proteus", "kpneumoniae", "@clostridia|Clostridium", "@actinomyces|Actinomyces"], floraNote: "These live in the large intestine.",
    dz: [["salmonella", "food poisoning (salmonellosis)"], ["styphi", "typhoid fever"], ["shigella", "shigellosis (bacillary dysentery)"], ["vcholerae", "cholera"], ["cjejuni", "bacterial gastroenteritis"], ["ecoli", "traveler's diarrhea"], ["cdiff", "colitis after antibiotics wipe out the normal flora"], ["bcereus", "food poisoning (stale rice)"], ["saureus", "food poisoning (enterotoxin)"], ["lmono", "listeriosis (can feel like the stomach flu)"], ["banthracis", "gastrointestinal anthrax: from eating undercooked meat from infected animals"], ["cbotulinum", "infant botulism: swallowed spores (e.g., honey) grow in the infant gut and release toxin"]]},
  {id: "urinary", name: "Urinary tract", flora: ["@staphylococcus|Staphylococcus", "@micrococcus|Micrococcus", "enterococcus", "lactobacillus", "@bacteroidetes|Bacteroides", "@corynebacterium|Corynebacterium (diphtheroids)", "@pseudomonas|Pseudomonas", "kpneumoniae", "proteus", "ssapro", "@actinomyces|Actinomyces"], floraNote: "These live in the urethra and urogenital tract.",
    dz: [["ecoli", "UTIs (the #1 cause)"], ["ssapro", "UTIs (the #2 cause)"], ["proteus", "UTIs"], ["enterococcus", "UTIs"], ["paeruginosa", "UTIs"], ["smarcescens", "nosocomial UTIs"], ["ngon", "gonorrhea: painful urination and pus-like discharge"], ["mtb", "disseminated (miliary) TB can spread to the kidneys"], ["cdiphtheriae", "the toxin travels in the blood and can damage the kidneys"]]},
  {id: "repro", name: "Reproductive tract", flora: ["lactobacillus", "@streptococcus|Streptococcus", "@clostridia|Clostridium", "ssapro", "@actinomyces|Actinomyces", "@fusobacteria|Fusobacterium"], floraNote: "These live in the vagina and urogenital tract. Lactobacillus keeps the pH low.",
    dz: [["ngon", "gonorrhea (in women: often no symptoms, possible PID)"], ["ctrachomatis", "chlamydia (the most common bacterial STI)"], ["tpallidum", "primary syphilis: painless chancre"], ["lmono", "miscarriage and stillbirth"], ["ecoli", "opportunist in the wrong place: the vagina"]]},
  {id: "skin", name: "Skin & wounds", flora: ["@cutibacterium|Cutibacterium (Propionibacterium)", "sepi", "saureus", "@corynebacterium|Corynebacterium", "@micrococcus|Micrococcus", "!Acinetobacter|−", "!Brevibacterium|+"], floraNote: "Fungi live here too: Candida and Malassezia.",
    dz: [["saureus", "folliculitis, boils (furuncles, carbuncles), impetigo, paronychia, cellulitis, scalded skin syndrome"], ["spyogenes", "necrotizing fasciitis"], ["paeruginosa", "burn and wound infections"], ["cperfringens", "gas gangrene in contaminated wounds"], ["cacnes", "acne"], ["cdiphtheriae", "cutaneous diphtheria (skin ulcers)"], ["mleprae", "leprosy skin lesions"], ["nasteroides", "cutaneous nocardiosis"], ["proteus", "wound infections"], ["enterococcus", "wound infections"], ["smarcescens", "nosocomial wound infections"], ["ecoli", "opportunist in the wrong place: wounds"], ["tpallidum", "secondary syphilis: skin rash, including palms and soles"], ["bburgdorferi", "Lyme disease: erythema migrans (\"bull's-eye\" rash)"], ["cbotulinum", "wound botulism"], ["sgriseus", "rare: mycetoma in immunocompromised people"], ["banthracis", "cutaneous anthrax: spores enter a cut; the most common form"]]},
  {id: "nerves", name: "Nerves & muscles", flora: [], floraNote: "Normally sterile.",
    dz: [["ctetani", "tetanus: stiff muscles, spasms, lockjaw (spores get in through deep puncture wounds)"], ["cbotulinum", "botulism: the toxin blocks acetylcholine → flaccid paralysis"], ["mleprae", "permanent nerve damage"], ["cperfringens", "muscle death (clostridial myonecrosis)"], ["cdiphtheriae", "neuropathy (nerve damage from the toxin)"], ["tpallidum", "tertiary syphilis: nerve damage"]]},
  {id: "bones", name: "Bones", flora: [], floraNote: "Normally sterile.",
    dz: [["saureus", "osteomyelitis (bone infection)"], ["mtb", "disseminated (miliary) TB can spread to the bones"], ["tpallidum", "congenital syphilis: bone deformities"]]}
];
/* ---------- viruses (Ch. 13 slides) ---------- */
/* fam and type come from the slide footers; genus only where we ask for it in the games */
var VIRUSES = {
  variola: {name: "Variola virus", fam: "Poxviridae", type: "Enveloped dsDNA"},
  hsv1: {name: "HSV-1 (herpes simplex virus 1)", fam: "Herpesviridae", type: "Enveloped dsDNA"},
  hsv2: {name: "HSV-2 (herpes simplex virus 2)", fam: "Herpesviridae", type: "Enveloped dsDNA"},
  vzv: {name: "VZV (varicella-zoster virus)", fam: "Herpesviridae", type: "Enveloped dsDNA"},
  ebv: {name: "EBV (Epstein-Barr virus)", fam: "Herpesviridae", type: "Enveloped dsDNA"},
  hhv6: {name: "HHV-6", fam: "Herpesviridae", type: "Enveloped dsDNA"},
  hhv8: {name: "HHV-8 (Kaposi sarcoma herpesvirus)", fam: "Herpesviridae", type: "Enveloped dsDNA"},
  hbv: {name: "HBV (hepatitis B virus)", fam: "Hepadnaviridae", type: "Enveloped DNA"},
  adeno: {name: "Adenovirus", fam: "Adenoviridae", type: "Non-enveloped dsDNA"},
  jc: {name: "JC virus", fam: "Polyomaviridae", type: "Non-enveloped dsDNA"},
  bk: {name: "BK virus", fam: "Polyomaviridae", type: "Non-enveloped dsDNA"},
  hpv: {name: "HPV (human papillomavirus)", fam: "Papillomaviridae", type: "Non-enveloped dsDNA"},
  b19: {name: "Parvovirus B19", fam: "Parvoviridae", type: "Non-enveloped ssDNA"},
  cov: {name: "Coronaviruses (incl. SARS-CoV-2)", fam: "Coronaviridae", type: "Enveloped +ssRNA"},
  yf: {name: "Yellow fever virus", fam: "Flaviviridae", type: "Enveloped +ssRNA"},
  dengue: {name: "Dengue virus", fam: "Flaviviridae", type: "Enveloped +ssRNA"},
  zika: {name: "Zika virus", fam: "Flaviviridae", type: "Enveloped +ssRNA"},
  wnv: {name: "West Nile virus", fam: "Flaviviridae", type: "Enveloped +ssRNA"},
  hcv: {name: "HCV (hepatitis C virus)", fam: "Flaviviridae", type: "Enveloped +ssRNA"},
  ev: {name: "Enterovirus", fam: "Picornaviridae", type: "Non-enveloped +ssRNA"},
  polio: {name: "Poliovirus", fam: "Picornaviridae", type: "Non-enveloped +ssRNA"},
  rubella: {name: "Rubella virus", fam: "Matonaviridae", type: "Enveloped +ssRNA"},
  hiv: {name: "HIV", fam: "Retroviridae", type: "Enveloped +ssRNA (retrovirus)"},
  measles: {name: "Measles virus", fam: "Paramyxoviridae", genus: "Morbillivirus", type: "Enveloped −ssRNA"},
  mumps: {name: "Mumps virus", fam: "Paramyxoviridae", genus: "Orthorubulavirus", type: "Enveloped −ssRNA"},
  rsv: {name: "RSV (respiratory syncytial virus)", fam: "Pneumoviridae", type: "Enveloped −ssRNA"},
  rabies: {name: "Rabies virus", fam: "Rhabdoviridae", type: "Enveloped −ssRNA"},
  flu: {name: "Influenza virus (A, B, C)", fam: "Orthomyxoviridae", type: "Enveloped −ssRNA"}
};
/* where each virus causes disease (or hides), by body area. Examples from the slides, not a complete list. */
var VDZ = {
  brain: [["rabies", "rabies: brain infection → agitation, fear of water, death"], ["jc", "PML (brain infection) in severely immunocompromised people"], ["wnv", "West Nile: encephalitis or meningitis"], ["hhv6", "rare: brain infection in immunocompromised patients"]],
  eyes: [["adeno", "pink eye"], ["zika", "Zika: conjunctivitis"]],
  nose: [["adeno", "cold-like illness; hides (latency) in the tonsils and adenoids"], ["cov", "common colds"], ["ebv", "mono: sore throat, swollen lymph nodes"], ["ev", "hand-foot-and-mouth disease: sore throat"], ["measles", "measles starts with cold-like symptoms"]],
  mouth: [["hsv1", "cold sores (fever blisters); canker sores are NOT viral"], ["mumps", "mumps: swollen, painful salivary glands"], ["ev", "hand-foot-and-mouth disease: rash in the mouth"]],
  lungs: [["cov", "COVID-19, SARS, MERS"], ["rsv", "pneumonia-like illness; the most common cause of viral respiratory illness in infants"], ["flu", "influenza: chills, fever, headache, muscle aches"], ["adeno", "pneumonia-like illness"]],
  heart: [["hiv", "AIDS: infects helper T cells; hides in memory T cells"], ["b19", "infects red blood cell precursors"], ["ebv", "hides in B cells; linked to B cell lymphomas"], ["hhv8", "Kaposi sarcoma: cancer of the blood vessel lining"], ["yf", "yellow fever: bleeding"]],
  stomach: [],
  liver: [["hbv", "hepatitis B: jaundice; chronic → cirrhosis, liver cancer. Hides in liver cells"], ["hcv", "hepatitis C: chronic liver disease, cirrhosis, liver cancer"], ["yf", "yellow fever: jaundice"]],
  gut: [["polio", "enters by the fecal-oral route and multiplies in the throat and small intestine"]],
  urinary: [["bk", "bladder and kidney damage; kidney transplant failure"], ["jc", "hides (latency) in the kidneys"]],
  repro: [["hsv2", "genital herpes"], ["hpv", "HPV 6, 11: genital warts. HPV 16, 18: cervical cancer"], ["mumps", "can inflame the testes"], ["rubella", "infection during pregnancy → birth defects"]],
  skin: [["variola", "smallpox: pus-filled rash that scars"], ["vzv", "chickenpox rash; shingles (painful lesions when it reactivates)"], ["measles", "measles: rash from the face to the trunk"], ["rubella", "rubella: mild rash"], ["hhv6", "roseola: rash once the fever breaks"], ["b19", "fifth disease: \"slapped-cheek\" rash"], ["hhv8", "Kaposi sarcoma: purple skin lesions"], ["ev", "hand-foot-and-mouth disease: rash on the hands and feet"], ["dengue", "dengue: rash"], ["zika", "Zika: rash"], ["hpv", "hides (latency) in epithelial cells of the skin and cervix"]],
  nerves: [["vzv", "hides in dorsal root and cranial nerve ganglia; reactivates as shingles (burning pain)"], ["hsv1", "hides (latency) in the trigeminal nerve ganglia (face)"], ["hsv2", "hides (latency) in the sacral ganglia (pelvis)"], ["polio", "rarely paralysis, if the virus spreads from the blood to nerves"], ["rabies", "travels from the bite along nerves to the brain"], ["dengue", "dengue: severe joint and muscle pain"], ["flu", "influenza: muscle aches"]],
  bones: []
};
SITES.forEach(function(s){ s.vdz = VDZ[s.id] || []; });

var GENUS_OF = {sgriseus: "@streptomyces", saureus: "@staphylococcus", sepi: "@staphylococcus", ssapro: "@staphylococcus", spneumoniae: "@streptococcus", spyogenes: "@streptococcus", sagalactiae: "@streptococcus", cacnes: "@cutibacterium", aisraelii: "@actinomyces", fuso: "@fusobacteria", nmen: "@neisseria", ngon: "@neisseria", cdiphtheriae: "@corynebacterium", paeruginosa: "@pseudomonas", cperfringens: "@clostridia", ctetani: "@clostridia", cbotulinum: "@clostridia"};
/* species cards whose genus (not the species itself) is listed as normal flora in the slides */
var ALIAS = {cacnes: "@cutibacterium", aisraelii: "@actinomyces", mluteus: "@micrococcus", mroseus: "@micrococcus", fuso: "@fusobacteria", bactero: "@bacteroidetes"};
/* the body areas where an organism is normal flora (mode "flora") or causes disease (mode "dz") */
function sitesFor(id, mode){
  return SITES.filter(function(s){
    return mode === "dz" ? s.dz.some(function(d){ return d[0] === id; })
      : s.flora.some(function(x){ return x === id || (ALIAS[id] && x.split("|")[0] === ALIAS[id]); });
  }).map(function(s){ return s.id; });
}
window.BODYMAP = {SITES: SITES, GENUS_OF: GENUS_OF, ALIAS: ALIAS, sitesFor: sitesFor, VIRUSES: VIRUSES};
})();
