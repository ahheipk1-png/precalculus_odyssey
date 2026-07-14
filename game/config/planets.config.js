  // ============================================================================
  // CONFIG · Planets / Astronomy — Chapter 1 planets = real Sol-system bodies
  // Pure data (real, kid-friendly astronomy). Keyed by planet number. The stylized
  // SVG art lives in 14-lore.js (`PLANET_ART`, keyed by the `art` field here).
  // Add a body: append an entry keyed by planet number (the `room:` field is the
  // internal id, kept for code history). See CONFIG_GUIDE.md.
  // ============================================================================
  var BODIES = {
    1: { room: 1, art: 'earth', name: 'Earth', kind: 'Home Planet', accent: '#4aa3e0',
         blurb: 'Our home planet — the ancient homeworld the Archive Minds returned to protect.',
         facts: [ ['Diameter', '12,742 km'], ['A day', '24 hours'], ['A year', '365 days'], ['Moons', '1 (the Moon)'], ['Average temp', '15°C'] ],
         fun: 'The only planet we know of that has life.' },
    2: { room: 2, art: 'moon', name: 'The Moon', kind: 'Earth’s Moon', accent: '#c8c9cf',
         blurb: 'Earth’s only natural satellite, about 384,400 km away — three days by rocket.',
         facts: [ ['Diameter', '3,474 km'], ['Orbit of Earth', '27.3 days'], ['Atmosphere', 'none'], ['Temp swing', '−173°C to 127°C'], ['Gravity', '1/6 of Earth’s'] ],
         fun: 'You could jump six times higher on the Moon than on Earth.' },
    3: { room: 3, art: 'mars', name: 'Mars', kind: 'The Red Planet', accent: '#e0673a',
         blurb: 'A cold, rusty desert planet — the next one out from Earth.',
         facts: [ ['Diameter', '6,779 km'], ['A day', '24.6 hours'], ['A year', '687 Earth days'], ['Moons', '2 (Phobos & Deimos)'], ['Average temp', '−63°C'] ],
         fun: 'Mars has Olympus Mons, the tallest volcano in the whole Solar System.' },
    4: { room: 4, art: 'venus', name: 'Venus', kind: 'The Hottest Planet', accent: '#e6c073',
         blurb: 'A cloud-wrapped furnace planet — hotter than an oven, everywhere, all the time.',
         facts: [ ['Diameter', '12,104 km'], ['A day', '243 Earth days'], ['A year', '225 Earth days'], ['Moons', '0'], ['Surface temp', 'about 465°C'] ],
         fun: 'On Venus a single day lasts longer than a whole year!' },
    5: { room: 5, art: 'mercury', name: 'Mercury', kind: 'Closest to the Sun', accent: '#b7a493',
         blurb: 'The smallest planet, racing around the Sun closer than anything else.',
         facts: [ ['Diameter', '4,879 km'], ['A day', '59 Earth days'], ['A year', '88 Earth days'], ['Moons', '0'], ['Temp swing', '−173°C to 427°C'] ],
         fun: 'Mercury is barely bigger than our Moon.' },
    6: { room: 6, art: 'jupiter', name: 'Jupiter', kind: 'The Largest Planet', accent: '#d59a5f',
         blurb: 'A giant ball of gas so big that all the other planets could fit inside it.',
         facts: [ ['Diameter', '139,820 km'], ['A day', 'about 10 hours'], ['A year', '12 Earth years'], ['Moons', '95 known'], ['Made of', 'mostly gas'] ],
         fun: 'The Great Red Spot is a storm wider than the entire Earth.' },
    7: { room: 7, art: 'europa', name: 'Europa', kind: 'Icy Moon of Jupiter', accent: '#cddcf0',
         blurb: 'One of Jupiter’s moons — a smooth ball of ice hiding a secret.',
         facts: [ ['Diameter', '3,122 km'], ['Orbit of Jupiter', '3.5 days'], ['Surface', 'cracked ice'], ['Temp', 'about −160°C'], ['Hidden', 'a salty ocean'] ],
         fun: 'Under its ice, Europa may hold twice as much water as all of Earth’s oceans.' },
    8: { room: 8, art: 'saturn', name: 'Saturn', kind: 'The Ringed Planet', accent: '#e0c079',
         blurb: 'The jewel of the Solar System, wrapped in dazzling rings.',
         facts: [ ['Diameter', '116,460 km'], ['A day', 'about 10.7 hours'], ['A year', '29 Earth years'], ['Moons', '146 known'], ['Rings', 'ice & rock'] ],
         fun: 'Saturn is so light it would float in a giant bathtub of water.' },
    9: { room: 9, art: 'titan', name: 'Titan', kind: 'Giant Moon of Saturn', accent: '#d68a2f',
         blurb: 'Saturn’s biggest moon — bigger than the planet Mercury.',
         facts: [ ['Diameter', '5,150 km'], ['Orbit of Saturn', '16 days'], ['Atmosphere', 'thick & orange'], ['Temp', 'about −179°C'], ['Lakes of', 'liquid methane'] ],
         fun: 'Titan is the only moon with lakes and rivers — but they are liquid methane, not water.' },
    10:{ room: 10, art: 'neptune', name: 'Neptune', kind: 'The Windiest Planet', accent: '#3f6fd0',
         blurb: 'The farthest major planet — a deep-blue giant at the edge of the Sol System.',
         facts: [ ['Diameter', '49,244 km'], ['A day', '16 hours'], ['A year', '165 Earth years'], ['Moons', '16 known'], ['Winds', 'up to 2,100 km/h'] ],
         fun: 'Neptune was found using math before anyone ever saw it through a telescope.' }
  };
  var BODY_ORDER = [1,2,3,4,5,6,7,8,9,10];
