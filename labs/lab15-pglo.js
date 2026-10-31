/* Lab 15: Transformation (pGLO). Content from the build brief. */
VLAB.add({
  n:15, title:"Transformation (pGLO)",
    key:["Ice-cold CaCl₂ makes cells competent. Heat shock: 42°C for 45 seconds.", "bla = ampicillin resistance. Arabinose switches on GFP.", "+pGLO on LB/amp/ara = colonies that glow green under UV."],
  learn:[
    {h:"The big idea", kind:"facts", top:[{type:"strip", steps:[{i:"ice", t:"Competent cells", s:"ice-cold CaCl₂"}, {i:"pipette", t:"Add pGLO", s:"+pGLO tube only"}, {i:"bath", c:"42°C", t:"Heat shock", s:"45 seconds"}, {i:"incub", c:"37°C", t:"Recover", s:"1 hour in LB"}, {i:"plate", t:"Plate", s:"100 µL each"}, {i:"uv", t:"Look under UV", s:"glowing = GFP on"}]}], items:[
      {t:"[[Transformation]]: a cell takes up DNA from its surroundings."},
      {t:"Our goal: get the pGLO [[plasmid]] into <i>E. coli</i>."},
      {t:"Transformed cells survive [[ampicillin|amp]]. With arabinose, they also glow green under UV."}
    ]},
    {h:"Competent cells", kind:"facts", figs:[{type:"svg", name:"cacl2", wide:true}], items:[
      {t:"[[Competent]] cells can take up DNA from their surroundings."},
      {t:"We made <i>E. coli</i> competent with ice-cold 50 mM [[CaCl2|cacl2|cacl₂|calcium chloride]]."},
      {t:"Ca<sup>2+</sup> shields the [[negative]] charges on the DNA backbone and the cell membrane, so the plasmid can get close and enter.", why:"Two negative things push each other away. Ca<sup>2+</sup> sits between them."}
    ]},
    {h:"Protocol, step by step", kind:"steps", figs:[{type:"svg", name:"heatshock", wide:true, cap:"Temperature during the protocol"}],
      tip:"Use a timer for the heat shock. 45 seconds, then straight back on ice.",
      examples:[
        {title:"how much is in each tube?", steps:["Start: 400 µL CaCl<sub>2</sub>. Split in half: <b>200 µL</b> in each tube.", "+pGLO tube: 200 µL + 4 µL plasmid = <b>204 µL</b>.", "Add 200 µL LB to each tube. +pGLO: 204 + 200 = <b>404 µL</b>. -pGLO: 200 + 200 = <b>400 µL</b>.", "Each plate gets 100 µL. The +pGLO tube makes 2 plates: 2 × 100 = <b>200 µL</b> used."], answer:"+pGLO tube: 404 µL. -pGLO tube: 400 µL."}],
      items:[
      {t:"Add [[400 µL|400|400ul|400 ul]] of ice-cold 50 mM CaCl<sub>2</sub> to one tube. Transfer one or two colonies into it with a sterile loop. Mix well.", why:"Ice-cold CaCl<sub>2</sub> makes the cells competent."},
      {t:"Split it in half: move [[200 µL|200|200ul|200 ul]] into a second tube. Label the tubes +pGLO and -pGLO.", why:"The -pGLO tube is the control: the same cells, with no plasmid."},
      {t:"Add [[4 µL|4|4ul|4 ul]] of rehydrated pGLO plasmid to the [[+pGLO|pglo|plus pglo|+pglo tube]] tube only.", why:"If -pGLO gets plasmid too, you lose your control."},
      {t:"Keep both tubes on [[ice]] for about 1 hour.", why:"Ca<sup>2+</sup> shields the charges so the plasmid can get close to the cells."},
      {t:"Heat shock at [[42°C|42|42 c]] for [[45 seconds|45|45 sec|45 s]].", why:"Timing is critical. Too short: few cells take up plasmid. Too long: cells are damaged or killed."},
      {t:"Back on ice for [[2 to 10|2-10|2 10]] minutes.", why:"Cools the cells back down after the heat shock."},
      {t:"Add 200 µL [[LB]] broth. Recover at 37°C for [[1 hour|1|1 hr|one hour|60 minutes]].", why:"During recovery the cells repair and start making beta-lactamase before they meet ampicillin."},
      {t:"Pipette [[100 µL|100|100ul|100 ul]] onto each plate. Spread with a spreader dipped in isopropanol and flamed.", why:"Each plate answers a different question. See the next section."},
      {t:"Incubate [[inverted|upside down|upside-down]] at 37°C.", why:"Upside down keeps water drops from falling onto the agar."}
    ]},
    {h:"Why four plates?", kind:"facts", top:[{type:"svg", name:"pgloplates", wide:true}], items:[
      {t:"<b>LB, -pGLO:</b> are the cells alive? Result: a [[lawn|a lawn]], white."},
      {t:"<b>LB/amp, -pGLO:</b> does ampicillin kill cells without the plasmid? Result: [[no growth|none|nothing]]."},
      {t:"<b>LB/amp, +pGLO:</b> did transformation work? Result: white [[colonies]]."},
      {t:"<b>LB/amp/ara, +pGLO:</b> does arabinose switch on GFP? Result: colonies that [[glow]] green under UV."}
    ]},
    {h:"What if the plate were different?", kind:"facts", tip:"Try every combination in the Plate predictor on the Practice tab.", items:[
      {t:"On a plate <b>without</b> ampicillin, transformed and untransformed cells both grow. So only [[some]] colonies would glow (with arabinose)."},
      {t:"pGLO only carries [[ampicillin|amp]] resistance. On a plate with a different antibiotic (like tetracycline), cells with pGLO do not grow."}
    ]},
    {h:"Parts of the pGLO plasmid", kind:"facts", figs:[{type:"plasmid", wide:"mid", cap:"pGLO plasmid map (simplified)"}], items:[
      {t:"[[ori]]: copies the plasmid."},
      {t:"[[bla]]: makes beta-lactamase, an enzyme that breaks down ampicillin. This gives ampicillin resistance."},
      {t:"[[GFP]]: green fluorescent protein. It glows green under UV light."},
      {t:"[[araC]]: regulates GFP."},
      {t:"[[pBAD]] promoter: where RNA polymerase starts transcribing GFP."}
    ]},
    {h:"How GFP is switched on", kind:"facts", figs:[{type:"svg", name:"arac", wide:true}], items:[
      {t:"Without [[arabinose]], AraC blocks transcription of GFP."},
      {t:"With arabinose, AraC changes [[shape]], and RNA polymerase transcribes GFP."},
      {t:"Primary selection: [[ampicillin|amp]]. Only transformed cells grow."},
      {t:"Secondary selection: arabinose/GFP. [[Glowing|glow|glowing green]] confirms the plasmid genes are expressed."}
    ]},
    {h:"Fluorescence", kind:"steps", figs:[{type:"svg", name:"energyfixed", wide:"mid", cap:"Up arrow: excitation. Down arrow: emission."}], tip:"Less energy = longer wavelength. Energy in is more than energy out.", items:[
      {t:"An electron absorbs light and jumps to a higher energy level: [[excitation]]."},
      {t:"It loses some energy as [[vibration]]."},
      {t:"It drops back down and releases light: [[emission]]."},
      {t:"Emitted light has [[less]] energy, so it has a [[longer]] wavelength."}
    ]}
  ],
  problems:[
    {sim:"quiz", title:"Think it through", prompt:"Use what you know about the plasmid and the plates.", qs:[
      {q:"Which plate shows the cells were alive?", opts:["LB, -pGLO", "LB/amp, -pGLO", "LB/amp, +pGLO", "LB/tet, +pGLO"], a:0, why:"With no antibiotic, every living cell grows into a lawn."},
      {q:"Colonies grow on LB/amp (+pGLO) but do not glow. Why?", opts:["There is no arabinose, so AraC blocks GFP", "The cells did not take up pGLO", "Ampicillin turns GFP off", "The plate is upside down"], a:0, why:"Growing on ampicillin proves they have pGLO. GFP needs arabinose to switch on."},
      {q:"You add 200 µL of LB to the +pGLO tube (200 µL + 4 µL plasmid). How much is in the tube now?", opts:["404 µL", "400 µL", "204 µL", "604 µL"], a:0, why:"200 + 4 + 200 = 404 µL."},
      {q:"Cells with pGLO are spread on LB/tet. What happens?", opts:["No growth", "White colonies", "Glowing colonies", "A lawn"], a:0, why:"pGLO only carries ampicillin resistance, so tetracycline kills these cells."},
      {q:"Why recover in LB for 1 hour before plating on ampicillin?", opts:["The cells repair and start making beta-lactamase first", "To make the cells competent", "To switch on GFP", "To kill untransformed cells"], a:0, why:"Beta-lactamase protects them once they meet ampicillin."},
      {q:"Someone heat shocks for 3 minutes instead of 45 seconds. What is likely?", opts:["Cells are damaged or killed, so few colonies grow", "More cells glow", "The plasmid is destroyed", "Nothing changes"], a:0, why:"Timing is critical. Too long damages or kills the cells."},
      {q:"Why is the -pGLO tube important?", opts:["It is the control: the same cells with no plasmid", "It holds extra plasmid", "It is used for the heat shock only", "It makes the cells glow"], a:0, why:"Comparing to the control shows the plasmid caused the change."}
    ]}
  ],
  practice:[
    {sim:"pipette", title:"Micropipette simulator", prompt:"Make each choice. Wrong choices show what goes wrong.",
      volumes:[400, 200, 100, 4], startVol:150,
      steps:[
        {prompt:"The dial is set. What next?", done:"Locked the dial", why:"A locked dial cannot drift.", state:{locked:true},
          choices:[{label:"Lock the dial", ok:true}, {label:"Attach a tip and start", title:"Unlocked dial", text:"The dial was not locked, so the volume drifted. Now the pipette will not move the volume you set.", state:{drift:-7}}]},
        {prompt:"Attach a tip.", done:"Attached the tip firmly", why:"A firm tip seals well.", state:{tip:"firm"},
          choices:[{label:"Press the tip on firmly", ok:true}, {label:"Rest the tip on loosely", title:"Loose tip", text:"A loose tip can leak or fall off. Then the volume is wrong. Press the tip on firmly.", state:{tip:"loose", fill:.4, drip:true}}]},
        {prompt:"Before the tip goes into the liquid, press the plunger:", done:"Pressed to the first stop", why:"The first stop measures the volume you set.", state:{plunger:1},
          choices:[{label:"To the first stop", ok:true}, {label:"To the second stop", title:"Second stop before drawing up", text:"Pressing to the second stop before drawing up pulls in too much liquid. Press to the first stop to draw up.", state:{plunger:2, fill:1}}]},
        {prompt:"Put the tip into the liquid:", done:"Put the tip just below the surface", why:"Only the inside of the tip holds liquid.",
          choices:[{label:"Just below the surface", ok:true}, {label:"Deep, all the way down", title:"Tip too deep", text:"With the tip too deep, liquid sticks to the outside of the tip. That extra liquid goes into the new tube too.", state:{plunger:1, drip:true}}]},
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
