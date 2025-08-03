const default_player = {
    points: 0,
    ppc: {
        base: 1,
        mult: { // A list of multipliers to the point gain.
            C3: 1,
            C5: 1,
            pre6total: 1, // The total of all multiplies before card 6
            C6A: 1, C6B: 1,
            C7: 1,
            C8: 1,
            post6constantstotal: 1, //this is the total of all constant multipliers after card 6
            C9A: 1, C9B: 1,
            C11: 1,
            totalmanual: 1, // Total of manual bonuses
            totalauto: 1, // Total of autoclicker multipliers
        }
    },
    cards: { // Costs of cards & if the player has them.
        regular: {
            1: { cost: 20, has: false },
            2: { cost: 200, has: false },
            3: { cost: 500, has: false },
            4: { cost: 2000, has: false },
            5: { cost: 2000, has: false },
            6.1: { cost: 5000, has: false }, 6.2: { cost: 5000, has: false }, 
            7: {cost: 10_000, has: false},
            8: {cost: 31_415, has: false},
            9.1: { cost: 100_000, has: false }, 9.2: { cost: 100_000, has: false },
            10: {cost: 500_000, has: false},
            11: {cost: 694_200, has: false},
            12: {cost: 1_500_000, has: false,}
        },
        charge: {
            1: { cost: [500_000, 200], has: false } // about cost: first element is points, second one is charge
        }
    },
    buyables: { // Cost of buyables & how many the player has, and maximum purchases. e308 means no limit.
        1: { amount: 0, cost: 20, maxpurchases: 1e308 },
        2: { amount: 0, cost: 100, maxpurchases: 5 },
        3: { amount: 0, cost: 1000, maxpurchases: 1e308 }
    },
    autoclicker: { strength: 0, cooldown:  Infinity, cps: 0 }, // Stats, cooldown in ticks. 
    defaultcooldowns: { 0: Infinity, 1: 20, 2: 10, 3: 5, 4: 2, 5: 1, 6: 1, 7: 1, current: Infinity }, // Default autoclicker cooldowns in ticks
    charge: {amount: 0, req: 1_000_000, unlocked: false, times: 0, persecond: 0}, // Charge resource, requirement to prestige, and how many times the player has prestiged
    consoleunlocked: false
}

player = default_player
function resetplayer() {player = default_player}