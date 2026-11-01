/* Lab 6: Smear preparation. Content from the build brief.
   Heat fixing in our lab is always 5 passes through the flame. */
(function(){
  const blue = (extra, seed) => Object.assign({type:"field", seed:seed || 61, groups:[{shape:"coccus", arr:"clusters", color:"blue", n:5}]}, extra || {});
  VLAB.add({
    n:6, title:"Smear preparation",
    learn:[
      {h:"Aseptic rules", kind:"facts", items:[
        {t:"Flame the loop or needle until [[red hot|red-hot|red]]. Let it cool.", why:"Heat kills microbes on the wire. A hot wire would kill your culture."},
        {t:"Flame the tube [[neck]] after removing the cap and before replacing it."},
        {t:"Hold the [[cap]]. Never set it down."},
        {t:"Do not touch the tube [[sides|side|walls]]."}
      ]},
      {h:"Smear from a broth", kind:"steps", items:[
        {t:"No [[water]] needed.", why:"The broth is already liquid."},
        {t:"Put [[two|2]] loops of culture into the target circle."},
        {t:"[[Air dry|air-dry|airdry]] completely."},
        {t:"Heat fix: pass the slide through the flame [[5|five]] times."}
      ]},
      {h:"Smear from a slant", kind:"steps", items:[
        {t:"Put [[two|2]] loops of distilled water in the target circle first.", why:"Growth on a slant is solid. It needs water to spread."},
        {t:"Take a [[small|tiny]] amount of culture with the [[needle]]."},
        {t:"Mix it into the [[water]]."},
        {t:"[[Air dry|air-dry|airdry]] completely."},
        {t:"Heat fix: pass the slide through the flame [[5|five]] times."}
      ]}
    ],
    practice:[
      {sim:"order", title:"Order the steps: smear from a broth", prompt:"Tap the steps in the right order.", steps:[
        "Flame the loop until red hot. Let it cool.",
        "Remove the cap and hold it.",
        "Flame the tube neck.",
        "Take a loop of broth without touching the tube sides.",
        "Flame the tube neck and replace the cap.",
        "Put the loop of culture in the target circle. (Two loops total.)",
        "Air dry completely.",
        "Heat fix: 5 passes through the flame."]},
      {sim:"order", title:"Order the steps: smear from a slant", prompt:"Tap the steps in the right order.", steps:[
        "Put two loops of distilled water in the target circle.",
        "Flame the needle until red hot. Let it cool.",
        "Remove the cap and hold it.",
        "Flame the tube neck.",
        "Take a small amount of culture with the needle. Do not touch the tube sides.",
        "Flame the tube neck and replace the cap.",
        "Mix the culture into the water.",
        "Air dry completely.",
        "Heat fix: 5 passes through the flame."]}
    ],
    mistakes:{prompt:"Tap a mistake. See what it does to a stained smear. Then explain why.", items:[
      {name:"Heat fixing before the smear is dry", wrong:blue({distort:"warp"}), right:blue(),
        see:"The cells are distorted.", opts:["Heating a wet smear distorts the cells", "The stain was too old", "Too few cells were added", "The slide was too clean"], a:0,
        why:"Let the smear air dry completely before you heat fix."},
      {name:"Too much heat", wrong:blue({distort:"shrink"}), right:blue(),
        see:"The cells are shrunken and distorted.", opts:["Too much heat shrinks and distorts the cells", "The cells were not stained long enough", "The smear was too thin", "The water was not sterile"], a:0,
        why:"Heat fix with 5 passes through the flame. No more."},
      {name:"No heat fix", wrong:blue({empty:true}), right:blue(),
        see:"Almost no cells are left on the slide.", opts:["Without a heat fix, the cells wash off during staining", "The cells were killed by the stain", "The microscope was out of focus", "Too much water was used"], a:0,
        why:"Heat fixing attaches the cells to the slide, so they stay on during staining."},
      {name:"Smear too thick", wrong:blue({thick:"blue"}), right:blue(),
        see:"A dark clump. You cannot see single cells.", opts:["A thick smear holds on to stain, so the results are wrong", "A thick smear dries faster", "Thick smears need less stain", "The cells grew on the slide"], a:0,
        why:"Use a small amount of culture so the smear is thin."},
      {name:"Skipping a flaming step", wrong:{type:"field", seed:64, groups:[{shape:"coccus", arr:"clusters", color:"blue", n:4}, {shape:"rod", arr:"single", color:"blue", n:5}]}, right:blue(),
        see:"A second cell type you did not expect.", opts:["Microbes from the loop, tube neck, or air got in: contamination", "The stain turned cocci into rods", "Heat fixing changes cell shape", "The culture grew too old"], a:0,
        why:"Flaming kills microbes on the loop and the tube neck. Skip it and other microbes get into your culture."}
    ]}
  });
})();
