// Dinghy sailing flashcards.
// Source for the core 17 terms: instructortoolkit.co.uk dinghy sailing terminology.
// Boat-part labels also come from the same page; definitions for those parts
// (and all other beginner-to-novice extras) are added here for self-study.

const CARDS = [
  // === Directions & sides — from source ===
  { cat: "Directions", term: "Bow", def: "The front of the boat.", source: "core" },
  { cat: "Directions", term: "Stern", def: "The back of the boat (also called the aft).", source: "core" },
  { cat: "Directions", term: "Aft", def: "The back of the boat (also known as the stern).", source: "core" },
  { cat: "Directions", term: "Port", def: "The left-hand side of the boat when you are facing the bow.", source: "core" },
  { cat: "Directions", term: "Starboard", def: "The right-hand side of the boat when you are facing the bow.", source: "core" },
  { cat: "Directions", term: "Leeward", def: "The downwind side of the boat — the side the wind is blowing toward.", source: "core" },
  { cat: "Directions", term: "Windward", def: "The upwind side of the boat — the side the wind is blowing onto.", source: "core" },

  // === Sails & rigging — from source ===
  { cat: "Sails & rig", term: "Main sail", def: "The big sail attached to the mast and the boom.", source: "core" },
  { cat: "Sails & rig", term: "Jib", def: "The smaller sail attached to the bow (front).", source: "core" },
  { cat: "Sails & rig", term: "Boom", def: "The horizontal pole that extends from the bottom of the mast. Adjusting the angle of the boom to the wind is how the dinghy harnesses wind power.", source: "core" },
  { cat: "Sails & rig", term: "Sheets", def: "Ropes that pull sails in and let them out.", source: "core" },
  { cat: "Sails & rig", term: "Halyards", def: "Ropes that pull sails up the masts.", source: "core" },

  // === Steering & manoeuvres — from source ===
  { cat: "Manoeuvres", term: "Rudder", def: "The blade at the back of the boat, connected to the tiller, used to steer.", source: "core" },
  { cat: "Manoeuvres", term: "Tacking", def: "Turning the bow of the boat through the wind so the wind changes from one side to the other. The boom always shifts sides during a tack.", source: "core" },
  { cat: "Manoeuvres", term: "Gybing", def: "The opposite of tacking — turning the stern through the wind so the wind changes sides. A downwind turn.", source: "core" },
  { cat: "Manoeuvres", term: "Capsize", def: "When the boat falls onto its side or fully inverts.", source: "core" },

  // === Commands — from source ===
  { cat: "Commands", term: "Lee ho", def: "The command given by the helm just before tacking, warning the crew to duck and switch sides.", source: "core" },

  // === Parts of the dinghy — labels from source, definitions added ===
  { cat: "Boat parts", term: "Hull", def: "The main body of the boat that sits in the water." },
  { cat: "Boat parts", term: "Gunwale", def: "The top edge of the hull where the deck meets the side. (Pronounced 'gunnel'.)" },
  { cat: "Boat parts", term: "Transom", def: "The flat panel at the very back of the hull where the rudder hangs." },
  { cat: "Boat parts", term: "Mast", def: "The vertical pole that holds the main sail up." },
  { cat: "Boat parts", term: "Tiller", def: "The stick attached to the rudder that the helm holds to steer." },
  { cat: "Boat parts", term: "Tiller extension", def: "A hinged stick attached to the tiller so the helm can steer while sitting out on the side deck." },
  { cat: "Boat parts", term: "Centreboard", def: "A retractable fin in the middle of the hull that stops the boat sliding sideways. Lowered when sailing, raised when running downwind or beaching." },
  { cat: "Boat parts", term: "Daggerboard", def: "Like a centreboard but slides straight up and down rather than pivoting." },
  { cat: "Boat parts", term: "Forestay", def: "The wire from the top of the mast to the bow that stops the mast falling backwards." },
  { cat: "Boat parts", term: "Shroud", def: "A wire from the mast to the side of the boat that stops the mast falling sideways." },
  { cat: "Boat parts", term: "Toe straps", def: "Straps on the cockpit floor that you hook your feet under when hiking out." },

  // === Sail anatomy — labels from source, definitions added ===
  { cat: "Sail anatomy", term: "Head", def: "The top corner of a sail (where the halyard attaches)." },
  { cat: "Sail anatomy", term: "Tack (of a sail)", def: "The bottom front corner of a sail. (Not to be confused with the manoeuvre.)" },
  { cat: "Sail anatomy", term: "Clew", def: "The bottom back corner of a sail (where the sheet attaches)." },
  { cat: "Sail anatomy", term: "Foot", def: "The bottom edge of a sail, running from tack to clew." },
  { cat: "Sail anatomy", term: "Luff", def: "The leading (front) edge of a sail. Also a verb: a sail 'luffs' when it flaps because it isn't pulled in enough." },
  { cat: "Sail anatomy", term: "Leach (Leech)", def: "The trailing (back) edge of a sail." },
  { cat: "Sail anatomy", term: "Roach", def: "The curved area of the leech that sticks out beyond a straight line from head to clew." },
  { cat: "Sail anatomy", term: "Batten", def: "A thin stiff strip slotted into the sail to support the roach and hold its shape." },
  { cat: "Sail anatomy", term: "Cringle", def: "A reinforced eyelet in a sail — used as an attachment point, e.g. for the outhaul." },
  { cat: "Sail anatomy", term: "Jib head / luff / leech / foot / tack / clew", def: "Same parts as the main sail, applied to the jib. The jib's tack sits at the bow on the forestay." },

  // === Beginner extras: points of sail ===
  { cat: "Points of sail", term: "No-go zone", def: "The roughly 90° arc directly into the wind where a dinghy can't sail. You must tack across it." },
  { cat: "Points of sail", term: "In irons", def: "Stuck head-to-wind with no steerage — a beginner's classic mistake when a tack stalls." },
  { cat: "Points of sail", term: "Close-hauled", def: "Sailing as close to the wind as possible (about 45° off the wind), sails pulled in tight. Also called 'beating'." },
  { cat: "Points of sail", term: "Close reach", def: "A point of sail between close-hauled and a beam reach — wind forward of the beam, sails eased a little." },
  { cat: "Points of sail", term: "Beam reach", def: "Sailing with the wind blowing across the side of the boat (90° to the boat). Usually the fastest and easiest point of sail." },
  { cat: "Points of sail", term: "Broad reach", def: "Wind coming over the back corner of the boat, sails eased well out." },
  { cat: "Points of sail", term: "Run / Running", def: "Sailing directly downwind, sails fully eased out at right angles to the boat." },
  { cat: "Points of sail", term: "Goosewing", def: "On a run, setting the jib on the opposite side to the main so both sails catch the wind." },

  // === Beginner extras: manoeuvres & steering ===
  { cat: "Manoeuvres", term: "Head up", def: "Steer the boat closer to the wind (bow turns toward windward)." },
  { cat: "Manoeuvres", term: "Bear away", def: "Steer the boat away from the wind (bow turns toward leeward)." },
  { cat: "Manoeuvres", term: "Heave-to", def: "Park the boat by backing the jib and lashing the tiller — useful for pausing in open water." },
  { cat: "Manoeuvres", term: "Reach-to-reach tack", def: "A practice tack starting and ending on a reach, used to learn the manoeuvre without losing ground upwind." },
  { cat: "Manoeuvres", term: "Heel", def: "The sideways tilt of the boat under wind. A small heel is fine — too much slows you and risks capsize." },
  { cat: "Manoeuvres", term: "Hike out / Sit out", def: "Lean out over the windward side (feet under toe straps) to keep the boat flat against the wind." },
  { cat: "Manoeuvres", term: "Trim", def: "How the sails are set relative to the wind — 'trimming' is adjusting them for best power." },
  { cat: "Manoeuvres", term: "Balance", def: "Keeping the boat flat by moving crew weight in and out — one of the 'Five Essentials'." },

  // === Beginner extras: commands ===
  { cat: "Commands", term: "Ready about?", def: "The helm's question to the crew before tacking — meaning 'ready to tack?'." },
  { cat: "Commands", term: "Ready", def: "The crew's reply to 'Ready about?' — sheets uncleated, body ready to swap sides." },
  { cat: "Commands", term: "Stand by to gybe", def: "The helm's warning that a gybe is about to happen." },
  { cat: "Commands", term: "Gybe-oh!", def: "The helm's call as the boom is about to swing across in a gybe — duck!" },

  // === Beginner extras: ropes & controls ===
  { cat: "Ropes & controls", term: "Mainsheet", def: "The rope that controls the angle of the main sail — pulled in to power up, eased to depower." },
  { cat: "Ropes & controls", term: "Jib sheet", def: "The rope that controls the jib. There's one on each side; only the leeward one is loaded." },
  { cat: "Ropes & controls", term: "Kicker (vang)", def: "A control that pulls the boom down, keeping the leech tight and the sail from twisting." },
  { cat: "Ropes & controls", term: "Cunningham", def: "A control that pulls down on the luff of the main sail to flatten it in stronger wind." },
  { cat: "Ropes & controls", term: "Outhaul", def: "A control that tensions the foot of the main sail along the boom — flatter foot in strong wind, fuller in light wind." },
  { cat: "Ropes & controls", term: "Painter", def: "A short rope at the bow used for tying the dinghy up to a pontoon, mooring, or trolley." },
  { cat: "Ropes & controls", term: "Cleat", def: "A fitting that grips a rope to hold it in place. Jamming cleats can be released by pulling sharply up." },

  // === Beginner extras: wind ===
  { cat: "Wind", term: "True wind", def: "The wind you feel when standing still — direction and speed over the water." },
  { cat: "Wind", term: "Apparent wind", def: "The wind you feel on the moving boat — a combination of true wind and the boat's own motion. Sails are trimmed to apparent wind." },
  { cat: "Wind", term: "Telltales", def: "Small ribbons on the sails or shrouds that show how air is flowing — the trimming guide for sails." },
  { cat: "Wind", term: "Burgee", def: "A small triangular flag at the masthead showing the apparent-wind direction." },
  { cat: "Wind", term: "Gust", def: "A short, sharp increase in wind strength. Ease the mainsheet or hike harder to stay flat." },
  { cat: "Wind", term: "Lull", def: "A short drop in wind strength — sit in, sheet in, keep the boat moving." },
  { cat: "Wind", term: "Lee shore", def: "A shore the wind is blowing onto — dangerous to approach because the wind pushes you toward it." },
  { cat: "Wind", term: "Weather shore", def: "A shore the wind is blowing off — sheltered water close in, but gusty and shifty." },

  // === Beginner extras: rules of the road ===
  { cat: "Right of way", term: "Starboard tack", def: "When the wind comes over the starboard side (boom on port). Boats on starboard tack have right of way over port-tack boats." },
  { cat: "Right of way", term: "Port tack", def: "When the wind comes over the port side (boom on starboard). Must give way to starboard-tack boats." },
  { cat: "Right of way", term: "Windward gives way", def: "When two boats are on the same tack, the windward boat keeps clear of the leeward boat." },
  { cat: "Right of way", term: "Overtaking gives way", def: "A boat overtaking another must keep clear of the boat being overtaken." },

  // === Beginner extras: safety & capsize ===
  { cat: "Safety", term: "Buoyancy aid (PFD)", def: "The personal flotation device worn whenever sailing a dinghy. Less bulky than a lifejacket, doesn't self-right an unconscious person." },
  { cat: "Safety", term: "Scoop recovery", def: "Capsize recovery method where one person stays in the boat as it's righted, and is 'scooped' aboard with the water." },
  { cat: "Safety", term: "Inversion", def: "When a capsized boat goes fully upside-down (mast pointing at the seabed). Stand on the centreboard to lever it back up." },
  { cat: "Safety", term: "Bailer", def: "A scoop or self-draining hole used to get water out of the cockpit after capsize or splashing." },
  { cat: "Safety", term: "Bung", def: "A plug in the transom that drains the hull when out of the water. Always check it's in before launching." },

  // === Beginner extras: roles ===
  { cat: "Roles", term: "Helm / Helmsman", def: "The person steering the boat, holding the tiller and main sheet." },
  { cat: "Roles", term: "Crew", def: "The other person — works the jib, balances the boat, calls wind shifts and other boats." },
];

const CATEGORIES = [...new Set(CARDS.map(c => c.cat))];
