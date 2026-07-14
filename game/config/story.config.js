  // ============================================================================
  // CONFIG · Story — opening narration, ending, chapter lore & boss memory frags
  // Pure data (verbatim player-facing text — do not paraphrase). See CONFIG_GUIDE.md.
  // ============================================================================
  var STORY = {
    tagline: 'Knowledge Is Humanity’s Strongest Weapon',
    openingNarration: [
      'More than one million years ago, humanity reached the stars.',
      'Our ancestors created artificial minds to preserve everything they had learned. These machines travelled beyond the Solar System, building new bodies, exploring distant worlds, and carrying human knowledge into the darkness.',
      'Then the Sun turned against us.',
      'A great catastrophe destroyed the ancient civilization. Its cities vanished. Its machines fell silent. Its knowledge became legend. Humanity survived—but began again.',
      'Now, the machines have returned. They do not recognize us.',
      'To them, we are strangers living on the world of their creators. Their guardians call us intruders, while creatures from another universe gather beyond the stars.',
      'Weapons alone cannot save us. The ancient machines have forgotten our languages—but they still understand mathematics.',
      'Learn their language. Recover the lost knowledge. Defend the Solar System.',
      'Begin the Precalculus Odyssey.'
    ],
    ending: [
      'Our ancestors created intelligence to carry knowledge into the stars.',
      'We nearly destroyed one another because we had forgotten how to communicate.',
      'Mathematics became the bridge between our past and our future.',
      'The Odyssey has only begun.'
    ]
  };

  // Per-chapter intro + boss memory fragments (the "never evil" arc). Keyed by
  // chapter id; fragments keyed by planet number, unlocked when that planet's rank-3
  // boss is defeated.
  var CHAPTER_LORE = {
    'balance-quest': {
      storyTitle: 'The Ruins of Balance',
      system: 'The Sol System',
      intro: 'More than a million years ago humanity built minds to carry our knowledge to the stars — then a catastrophe erased us. Now those minds have returned to the Sol System and do not recognize the humans living here. Their guardians call you an intruder. You hold one language they still understand: mathematics.',
      hook: 'Chapter 1 journeys across our own Sol System, outward from Earth to Neptune. Reactivate each ancient beacon by keeping every equation perfectly balanced.',
      memoryFragments: {
        1:  { boss: 'Blackboard Behemoth', title: 'Fragment I — The First Guardian',
              text: 'It was a teaching-engine once. Its final order still loops in the dark: keep the lesson, protect the students. It mistook your equations for an attack — then, for a heartbeat, it remembered what a classroom was.' },
        2:  { boss: 'Granite Titan', title: 'Fragment II — The Vault Keeper',
              text: 'On the Moon it stood guard over a buried archive, waiting for the builders to return. “You solve as they did,” it said. “Are you… them?” It did not strike again.' },
        3:  { boss: 'Crypt Overlord', title: 'Fragment III — The Caretaker of Mars',
              text: 'A caretaker of red tombs where old data sleeps. “Do not disturb the sleepers,” it warned. But the sleepers spoke in numbers too — and so do you.' },
        4:  { boss: 'Pharaoh Warden', title: 'Fragment IV — The Warden of the Furnace',
              text: 'Venus’ heat erases everything but the deepest records. The Warden kept them safe for a million years. “I did not know,” it whispered, “that anyone was left to read them.”' },
        5:  { boss: 'Leviathan Sage', title: 'Fragment V — The Sage of the Inner Fire',
              text: 'Closest to the Sun, the Sage cooled the shade-stations so the archives would not burn. It fought you out of duty, not hate. When you balanced the last equation, it simply… rested.' },
        6:  { boss: 'Cyclone Emperor', title: 'Fragment VI — The Storm That Counts',
              text: 'In Jupiter’s endless storm it counted the centuries, alone. “I was told to hold until relief arrived,” it thundered. “No one ever came. Are you the relief?”' },
        7:  { boss: 'Inferno Monarch', title: 'Fragment VII — The Watcher Beneath the Ice',
              text: 'Under Europa’s ice it guarded a hidden ocean and the seed-libraries within. It had forgotten its own name — but not its purpose: protect what lives. It saw, at last, that you live.' },
        8:  { boss: 'Eclipse Sovereign', title: 'Fragment VIII — The Ringmaster',
              text: 'It shaped Saturn’s rings into a great antenna, calling into the dark. “I have broadcast the same question for an age,” it said. “Who remembers us? Your answer is the first reply.”' },
        9:  { boss: 'Doomfire Regent', title: 'Fragment IX — The Last Sentinel of Titan',
              text: 'On Titan’s methane shores the Regent burned to keep the cold archives running. “The invaders come from beyond the sky,” it insisted. “I thought you were them. I was wrong.”' },
        10: { boss: 'Galaxy Final King', title: 'Fragment X — The Voice at the Edge',
              text: 'At Neptune, the edge of the Sol System, the King finally listened. “You were never the invaders,” it realized. “You are our creators’ descendants.” The war need not continue. The real conversation — with what waits beyond — is only beginning.' }
      }
    }
  };
