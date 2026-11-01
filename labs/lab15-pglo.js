/* Lab 15: Transformation (pGLO). Content from the build brief. */
VLAB.add({
  n:15, title:"Transformation (pGLO)",
  learn:[
    {tab:"Protocol", h:"Competent cells", banner:"Goal: get the pGLO plasmid into <i>E. coli</i>, then see it glow.", layout:"split", figs:[{type:"svg", name:"cacl2", wide:true}], items:[
      {t:"[[Competent]] cells can take up DNA from their surroundings."},
      {t:"We made <i>E. coli</i> competent with ice-cold 50 mM [[CaCl2|cacl2|cacl₂|calcium chloride]]."},
      {t:"Ca<sup>2+</sup> shields the [[negative]] charges on the DNA backbone and the cell membrane, so the plasmid can get close and enter.", why:"Two negative things push each other away. Ca<sup>2+</sup> sits between them."}
    ]},
    {tab:"Protocol", h:"Protocol, step by step", kind:"steps", lead:"Tap any <b>What if...?</b> button to see what would happen.", figs:[{type:"svg", name:"heatshock", wide:true, cap:"Temperature at each step (not to scale)"}],
      tip:"Try the whole protocol yourself on the <b>Practice</b> tab: move the liquids, run the heat shock timer, and shine the UV light.",
      items:[
      {pic:"pg1", t:"Add [[400 µL|400|400ul|400 ul]] of ice-cold 50 mM CaCl<sub>2</sub> to one tube. Transfer one or two colonies into it with a sterile loop. Mix well.", why:"Ice-cold CaCl<sub>2</sub> makes the cells competent.",
        whatif:[{q:"you skip the CaCl<sub>2</sub>?", a:"The DNA backbone and the cell membrane are both negative, so they push each other away. With no Ca<sup>2+</sup> to shield those charges, the plasmid cannot get close enough to enter. Very few cells take it up."}]},
      {pic:"pg2", t:"Split it in half: move [[200 µL|200|200ul|200 ul]] into a second tube. Label the tubes +pGLO and -pGLO.", why:"The -pGLO tube is the control: the same cells, with no plasmid."},
      {pic:"pg3", t:"Add [[4 µL|4|4ul|4 ul]] of rehydrated pGLO plasmid to the [[+pGLO|pglo|plus pglo|+pglo tube]] tube only.",
        whatif:[{q:"the -pGLO tube gets plasmid too?", a:"Those cells take up pGLO too, and use its bla gene to make beta-lactamase. They survive on LB/amp, so the -pGLO plate grows. You lose your control: nothing shows that ampicillin kills cells without the plasmid."}]},
      {pic:"pg4", t:"Keep both tubes on [[ice]] for about 1 hour.", why:"Ca<sup>2+</sup> shields the charges so the plasmid can get close to the cells.", whatif:[{q:"you skip the hour on ice?", a:"The cold keeps the membrane stiff while Ca<sup>2+</sup> shields the charges and the plasmid settles against the cell. Without it, there is no sudden jump from cold to hot, so the heat shock does much less. Fewer cells take up the plasmid."}]},
      {pic:"pg5", t:"Heat shock at [[42°C|42|42 c]] for [[45 seconds|45|45 sec|45 s]].", why:"Timing is critical.",
        whatif:[{q:"you heat shock too long?", a:"Heat makes the membrane more fluid. Too long, and the membrane over-solubilizes: it gets too liquid and cannot reform. The cells are damaged or killed, so few or no colonies grow."}, {q:"you heat shock too short?", a:"The membrane does not loosen enough for the plasmid to slip through. Few cells take up the plasmid, so few colonies grow on the ampicillin plates."}]},
      {pic:"pg6", t:"Back on ice for [[2 to 10|2-10|2 10]] minutes.", why:"Cools the cells back down after the heat shock.", whatif:[{q:"you skip going back on ice?", a:"The cold firms the membrane back up so it closes, trapping the plasmid inside. Without it, the membrane stays loose and fewer cells recover."}]},
      {pic:"pg7", t:"Add 200 µL [[LB]] broth. Recover at 37°C for [[1 hour|1|1 hr|one hour|60 minutes]].", why:"The cells repair and start making beta-lactamase before they meet ampicillin.",
        whatif:[{q:"you skip the recovery?", a:"The cells have not repaired their membranes or made beta-lactamase yet. Ampicillin stops cells from building their cell walls, so these weak cells burst. Fewer transformed cells survive."}]},
      {pic:"pg8", t:"Pipette [[100 µL|100|100ul|100 ul]] onto each plate. Spread with a spreader dipped in isopropanol and flamed.", why:"Each plate answers a different question.",
        whatif:[{q:"you forget the arabinose plate?", a:"Without arabinose, AraC stays in its blocking shape on the pBAD promoter. RNA polymerase cannot transcribe GFP, so no GFP is made. Transformed colonies grow on LB/amp, but they stay white."}, {q:"you use a tetracycline plate?", a:"Tetracycline stops ribosomes from making proteins. pGLO carries bla for ampicillin resistance, not a tetracycline resistance gene. Nothing grows."}]},
      {pic:"pg9", t:"Incubate [[inverted|upside down|upside-down]] at 37°C.", why:"Upside down keeps water drops from falling onto the agar.", whatif:[{q:"the plates are right side up?", a:"Water drops form on the lid and fall onto the agar. The drops spread cells around, so colonies run together."}]}
    ]},
    {tab:"Follow the cells", banner:"What happens inside the cells at each step?", kind:"facts", items:[], sim:{sim:"follow", prompt:"Watch a +pGLO cell and a -pGLO cell side by side. Answer each question to move on.", stages:[
      {id:"cacl2", short:"CaCl₂", title:"In ice-cold CaCl₂", cap:"Ca²⁺ ions surround both cells. The +pGLO tube also has plasmid floating around.",
        q:{q:"Where is the plasmid right now?", opts:["Outside the cell", "Inside the cell", "In both tubes"], a:0, keep:true, why:"It was just added to the +pGLO tube. It has not gotten in yet."}},
      {id:"ice", short:"Ice", title:"On ice, about 1 hour", cap:"The cold keeps the membrane stiff. Ca²⁺ shields the negative charges, so the plasmid can get close to the membrane.",
        q:{q:"What lets the plasmid get close to the cell?", opts:["Ca²⁺ shields the negative charges", "The heat", "Ampicillin", "Arabinose"], a:0, why:"DNA and the membrane are both negative. Ca²⁺ sits between them."}},
      {id:"heat", short:"Heat shock", title:"Heat shock: 42°C for 45 seconds", cap:"Heat makes the membrane more fluid for a moment, so some plasmid slips in. Back on ice, the membrane firms up and traps it inside.",
        q:{q:"After the heat shock, where is some of the plasmid?", opts:["Inside the cell", "Still all outside", "Destroyed by the heat"], a:0, keep:true, why:"The membrane loosens for a moment. Too long and it gets too liquid to reform, which damages or kills the cells."}},
      {id:"recover", short:"Recovery", title:"Back on ice, then LB at 37°C for 1 hour", cap:"The +pGLO cell uses the bla gene to make beta-lactamase. The -pGLO cell has no plasmid, so it makes none.",
        q:{q:"Which cell can now break down ampicillin?", opts:["The +pGLO cell", "The -pGLO cell", "Both", "Neither"], a:0, keep:true, why:"Only the +pGLO cell has bla, the gene for beta-lactamase."}},
      {id:"plate", short:"Plate", title:"Spread on LB/amp/ara and incubated at 37°C", cap:"Ampicillin (red triangles) arrives. Beta-lactamase breaks it down in the +pGLO cell. Arabinose (pink) switches on GFP. The -pGLO cell has no protection.",
        q:{q:"Why does the -pGLO cell die?", opts:["It has no bla gene, so no beta-lactamase", "It has too much GFP", "Arabinose kills it", "It is too cold"], a:0, why:"Without beta-lactamase, ampicillin kills it."}},
      {id:"uv", short:"UV light", title:"Under the UV light", cap:"The +pGLO cell grew into a colony that glows green. The -pGLO side has no colony.",
        q:{q:"What makes the colony glow?", opts:["GFP, switched on by arabinose", "Ampicillin", "Beta-lactamase", "Ca²⁺"], a:0, why:"Arabinose switches on GFP. GFP glows green under UV light."}}
    ]}},
    {tab:"The plates", banner:"Four plates. Each one answers one question.", layout:"cards", cols:"2x", cheatTitle:"Plate code cheat sheet", cheat:[
      ["LB", "The nutrient agar: food for the bacteria. Every plate has it. (LB = lysogeny broth, also called Luria-Bertani.)"],
      ["amp", "Ampicillin, an antibiotic. It kills cells that do not have the bla gene."],
      ["ara", "Arabinose, a sugar. It switches on the GFP gene."],
      ["/", "Means \"plus.\" LB/amp/ara = LB agar with ampicillin and arabinose."],
      ["+pGLO", "Cells from the tube that got the plasmid.", "#1f8a55"],
      ["-pGLO", "Cells from the control tube. No plasmid.", "#c43a2b"],
      ["UV", "Ultraviolet light. It makes GFP glow green."],
      ["lawn", "Growth that covers the whole plate, not separate colonies."]], items:[
      {big:"LB", fig:{type:"plate", lawn:true}, t:"<b>-pGLO.</b> Are the cells alive? Result: a [[lawn|a lawn]], white."},
      {big:"LB/amp", fig:{type:"plate"}, t:"<b>-pGLO.</b> Does ampicillin kill cells without the plasmid? Result: [[no growth|none|nothing]]."},
      {big:"LB/amp", fig:{type:"plate", scatter:[[14, 151, "white", 6, 9]]}, t:"<b>+pGLO.</b> Did transformation work? Result: white [[colonies]]."},
      {big:"LB/amp/ara", fig:{type:"plate", uv:true, glow:true, scatter:[[14, 152, "white", 6, 9]]}, t:"<b>+pGLO.</b> Does arabinose switch on GFP? Result: colonies that [[glow]] green under UV."}
    ]},
    {tab:"The plates", h:"What if the plate were different?", layout:"cards", cols:2, tip:"Try every combination in the Plate predictor on the Practice tab.", items:[
      {big:"No ampicillin", t:"Transformed and untransformed cells both grow. So only [[some]] colonies would glow (with arabinose).", whatif:[{q:"+pGLO cells go on LB/ara?", a:"With no ampicillin, nothing kills the cells that did not take up pGLO, so they grow into a lawn. Arabinose switches on GFP, but only cells with pGLO have the GFP gene. Only some of the lawn glows."}]},
      {big:"Tetracycline", t:"pGLO only carries [[ampicillin|amp]] resistance. On a plate with a different antibiotic, cells with pGLO do not grow.", whatif:[{q:"+pGLO cells go on LB/tet?", a:"Tetracycline stops ribosomes from making proteins. bla only protects against ampicillin, so nothing grows."}]}
    ]},
    {tab:"Plasmid + GFP", h:"Parts of the pGLO plasmid", layout:"split", figs:[{type:"plasmid", wide:true, cap:"pGLO plasmid map (simplified)"}], items:[
      {t:"[[ori]]: copies the plasmid."},
      {t:"[[bla]]: makes beta-lactamase, an enzyme that breaks down ampicillin. This gives ampicillin resistance."},
      {t:"[[GFP]]: green fluorescent protein. It glows green under UV light."},
      {t:"[[araC]]: regulates GFP."},
      {t:"[[pBAD]] promoter: where RNA polymerase starts transcribing GFP."}
    ]},
    {tab:"Plasmid + GFP", h:"How GFP is switched on", banner:"No arabinose: GFP off. Arabinose: GFP on.", kind:"facts", sim:{sim:"arac", prompt:"Switch between the two buttons and watch.",
      offCap:"<b>No arabinose:</b> AraC sits on the promoter like a stop sign. RNA polymerase cannot get through. <b>GFP OFF.</b>",
      onCap:"<b>With arabinose:</b> arabinose binds AraC, and AraC changes shape. RNA polymerase transcribes GFP. <b>GFP ON.</b>"}, items:[
      {t:"Without [[arabinose]], AraC blocks transcription of GFP."},
      {t:"With arabinose, AraC changes [[shape]], and RNA polymerase transcribes GFP."},
      {t:"Primary selection: [[ampicillin|amp]]. Only transformed cells grow."},
      {t:"Secondary selection: arabinose/GFP. [[Glowing|glow|glowing green]] confirms the plasmid genes are expressed."}
    ]},
    {tab:"Glow", h:"Fluorescence", banner:"GFP takes in UV light and gives off green light.", kind:"steps", sim:{sim:"glow", prompt:"Turn on the UV light. Watch one GFP molecule up close.",
      off:"Under normal light, the colonies look white. Tap <b>Turn on the UV light</b>.",
      c0:"The UV lamp shines on the plate.", c1:"<b>Excitation:</b> an electron in GFP absorbs UV light and jumps to a higher energy level.",
      c2:"It loses some energy as vibration.", c3:"<b>Emission:</b> the electron drops back down and releases green light. Less energy, so a longer wavelength.",
      c4:"Every GFP molecule does this, so the colonies glow green!"}, items:[
      {t:"An electron absorbs light and jumps to a higher energy level: [[excitation]]."},
      {t:"It loses some energy as [[vibration]]."},
      {t:"It drops back down and releases light: [[emission]]."},
      {t:"Emitted light has [[less]] energy, so it has a [[longer]] wavelength."}
    ]}
  ],
  practice:[
    {sim:"pglobench", title:"pGLO bench: run the whole protocol", prompt:"Tap an item, then tap where it goes (or drag it). Set the micropipette first when you move liquid.",
      uvMsg:"Only LB/amp/ara (+pGLO) glows! Ampicillin let only transformed cells grow, and arabinose switched on GFP. LB/amp (+pGLO) has colonies too, but they stay white."},
    {sim:"pipette", title:"Micropipette simulator", prompt:"Make each choice. Wrong choices show what goes wrong.",
      volumes:[400, 200, 100, 4], startVol:150,
      steps:[
        {prompt:"The dial is set. What next?", done:"Locked the dial", why:"A locked dial cannot drift.", state:{locked:true},
          choices:[{label:"Lock the dial", ok:true}, {label:"Attach a tip and start", title:"Unlocked dial", text:"The dial was not locked, so the volume drifted. Now the pipette will not move the volume you set.", state:{drift:-7}}]},
        {prompt:"Attach a tip.", done:"Attached the tip firmly", why:"A firm tip seals well.", state:{tip:"firm"},
          choices:[{label:"Press the tip on firmly", ok:true}, {label:"Rest the tip on loosely", title:"Loose tip", text:"A loose tip can leak or fall off. Then the volume is wrong. Press the tip on firmly.", state:{tip:"loose", fill:.4, drip:true}}]},
        {prompt:"Before the tip goes into the liquid, press the plunger:", done:"Pressed to the first stop", why:"The first stop measures the volume you set.", state:{plunger:1},
          choices:[{label:"To the first stop", ok:true}, {label:"To the second stop", title:"Second stop before drawing up", text:"Pressing to the second stop before drawing up pulls in too much liquid. Press to the first stop to draw up.", state:{plunger:2, fill:1}}]},
        {prompt:"Put the tip into the liquid:", done:"Tip near the middle, moving it a little", why:"Moving the tip a little near the middle pulls material from more than one level, so your sample is even.",
          choices:[{label:"Near the middle, and move the tip a little", ok:true}, {label:"Deep, all the way down", title:"Tip too deep", text:"With the tip too deep, liquid sticks to the outside of the tip. That extra liquid goes into the new tube too.", state:{plunger:1, drip:true}}, {label:"Only at the very top", title:"Tip too shallow", text:"Right at the top, the tip can pull up air, and you only get material from the top layer.", state:{plunger:1, fill:.4}}]},
        {prompt:"Draw up the liquid:", done:"Released the plunger slowly", why:"A slow release pulls in just the right amount.", state:{plunger:0, fill:1},
          choices:[{label:"Release the plunger slowly", ok:true}, {label:"Let the plunger snap back fast", title:"Released too fast", text:"Releasing too fast makes liquid shoot up into the pipette. Release slowly.", state:{plunger:0, inside:true, fill:.6}}]},
        {prompt:"Move to the new tube. To dispense, press the plunger:", done:"Pressed to the second stop to dispense", why:"The second stop pushes out all the liquid.", state:{plunger:2, fill:0},
          choices:[{label:"To the second stop", ok:true}]},
        {prompt:"All the liquid is out. Next:", done:"Ejected the tip", why:"Use a new tip for the next sample.", state:{plunger:0, tip:"none"},
          choices:[{label:"Eject the tip", ok:true}]}
      ]},
    {sim:"predictor", title:"Plate predictor", prompt:"Pick the cells and a plate. Predict growth and glow. Then tap Check.",
      why:{
        tet:"pGLO only carries ampicillin resistance (bla). Tetracycline kills these cells, with or without pGLO.",
        minusAmp:"No plasmid means no bla, so no ampicillin resistance. Ampicillin kills the cells.",
        minusLB:"No antibiotic, so every cell grows: a lawn. No pGLO means no GFP gene, so nothing glows.",
        plusLB:"No antibiotic, so transformed and untransformed cells both grow: a lawn. No arabinose, so AraC blocks GFP: nothing glows.",
        plusAra:"No ampicillin, so transformed and untransformed cells both grow: a lawn. Arabinose turns on GFP, but only in transformed cells, so only some glow.",
        plusAmp:"Only transformed cells (with bla) survive ampicillin: colonies. No arabinose, so AraC blocks GFP: white colonies, no glow.",
        plusAmpAra:"Only transformed cells survive ampicillin: colonies. Arabinose switches on GFP: every colony glows green under UV."}},
    {sim:"plasmid", title:"Label the plasmid map", prompt:"Match each part to its job on the map.",
      parts:[
        {label:"ori", job:"Copies the plasmid."},
        {label:"bla", job:"Beta-lactamase: ampicillin resistance."},
        {label:"araC", job:"Regulates GFP."},
        {label:"pBAD promoter", job:"Where RNA polymerase starts transcribing GFP."},
        {label:"GFP", job:"Green fluorescent protein."}]},
    {sim:"energy", title:"Fluorescence energy diagram", prompt:"Put each arrow in the right box.",
      up:"&uarr; Electron absorbs light and jumps up", down:"&darr; Electron drops down and releases light",
      upWhy:"<b>Excitation:</b> the electron absorbs light and jumps to a higher energy level.",
      downWhy:"<b>Emission:</b> after losing some energy as vibration, the electron drops back down and releases light.",
      q:{q:"Compared with the light absorbed, the emitted light has:", opts:["Less energy and a longer wavelength", "More energy and a shorter wavelength", "Less energy and a shorter wavelength", "The same energy and wavelength"], a:0,
        why:"Some energy is lost as vibration, so the emitted light has less energy and a longer wavelength."}}
  ]
});
