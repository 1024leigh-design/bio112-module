/* =====================================================================
   Gram-Negative Family Tree Tour: DATA FILE (BIO 112, Ch. 11 Part 1)

   The page code lives in ch11-gram-neg-tour.html. To build a new tour
   (Firmicutes, Actinobacteria), copy that page, point its <script src>
   at a new data file with this same shape, and edit only the data.

   Shape:
     tree      nodes in display order. parent = id of parent node.
               traits = chips this node ADDS to the trait ribbon.
               A trait with "blank" becomes a dropdown in Test mode.
               blankLabel: true = branch name becomes a word-bank blank in Test mode.
               locked / muted = grayed out, with a message instead of a stop.
     stops     tour order. node = where the tour sits on the tree.
               also = extra tree nodes that open this stop.
               orgs = organism cards (or phylum cards with type: "phylum").
     checkins  multiple choice, first option is correct (shuffled on screen).
     enteric   reference table (section 8 of the brief).

   Writing rules: no em dashes in any on-screen text. Use the minus sign (−)
   for negative test results.
   ===================================================================== */
window.TOUR_DATA = {
  id: "gram-neg",
  brand: "BIO 112 · Ch. 11",
  eyebrow: "Chapter 11, Part 1 · Gram-negative bacteria",
  title: "Gram-Negative <span>Family Tree</span> Tour",
  plainTitle: "Gram-Negative Family Tree Tour",
  intro: "Walk down the bacterial family tree one branch at a time. Every organism inherits the traits of the branches above it.",
  goals: [
    "Place each gram-negative organism on the family tree and explain how the groups are related.",
    "Explain <b>why</b> an organism has its ID traits (it inherits them from the branches above it).",
    "Use lab results to identify an organism.",
    "Name the disease each organism causes, how it spreads, and how it's treated."
  ],
  tabs: [
    {label: "Gram-negative", current: true},
    {label: "Gram-positive (coming soon)", soon: "Coming soon: Firmicutes and Actinobacteria"}
  ],
  /* related games: TODO add real URLs (not in this repo yet). Entries with no href show as "link coming soon". */
  games: [
    {title: "Mystery Microbe", href: ""},
    {title: "Microbe Match", href: ""},
    {title: "Disease Typing Game", href: ""}
  ],
  wordBank: ["Alpha", "Beta", "Gamma", "Epsilon", "Enterics", "Coliforms", "Non-coliforms"],

  tree: [
    {id: "bacteria", label: "Bacteria", color: "#64748b",
      traits: [
        {t: "prokaryote", blank: {pre: "", post: "", a: "prokaryote", o: ["prokaryote", "eukaryote"], why: "All bacteria are prokaryotes: no nucleus."}},
        {t: "no nucleus"}
      ]},
    {id: "gramneg", label: "Gram-negative", parent: "bacteria", color: "#db2777",
      traits: [
        {t: "pink Gram stain", blank: {pre: "", post: " Gram stain", a: "pink", o: ["pink", "purple"], why: "Thin peptidoglycan lets the crystal violet wash out, so gram-negatives pick up the pink safranin."}},
        {t: "thin peptidoglycan"},
        {t: "outer membrane with LPS"}
      ]},
    {id: "proteo", label: "Proteobacteria", parent: "gramneg", color: "#2563eb",
      traits: [{t: "largest group of bacteria"}, {t: "mostly chemoheterotrophs"}]},
    {id: "alpha", label: "Alpha", full: "Alphaproteobacteria", parent: "proteo", color: "#b45309", blankLabel: true,
      traits: [{t: "many grow with very low nutrients", blank: {pre: "many grow with very ", post: " nutrients", a: "low", o: ["low", "high"], why: "Many alphaproteobacteria can grow with very low nutrient levels."}}]},
    {id: "rickettsia", label: "Rickettsia", parent: "alpha", italic: true},
    {id: "beta", label: "Beta", full: "Betaproteobacteria", parent: "proteo", color: "#0e7490", blankLabel: true,
      note: "none extra (Beta is a grouping; the traits live on each genus)"},
    {id: "bordetella", label: "Bordetella", parent: "beta", italic: true},
    {id: "neisseria", label: "Neisseria", parent: "beta", italic: true, color: "#4f46e5",
      traits: [
        {t: "gram-negative diplococci", blank: {pre: "gram-negative ", post: "", a: "diplococci", o: ["diplococci", "rods", "spirals"], why: "Neisseria are diplococci: round cells in pairs."}},
        {t: "obligate aerobes"},
        {t: "oxidase +"},
        {t: "grow on chocolate agar + CO₂"}
      ]},
    {id: "ngon", label: "N. gonorrhoeae", parent: "neisseria", italic: true},
    {id: "nmen", label: "N. meningitidis", parent: "neisseria", italic: true},
    {id: "gamma", label: "Gamma", full: "Gammaproteobacteria", parent: "proteo", color: "#7c3aed", blankLabel: true,
      traits: [{t: "largest proteobacteria class"}]},
    {id: "obligate", label: "Obligate aerobes", parent: "gamma", color: "#0f766e",
      traits: [{t: "require oxygen", blank: {pre: "", post: " oxygen", a: "require", o: ["require", "don't need"], why: "Obligate aerobes must have oxygen to grow."}}]},
    {id: "pseudomonas", label: "Pseudomonas", parent: "obligate", italic: true},
    {id: "legionella", label: "Legionella", parent: "obligate", italic: true},
    {id: "facultative", label: "Facultative anaerobes", parent: "gamma", color: "#15803d",
      traits: [{t: "grow with or without oxygen", blank: {pre: "grow ", post: " oxygen", a: "with or without", o: ["with or without", "only with", "only without"], why: "Facultative anaerobes grow with or without oxygen."}}]},
    {id: "enterics", label: "Enterics", parent: "facultative", color: "#ea580c", blankLabel: true,
      traits: [
        {t: "rod"},
        {t: "ferment sugars"},
        {t: "oxidase −", blank: {pre: "oxidase ", post: "", a: "−", o: ["+", "−"], why: "Enterics are oxidase −. That is one way to tell them from Vibrio, which is oxidase +."}},
        {t: "live in the intestines"}
      ]},
    {id: "coliforms", label: "Coliforms", parent: "enterics", color: "#9d174d", blankLabel: true,
      traits: [{t: "lactose +", strong: true, blank: {pre: "lactose ", post: "", a: "+", o: ["+", "−"], why: "Coliforms are the enterics that ferment lactose: pink colonies on MacConkey agar."}}]},
    {id: "ecoli", label: "E. coli", parent: "coliforms", italic: true},
    {id: "klebsiella", label: "Klebsiella", parent: "coliforms", italic: true},
    {id: "enterobacter", label: "Enterobacter", parent: "coliforms", italic: true},
    {id: "noncoliforms", label: "Non-coliforms", parent: "enterics", color: "#0369a1", blankLabel: true,
      traits: [{t: "lactose −", strong: true, blank: {pre: "lactose ", post: "", a: "−", o: ["+", "−"], why: "Non-coliforms don't ferment lactose: colorless colonies on MacConkey agar."}}]},
    {id: "salmonella", label: "Salmonella", parent: "noncoliforms", italic: true},
    {id: "shigella", label: "Shigella", parent: "noncoliforms", italic: true},
    {id: "proteus", label: "Proteus", parent: "noncoliforms", italic: true},
    {id: "yersinia", label: "Yersinia", parent: "noncoliforms", italic: true},
    {id: "serratia", label: "Serratia", parent: "noncoliforms", italic: true},
    {id: "vibrio", label: "Vibrio", parent: "facultative", italic: true},
    {id: "delta", label: "Delta", parent: "proteo", muted: "Deltaproteobacteria are not covered in BIO 112."},
    {id: "epsilon", label: "Epsilon", full: "Epsilonproteobacteria", parent: "proteo", color: "#be123c", blankLabel: true,
      traits: [
        {t: "spiral or curved rods"},
        {t: "microaerophilic (need low oxygen)", blank: {pre: "oxygen: ", post: "", a: "microaerophilic", o: ["microaerophilic", "obligate aerobe", "obligate anaerobe"], why: "Epsilons are microaerophilic: they need oxygen, but less than the air has."}},
        {t: "highly motile"}
      ]},
    {id: "campylobacter", label: "Campylobacter", parent: "epsilon", italic: true},
    {id: "helicobacter", label: "Helicobacter", parent: "epsilon", italic: true},
    {id: "spirochetes", label: "Spirochetes", parent: "gramneg", color: "#a16207",
      traits: [
        {t: "all gram-negative (stain poorly)"},
        {t: "corkscrew shape"},
        {t: "axial filaments", blank: {pre: "moves with ", post: "", a: "axial filaments", o: ["axial filaments", "external flagella"], why: "Axial filaments are flagella that run inside the cell, between the inner and outer membranes."}}
      ]},
    {id: "treponema", label: "Treponema", parent: "spirochetes", italic: true},
    {id: "borrelia", label: "Borrelia", parent: "spirochetes", italic: true},
    {id: "chlamydiae", label: "Chlamydiae", parent: "gramneg", color: "#a21caf",
      traits: [
        {t: "obligate intracellular", blank: {pre: "", post: "", a: "obligate intracellular", o: ["obligate intracellular", "free-living"], why: "Chlamydia can only reproduce inside host cells."}},
        {t: "two-form life cycle"}
      ]},
    {id: "chlamydia", label: "Chlamydia", parent: "chlamydiae", italic: true},
    {id: "planctomycetes", label: "Planctomycetes", parent: "gramneg", color: "#4d7c0f"},
    {id: "fusobacteria", label: "Fusobacteria", parent: "gramneg", color: "#9a3412"},
    {id: "cyanobacteria", label: "Cyanobacteria", parent: "gramneg", color: "#0d9488"},
    {id: "bacteroidetes", label: "Bacteroidetes", parent: "gramneg", color: "#57534e"},
    {id: "grampos", label: "Gram-positive", parent: "bacteria", locked: "Coming soon: Firmicutes and Actinobacteria"}
  ],

  stops: [
    /* ---------- 1 ---------- */
    {id: "big-tree", node: "bacteria", title: "The Big Tree", full: true,
      lesson: [
        "All bacteria belong to the domain <b>Bacteria</b>. There are about 40 known phyla, and that number keeps changing as we discover more.",
        "In the lab, one of the first things we do with an unknown is a <b>Gram stain</b>. It sorts bacteria into two big groups based on their <b>cell wall</b>.",
        "Gram stain groups aren't a perfect family tree, but they're the first branch point we use in lab, so we'll use them to organize this tour.",
        "Today: the <b>gram-negatives</b>. The gram-positives are coming in the next module."
      ]},
    /* ---------- 2 ---------- */
    {id: "gram-negative", node: "gramneg", title: "Gram-negative bacteria", diagram: "gramwall",
      lesson: [
        "Gram-negative cells have a <b>thin peptidoglycan layer</b> and an <b>outer membrane</b>. The crystal violet washes out during decolorizing, so the cells pick up the pink safranin.",
        "The outer membrane contains <b>LPS (endotoxin)</b>. When gram-negative cells die and break apart, LPS is released and can cause fever and septic shock.",
        "The outer membrane is also a barrier that keeps some antibiotics out.",
        "<b>Major gram-negative phyla:</b> Proteobacteria (the big one!), Spirochetes, Chlamydiae, Planctomycetes, Fusobacteria, Cyanobacteria, Bacteroidetes."
      ]},
    /* ---------- 3 ---------- */
    {id: "proteobacteria", node: "proteo", title: "Proteobacteria",
      lesson: [
        "Proteobacteria are the <b>largest</b> group of bacteria.",
        "Most are <b>chemoheterotrophs</b>: they get energy from chemicals and carbon from organic molecules.",
        "Proteobacteria are split into <b>five classes</b> named with Greek letters: <b>Alpha, Beta, Gamma, Delta, Epsilon</b>.",
        "We'll cover four of them. Delta isn't on our list."
      ]},
    /* ---------- 4 ---------- */
    {id: "alpha", node: "alpha", title: "Alphaproteobacteria",
      lesson: [
        "Many alphaproteobacteria can grow with very low nutrient levels.",
        "Some have unusual shapes, like stalks or buds (<i>Caulobacter</i>).",
        "Some are <b>obligate intracellular parasites</b>: they can only grow inside a host cell. That's our pathogen here."
      ],
      orgs: [
        {id: "rrickettsii", node: "rickettsia", name: "Rickettsia rickettsii", shape: "rod",
          only: ["tiny rod", "obligate intracellular"],
          ids: [
            {t: "tiny gram-negative rod"},
            {t: "obligate intracellular (won't grow on agar plates)", q: "Grows", a: "only inside host cells", o: ["only inside host cells", "on regular agar plates"]}
          ],
          disease: {short: "Rocky Mountain spotted fever", html: "Rocky Mountain spotted fever"},
          spread: {label: "How it spreads", html: "tick bites"},
          treat: {label: "Treatment", short: "doxycycline", html: "doxycycline", drugs: ["doxycycline"]}}
      ]},
    /* ---------- 5 ---------- */
    {id: "beta-bordetella", node: "beta", title: "Betaproteobacteria and <i>Bordetella</i>", also: ["bordetella"],
      lesson: [
        "Our two beta genera are <b><i>Bordetella</i></b> and <b><i>Neisseria</i></b>.",
        "<i>Bordetella</i> is a small gram-negative <b>coccobacillus</b> (a very short rod, almost round)."
      ],
      orgs: [
        {id: "bpertussis", node: "bordetella", name: "Bordetella pertussis", shape: "coccobacillus",
          only: ["coccobacillus", "aerobic", "oxidase +", "catalase +"],
          ids: [
            {t: "small gram-negative coccobacillus", q: "Shape", a: "coccobacillus", o: ["coccobacillus", "diplococcus", "spiral"]},
            {t: "aerobic"},
            {t: "oxidase +", q: "Oxidase", a: "+", o: ["+", "−"]},
            {t: "catalase +", q: "Catalase", a: "+", o: ["+", "−"]},
            {t: "needs special media to grow"}
          ],
          disease: {short: "whooping cough", html: "whooping cough (\"100 day cough\"); most dangerous for infants under 6 months",
            more: {h: "How it causes disease", items: [
              "<b>Tracheal cytotoxin</b> kills ciliated airway cells → mucus builds up → coughing fits",
              "<b>Pertussis toxin</b> weakens the immune response",
              "The \"whoop\" is the gasp for air after a coughing fit"
            ]}},
          spread: {label: "How it spreads", html: "respiratory droplets"},
          treat: {label: "Treatment / prevention", short: "azithromycin or clarithromycin; DTaP / Tdap vaccine", html: "azithromycin or clarithromycin (best early); vaccine (DTaP / Tdap)", drugs: ["azithromycin", "clarithromycin", "vaccine"]},
          extra: [{h: "Why cases are rising", items: ["waning vaccine immunity", "better detection", "vaccine hesitancy"]}]}
      ]},
    /* ---------- 6 ---------- */
    {id: "neisseria", node: "neisseria", title: "<i>Neisseria</i>",
      lesson: [
        "<i>Neisseria</i> are <b>diplococci</b>: round cells in pairs (they look like two kidney beans).",
        "Both species share the same traits from this branch. The <b>sugar fermentation test</b> tells them apart:<ul><li><i>N. gonorrhoeae</i> ferments <b>glucose only</b></li><li><i>N. meningitidis</i> ferments <b>glucose AND maltose</b></li></ul>"
      ],
      orgs: [
        {id: "ngon", node: "ngon", name: "Neisseria gonorrhoeae", shape: "diplococcus",
          only: ["glucose only"],
          ids: [{t: "ferments glucose only (not maltose)", q: "Sugars fermented", a: "glucose only", o: ["glucose only", "glucose and maltose", "lactose", "none"]}],
          disease: {short: "gonorrhea", html: "gonorrhea",
            more: {h: "Symptoms", items: [
              "<b>Women:</b> often no symptoms, possible discharge, PID",
              "<b>Men:</b> painful urination, pus-like discharge",
              "<b>Newborns:</b> eye infection that can cause blindness"
            ]}},
          spread: {label: "How it spreads", html: "sexual contact; mother to infant during birth"},
          treat: {label: "Treatment", short: "ceftriaxone", html: "ceftriaxone (resistance keeps evolving!)", drugs: ["ceftriaxone"]},
          extra: [{h: "No vaccine", items: ["It has high antigenic variation (it keeps changing its surface proteins)."]}]},
        {id: "nmen", node: "nmen", name: "Neisseria meningitidis", shape: "diplococcus",
          only: ["glucose + maltose"],
          ids: [{t: "ferments glucose AND maltose", q: "Sugars fermented", a: "glucose and maltose", o: ["glucose only", "glucose and maltose", "lactose", "none"]}],
          disease: {short: "meningococcal meningitis", html: "meningococcal meningitis. Fever, headache, stiff neck, nausea, purple rash. Can be fatal, even with treatment."},
          spread: {label: "How it spreads", html: "respiratory droplets, close contact. Lives in the human nasopharynx.",
            more: {h: "At risk", items: ["young children, teens, people in dorms or the military"]}},
          treat: {label: "Treatment / prevention", short: "ceftriaxone; vaccine", html: "ceftriaxone; vaccine", drugs: ["ceftriaxone", "vaccine"]}}
      ],
      checkin: {
        q: "An oxidase +, gram-negative diplococcus ferments glucose and maltose. What is it?",
        o: ["<i>N. meningitidis</i>", "<i>N. gonorrhoeae</i>", "<i>Bordetella pertussis</i>", "<i>E. coli</i>"],
        w: "Both <i>Neisseria</i> are oxidase + diplococci. Only <i>N. meningitidis</i> ferments maltose."
      }},
    /* ---------- 7 ---------- */
    {id: "gamma", node: "gamma", title: "Gammaproteobacteria",
      lesson: [
        "Gamma has the most pathogens on our list. We split it by <b>oxygen needs</b>:<ul><li><b>Obligate aerobes:</b> <i>Pseudomonas</i>, <i>Legionella</i></li><li><b>Facultative anaerobes:</b> the enterics and <i>Vibrio</i></li></ul>"
      ]},
    /* ---------- 8 ---------- */
    {id: "pseudomonas", node: "obligate", title: "Obligate aerobes: <i>Pseudomonas</i>",
      lesson: [
        "<i>Pseudomonas</i> is everywhere in soil and water.",
        "It is an <b>opportunistic pathogen</b>: it mostly infects people whose defenses are already down, like patients with burns or wounds."
      ],
      orgs: [
        {id: "paeruginosa", node: "pseudomonas", name: "Pseudomonas aeruginosa", shape: "rod",
          only: ["lactose −", "oxidase +", "polar flagella", "greenish, pearly colonies"],
          ids: [
            {t: "gram-negative rod"},
            {t: "obligate aerobe", q: "Oxygen", a: "obligate aerobe", o: ["obligate aerobe", "facultative anaerobe", "microaerophilic"]},
            {t: "lactose −", q: "Lactose", a: "−", o: ["+", "−"]},
            {t: "oxidase +", q: "Oxidase", a: "+", o: ["+", "−"]},
            {t: "polar flagella"},
            {t: "greenish, pearly colonies"}
          ],
          disease: {short: "burn and wound infections, sepsis, swimmer's ear", html: "burn and wound infections, sepsis (hospitals), eye infections (contact lenses), swimmer's ear, UTIs", tags: ["wound", "sepsis", "uti", "eye", "hospital"]},
          spread: {label: "Found in", html: "soil, water, hospitals"},
          extra: [{h: "Related species", items: ["<i>P. fluorescens</i> is a major cause of refrigerated food spoilage"]}]}
          /* TODO: brief gives no treatment for P. aeruginosa */
      ]},
    /* ---------- 9 ---------- */
    {id: "legionella", node: "legionella", title: "<i>Legionella</i>",
      lesson: [
        "<i>Legionella</i> was named after a 1976 pneumonia outbreak at an American Legion convention (\"Legionnaires' disease\").",
        "It doesn't grow on the usual agar media. It needs special media to isolate and culture.",
        "In nature, it lives in water and <b>reproduces inside amoebae</b>."
      ],
      orgs: [
        {id: "lpneumophila", node: "legionella", name: "Legionella pneumophila", shape: "rod",
          only: ["needs special media"],
          ids: [
            {t: "gram-negative rod"},
            {t: "obligate aerobe", q: "Oxygen", a: "obligate aerobe", o: ["obligate aerobe", "facultative anaerobe", "microaerophilic"]},
            {t: "needs special media", q: "Media", a: "needs special media", o: ["needs special media", "grows on the usual agar"]}
          ],
          disease: {short: "Legionnaires' disease", html: "Legionnaires' disease (pneumonia)", tags: ["pneumonia"]},
          spread: {label: "How it spreads", html: "breathing in contaminated water droplets from building water systems (cooling towers, hot tubs, showers). <b>Not spread person to person.</b>",
            more: {h: "At risk", items: ["hospital patients, immunocompromised people, people exposed to contaminated water systems"]}}}
          /* TODO: brief gives no treatment for Legionella */
      ],
      checkin: {
        q: "Several hotel guests get pneumonia after using the same hot tub. None of their family members at home get sick. Most likely cause?",
        o: ["<i>Legionella</i>", "<i>Neisseria meningitidis</i>", "<i>Bordetella pertussis</i>", "<i>Rickettsia</i>"],
        w: "<i>Legionella</i> spreads from contaminated water droplets, not from person to person."
      }},
    /* ---------- 10 ---------- */
    {id: "enterics", node: "enterics", title: "Facultative anaerobes and the Enterics", also: ["facultative"], diagram: "macconkey", entericTable: true,
      lesson: [
        "The <b>enterics</b> (order Enterobacteriales) live in the <b>intestinal tracts</b> of humans and animals.",
        "They're all gram-negative rods and facultative anaerobes, and they ferment carbohydrates. Most have peritrichous flagella and fimbriae for attaching to surfaces.",
        "They all look alike under the microscope, so we ID them with <b>biochemical tests</b>. The first big split is <b>lactose fermentation</b>:<ul><li><b>Coliforms</b> ferment lactose → pink colonies on MacConkey agar</li><li><b>Non-coliforms</b> don't → colorless colonies on MacConkey agar</li></ul>",
        "The next tool is the <b>IMViC</b> panel: <b>I</b>ndole, <b>M</b>ethyl red, <b>V</b>oges-Proskauer, <b>C</b>itrate. Results are written in that order, like ++−−."
      ]},
    /* ---------- 11 ---------- */
    {id: "coliforms", node: "coliforms", title: "Coliforms", entericTable: true,
      lesson: [
        "All three coliforms ferment lactose. To tell them apart, use IMViC:<ul><li><i>E. coli</i> is <b>++−−</b></li><li><i>Klebsiella</i> and <i>Enterobacter</i> are the opposite: <b>−−++</b></li></ul>"
      ],
      orgs: [
        {id: "ecoli", node: "ecoli", name: "Escherichia coli", shape: "rod",
          only: ["IMViC ++−−"],
          ids: [
            {t: "IMViC ++−−", q: "IMViC", a: "++−−", o: ["++−−", "−−++", "−+−+", "−+−−"]},
            {t: "negative for all the other tests we run in our lab"}
          ],
          disease: {short: "#1 cause of UTIs and traveler's diarrhea", html: "#1 cause of UTIs and traveler's diarrhea", tags: ["uti", "gi"]},
          spread: {label: "Found in", html: "the intestines (normal flora)"},
          hook: "UTIs are more common in females because of the shorter urethra."},
          /* TODO: brief gives no treatment for E. coli */
        {id: "kpneumoniae", node: "klebsiella", name: "Klebsiella pneumoniae", shape: "rod",
          only: ["IMViC −−++", "non-motile", "urease + (slow)"],
          ids: [
            {t: "IMViC −−++", q: "IMViC", a: "−−++", o: ["++−−", "−−++", "−+−+", "−+−−"]},
            {t: "non-motile"},
            {t: "urease + (slow)", q: "Urease", a: "+ (slow)", o: ["+ (slow)", "−"]}
          ],
          disease: {short: "aspiration pneumonia", html: "aspiration pneumonia, often hospital-acquired", tags: ["pneumonia", "hospital"]},
          spread: {label: "Found in", html: "soil and water (it fixes nitrogen)"}},
        {id: "enterobacter", node: "enterobacter", name: "Enterobacter", shape: "rod",
          only: ["IMViC −−++"],
          ids: [{t: "IMViC −−++", q: "IMViC", a: "−−++", o: ["++−−", "−−++", "−+−+", "−+−−"]}],
          disease: {short: "hospital-acquired infections", html: "hospital-acquired infections", tags: ["hospital"]},
          extra: [{h: "Species", items: [
            "<i>E. aerogenes</i> (now called <i>Klebsiella aerogenes</i>): urease −",
            "<i>E. cloacae</i>: urease + (slow)"
          ]}]}
      ],
      checkin: {
        q: "An enteric is lactose + with IMViC −−++. Which could it be?",
        o: ["<i>Klebsiella</i> or <i>Enterobacter</i>", "<i>E. coli</i>", "<i>Salmonella</i>", "<i>Proteus</i>"],
        w: "<i>E. coli</i> is ++−−. <i>Klebsiella</i> and <i>Enterobacter</i> share the opposite pattern, −−++."
      }},
    /* ---------- 12 ---------- */
    {id: "non-coliforms", node: "noncoliforms", title: "Non-coliforms", entericTable: true,
      lesson: [
        "Non-coliforms don't ferment lactose, so they make colorless colonies on MacConkey agar.",
        "To tell them apart, look at <b>H₂S</b>, <b>citrate</b>, and <b>urease</b>.",
        "Watch for the classic look-alike pair: <b><i>Salmonella</i></b> (H₂S +, citrate +) vs <b><i>Shigella</i></b> (H₂S −, citrate −)."
      ],
      orgs: [
        {id: "salmonella", node: "salmonella", name: "Salmonella", shape: "rod",
          only: ["IMViC −+−+", "H₂S +", "citrate +"],
          ids: [
            {t: "IMViC −+−+", q: "IMViC", a: "−+−+", o: ["++−−", "−−++", "−+−+", "−+−−"]},
            {t: "H₂S +", q: "H₂S", a: "+", o: ["+", "−"]},
            {t: "citrate +", q: "Citrate", a: "+", o: ["+", "−"]}
          ],
          disease: {short: "salmonellosis (food poisoning) and typhoid fever", html: "Species and diseases:",
            more: {items: [
              "<i>S. enterica</i> serovar Enteritidis: food poisoning (salmonellosis)",
              "<i>S.</i> Typhi: typhoid fever, the most severe <i>Salmonella</i> illness. Prevented by clean water and sanitation. Exception: <i>S.</i> Typhi is citrate − with weak H₂S."
            ]}, tags: ["gi"]},
          spread: {label: "Found in", html: "poultry and other animals (raw meat)"}},
        {id: "shigella", node: "shigella", name: "Shigella", shape: "rod",
          only: ["H₂S −", "citrate −"],
          ids: [
            {t: "H₂S −", q: "H₂S", a: "−", o: ["+", "−"]},
            {t: "citrate − (opposite of <i>Salmonella</i>)", q: "Citrate", a: "−", o: ["+", "−"]}
          ],
          disease: {short: "shigellosis (bacillary dysentery)", html: "shigellosis (bacillary dysentery)", tags: ["gi"]},
          spread: {label: "Found in", html: "humans only"},
          extra: [{h: "Species", items: ["<i>S. sonnei</i>, <i>S. boydii</i>, <i>S. flexneri</i>"]}]},
        {id: "proteus", node: "proteus", name: "Proteus", shape: "rod",
          only: ["urease +", "H₂S +", "swarms"],
          ids: [
            {t: "urease +", q: "Urease", a: "+", o: ["+", "−"]},
            {t: "H₂S +", q: "H₂S", a: "+", o: ["+", "−"]},
            {t: "swarms across the agar; strong odor"},
            {t: "IMViC: <i>P. vulgaris</i> ++−v; <i>P. mirabilis</i> −+−+ (v = variable)"}
          ],
          disease: {short: "opportunistic UTIs and wound infections", html: "opportunistic UTIs and wound infections", tags: ["uti", "wound"]}},
        {id: "ypestis", node: "yersinia", name: "Yersinia pestis", shape: "rod",
          only: ["IMViC −+−−"],
          ids: [
            {t: "lactose −", q: "Lactose", a: "−", o: ["+", "−"]},
            {t: "IMViC −+−−", q: "IMViC", a: "−+−−", o: ["++−−", "−−++", "−+−+", "−+−−"]}
          ],
          disease: {short: "plague", html: "plague",
            more: {items: [
              "<b>Bubonic:</b> infects lymph nodes → bubos (swollen, painful nodes)",
              "<b>Septicemic:</b> infects the blood → gangrene, blackened skin (\"Black plague\")",
              "<b>Pneumonic:</b> infects the lungs; nearly always fatal if untreated"
            ]}},
          spread: {label: "How it spreads", html: "fleas from rats"},
          treat: {label: "Treatment", short: "streptomycin, gentamicin, doxycycline", html: "streptomycin, gentamicin, doxycycline", drugs: ["streptomycin", "gentamicin", "doxycycline"]},
          extra: [{h: "History", items: ["The 14th century pandemic killed 30 to 60% of Europe."]}]},
        {id: "smarcescens", node: "serratia", name: "Serratia marcescens", shape: "rod",
          only: ["IMViC −−++", "red pigment"],
          ids: [
            {t: "IMViC −−++", q: "IMViC", a: "−−++", o: ["++−−", "−−++", "−+−+", "−+−−"]},
            {t: "red pigment (may not form at 37°C)", q: "Pigment", a: "red", o: ["red", "green", "none"]}
          ],
          disease: {short: "hospital-acquired UTIs, pneumonia, wound infections", html: "hospital-acquired UTIs, pneumonia, wound infections, bacteremia; linked to catheters and IV lines", tags: ["hospital", "uti", "pneumonia", "wound", "sepsis"]},
          spread: {label: "Found in", html: "water, soil, bathrooms, medical equipment"}}
      ],
      checkin: {
        q: "An enteric is lactose −, H₂S +, citrate +, and urease −. What is it?",
        o: ["<i>Salmonella</i>", "<i>Shigella</i>", "<i>Proteus</i>", "<i>E. coli</i>"],
        w: "<i>Shigella</i> is H₂S − and citrate −. <i>Proteus</i> is urease +. <i>E. coli</i> is lactose +."
      }},
    /* ---------- 13 ---------- */
    {id: "vibrio", node: "vibrio", title: "<i>Vibrio</i>",
      lesson: [
        "<i>Vibrio</i> is a facultative anaerobe like the enterics, but it is <b>not</b> an enteric. One clue: <i>Vibrio</i> is <b>oxidase +</b>, while enterics are oxidase −.",
        "Shape: a <b>curved rod</b> (the macaroni! 🍝)"
      ],
      orgs: [
        {id: "vcholerae", node: "vibrio", name: "Vibrio cholerae", shape: "curved",
          only: ["curved rod", "oxidase +"],
          ids: [
            {t: "curved (comma-shaped) gram-negative rod", q: "Shape", a: "curved (comma-shaped) rod", o: ["curved (comma-shaped) rod", "diplococcus", "spirochete"]},
            {t: "oxidase +", q: "Oxidase", a: "+", o: ["+", "−"]}
          ],
          disease: {short: "cholera", html: "cholera. Cholera toxin → \"rice water\" diarrhea → severe dehydration", tags: ["gi"]},
          spread: {label: "How it spreads", html: "fecal-oral route through contaminated water and food; poor sanitation"},
          treat: {label: "Treatment", short: "rehydration first, plus doxycycline or azithromycin", html: "<b>rehydration first!</b> Plus doxycycline or azithromycin", drugs: ["rehydration", "doxycycline", "azithromycin"]}}
      ]},
    /* ---------- 14 ---------- */
    {id: "epsilon", node: "epsilon", title: "Epsilonproteobacteria",
      lesson: [
        "Our two epsilons are both curved or spiral and both are <b>microaerophilic</b>: they need oxygen, but less than the air has.",
        "Both are gut pathogens: one in the intestine, one in the stomach."
      ],
      orgs: [
        {id: "cjejuni", node: "campylobacter", name: "Campylobacter jejuni", shape: "gullwing",
          only: ["\"gull-wing\" spiral"],
          ids: [
            {t: "spiral, \"gull-wing\" shape (the cavatappi! 🍝)"},
            {t: "microaerophilic", q: "Oxygen", a: "microaerophilic", o: ["microaerophilic", "obligate aerobe", "facultative anaerobe"]}
          ],
          disease: {short: "bacterial gastroenteritis", html: "the most common cause of bacterial gastroenteritis worldwide", tags: ["gi"]},
          spread: {label: "How it spreads", html: "undercooked poultry, contaminated water, raw (unpasteurized) milk"}},
        {id: "hpylori", node: "helicobacter", name: "Helicobacter pylori", shape: "spiral",
          only: ["urease +"],
          ids: [
            {t: "spiral rod"},
            {t: "<b>urease +</b>", q: "Urease", a: "+", o: ["+", "−"]}
          ],
          disease: {short: "gastritis and peptic ulcers", html: "gastritis and peptic (stomach) ulcers",
            more: {h: "How it survives the stomach", items: ["It makes <b>urease</b>, which produces ammonia, and the ammonia neutralizes the acid around it. It is <b>not</b> an acidophile."]}},
          treat: {label: "Treatment", short: "2 antibiotics + a proton pump inhibitor", html: "2 antibiotics + a proton pump inhibitor", drugs: ["ppi"]}}
      ],
      checkin: {
        q: "How does <i>H. pylori</i> survive in the acidic stomach?",
        o: ["Urease makes ammonia, which neutralizes the acid around it", "It is an acidophile that loves low pH", "It forms endospores", "It hides inside amoebae"],
        w: "<i>H. pylori</i> makes urease, and the ammonia it produces neutralizes the acid around it. It is not an acidophile."
      }},
    /* ---------- 15 ---------- */
    {id: "spirochetes", node: "spirochetes", title: "Spirochetes", diagram: "axial",
      lesson: [
        "Spirochetes have <b>axial filaments</b>: flagella that run <b>inside</b> the cell, between the inner and outer membranes.",
        "When the filaments rotate, the whole cell twists like a corkscrew. This lets spirochetes move well through thick, viscous environments.",
        "Our two genera are <b><i>Treponema</i></b> and <b><i>Borrelia</i></b>."
      ],
      orgs: [
        {id: "tpallidum", node: "treponema", name: "Treponema pallidum", shape: "spirochete",
          only: ["very thin spirochete"],
          ids: [{t: "thin spirochete (too thin to see well with a regular light microscope)", q: "Shape", a: "spirochete", o: ["spirochete", "diplococcus", "coccobacillus"]}],
          disease: {short: "syphilis", html: "syphilis",
            more: {items: [
              "<b>Primary:</b> painless chancre",
              "<b>Secondary:</b> skin rash, including palms and soles",
              "<b>Tertiary:</b> gummas; heart and nerve damage",
              "<b>Congenital</b> (mother to fetus): bone deformities, Hutchinson's teeth, nervous system effects"
            ]}},
          spread: {label: "How it spreads", html: "sexual contact; congenital"},
          treat: {label: "Treatment", short: "penicillin G", html: "penicillin G", drugs: ["penicillin"]},
          extra: [{h: "Related", items: ["Other <i>Treponema</i> species cause bejel, yaws, and pinta, which are spread without sexual contact."]}]},
        {id: "bburgdorferi", node: "borrelia", name: "Borrelia burgdorferi", shape: "spirochete",
          /* TODO: brief gives no Key ID results for B. burgdorferi */
          disease: {short: "Lyme disease", html: "Lyme disease. Early sign: erythema migrans (\"bull's-eye\" rash), plus flu-like fever, headache, fatigue, and muscle/joint aches."},
          spread: {label: "How it spreads", html: "<i>Ixodes</i> ticks: the blacklegged (\"deer\") tick. In California, it's the western blacklegged tick. The tick usually must be attached 24 to 48+ hours to transmit it."},
          treat: {label: "Treatment / prevention", short: "doxycycline (early), amoxicillin, cefuroxime", html: "doxycycline (early), amoxicillin, cefuroxime; tick checks, repellent, protective clothing", drugs: ["doxycycline", "amoxicillin", "cefuroxime"]}},
        {id: "brf", node: "borrelia", name: "Borrelia", suffix: "(relapsing fever species)", shape: "spirochete",
          /* TODO: brief gives no Key ID results for relapsing fever Borrelia */
          disease: {short: "relapsing fever", html: "relapsing fever. High fever, chills, headache, and aches. The fever goes away, then comes back.",
            more: {h: "Why it relapses", items: ["<b>Antigenic variation.</b> <i>Borrelia</i> changes its surface proteins. The immune system clears one variant, a new variant emerges, and the fever returns."]}},
          spread: {label: "How it spreads", html: "soft ticks or body lice"},
          treat: {label: "Treatment", short: "doxycycline, erythromycin, penicillin", html: "doxycycline, erythromycin, penicillin", drugs: ["doxycycline", "erythromycin", "penicillin"]}}
      ],
      checkin: {
        q: "Why does relapsing fever keep coming back?",
        o: ["<i>Borrelia</i> changes its surface proteins, so the immune system has to start over", "The bacteria form endospores", "Antibiotics don't work on spirochetes", "The patient gets bitten by a new tick each time"],
        w: "Antigenic variation: the immune system clears one variant, a new variant emerges, and the fever returns."
      }},
    /* ---------- 16 ---------- */
    {id: "chlamydiae", node: "chlamydiae", title: "Chlamydiae", diagram: "chlamydia",
      lesson: [
        "<i>Chlamydia</i> can only reproduce <b>inside host cells</b>. It switches between two forms:<ul><li><b>Elementary body (EB):</b> infectious, but can't reproduce. Survives outside the host cell. Metabolically limited.</li><li><b>Reticulate body (RB):</b> reproduces, but not infectious. Can't survive outside the host cell. Metabolically active.</li></ul>",
        "Life cycle: EB enters the cell → becomes an RB → multiplies → turns back into EBs → EBs are released to infect new cells.",
        "Memory hook: EB = the \"delivery vehicle,\" RB = the \"factory.\""
      ],
      orgs: [
        {id: "ctrachomatis", node: "chlamydia", name: "Chlamydia trachomatis", shape: "intracellular",
          /* TODO: brief gives no Key ID results; diagnosis is listed below */
          disease: {short: "the most common bacterial STI; trachoma", html: "the most common bacterial STI (discharge, genital pain and inflammation); also trachoma (an eye infection) and pneumonia", tags: ["eye", "pneumonia"],
            more: {h: "Diagnosis", items: ["PCR, antigen detection"]}},
          treat: {label: "Treatment", short: "azithromycin, doxycycline", html: "azithromycin, doxycycline", drugs: ["azithromycin", "doxycycline"]}},
        {id: "cpneumoniae", node: "chlamydia", name: "Chlamydia pneumoniae", shape: "intracellular",
          disease: {short: "respiratory infections", html: "respiratory infections", tags: ["pneumonia"]}}
      ]},
    /* ---------- 17 ---------- */
    {id: "other-phyla", node: "gramneg", title: "The other gram-negative phyla", also: ["planctomycetes", "fusobacteria", "cyanobacteria", "bacteroidetes"], focusTree: ["planctomycetes", "fusobacteria", "cyanobacteria", "bacteroidetes"],
      lesson: [
        "Four more gram-negative phyla to know. Tap a card to see it on the tree."
      ],
      orgs: [
        {type: "phylum", id: "planct", node: "planctomycetes", name: "Planctomycetes", shape: "budding",
          items: [
            "Gram-negative bacteria that reproduce by budding",
            "Examples: <i>Planctomyces</i>, <i>Gemmata</i>, <i>Brocadia</i>",
            "Once thought to bridge prokaryotes and eukaryotes, because they have internal membrane compartments (some around the nucleoid) and sterols in their membranes"
          ]},
        {type: "phylum", id: "fuso", node: "fusobacteria", name: "Fusobacteria", shape: "spindle",
          items: [
            "Anaerobic, spindle-shaped rods",
            "Live in the mouth, gut, and genital tract",
            "Some cause periodontal (gum) disease and abscesses; opportunistic, and can help other microbes in mixed infections"
          ]},
        {type: "phylum", id: "cyano", node: "cyanobacteria", name: "Cyanobacteria", shape: "filament",
          items: [
            "Photosynthetic. Nicknamed \"blue-green algae,\" but they are bacteria, NOT algae!",
            "Use chlorophyll <i>a</i> and release O₂. They made the oxygen in early Earth's atmosphere.",
            "Some fix nitrogen in special cells called <b>heterocysts</b>",
            "Can form toxic blooms in water"
          ]},
        {type: "phylum", id: "bactero", node: "bacteroidetes", name: "Bacteroidetes", shape: "generic",
          items: [
            "Mostly anaerobic",
            "A dominant group in the human gut (along with the Firmicutes, coming in the next module!)",
            "Help digest complex carbohydrates",
            "Some can become opportunistic pathogens (e.g. <i>Bacteroides fragilis</i>)"
          ]}
      ],
      checkin: {
        q: "Which gram-negative group makes oxygen through photosynthesis?",
        o: ["Cyanobacteria", "Bacteroidetes", "Fusobacteria", "Planctomycetes"],
        w: "Cyanobacteria use chlorophyll <i>a</i> and release O₂."
      }},
    /* ---------- 18 ---------- */
    {id: "finale", node: "bacteria", title: "Finale: the full tree", full: true, finale: true,
      takeaways: [
        "Every organism inherits the traits of the branches above it.",
        "In lab, work down the tree: Gram stain → shape → oxygen / oxidase → lactose → IMViC, H₂S, citrate, urease.",
        "Same branch = similar traits, but the leaves have different diseases."
      ]}
  ],

  /* Section 8 of the brief. Motility is intentionally left out. */
  enteric: {
    cols: ["Lactose", "Indole", "MR", "VP", "Citrate", "H₂S", "Urease"],
    rows: [
      {name: "E. coli", group: "coliforms", v: ["+", "+", "+", "−", "−", "−", "−"]},
      {name: "K. pneumoniae", group: "coliforms", v: ["+", "−", "−", "+", "+", "−", "+ slow"]},
      {name: "E. aerogenes", group: "coliforms", v: ["+", "−", "−", "+", "+", "−", "−"]},
      {name: "E. cloacae", group: "coliforms", v: ["+", "−", "−", "+", "+", "−", "+ slow"]},
      {name: "Salmonella", group: "noncoliforms", v: ["−", "−", "+", "−", "+", "+", "−"]},
      {name: "Shigella", group: "noncoliforms", v: ["−", "v", "+", "−", "−", "−", "−"]},
      {name: "P. vulgaris", group: "noncoliforms", v: ["−", "+", "+", "−", "v", "+", "+"]},
      {name: "P. mirabilis", group: "noncoliforms", v: ["−", "−", "+", "−", "+", "+", "+"]},
      {name: "Y. pestis", group: "noncoliforms", v: ["−", "−", "+", "−", "−", "−", "−"]},
      {name: "S. marcescens", group: "noncoliforms", v: ["−", "−", "−", "+", "+", "−", "−"]}
    ],
    key: "+ = positive, − = negative, v = variable",
    footnote: "<i>S.</i> Typhi is the exception in <i>Salmonella</i>: citrate −, weak H₂S."
  }
};
