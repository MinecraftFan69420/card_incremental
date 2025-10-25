const default_player = {
    points: new Decimal(0),
    ppc: {
        base: new Decimal(1),
        mult: { // A list of multipliers to the point gain.
            C5: new Decimal(1),
            C6A: new Decimal(1), C6B: new Decimal(1),
            C9A: new Decimal(1), C9B: new Decimal(1),
            constants: new Decimal(1), // The constant multipliers
            totalmanual: new Decimal(1), // Total of manual bonuses
            totalauto: new Decimal(1), // Total of autoclicker multipliers
        }
    },
    card_possession: { // Costs of cards & if the player has them.
        regular: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6.1: false, 6.2: false,
            7: false,
            8: false,
            9.1: false, 9.2: false,
            10: false,
            11: false,
            12: false
        },
        charge: {
            1: false // about cost: first element is points, second one is charge
        }
    },
    buyables: { // Cost of buyables & how many the player has, and maximum purchases. e308 means no limit.
        1: { amount: new Decimal(0), cost: new Decimal(20), maxpurchases: Infinity},
        2: { amount: new Decimal(0), cost: new Decimal(100), maxpurchases: 5},
        3: { amount: new Decimal(0), cost: new Decimal(1000), maxpurchases: Infinity }
    },
    autoclicker: { strength: 0, cooldown: new Decimal(1, Infinity, Infinity), cps: 0 }, // Stats, cooldown in ticks. 
    defaultcooldowns: { 0: Infinity, 1: 20, 2: 10, 3: 5, 4: 2, 5: 1, 6: 1, 7: 1, current: Infinity }, // Default autoclicker cooldowns in ticks
    charge: {amount: new Decimal(0), req: new Decimal(1_000_000), unlocked: false, times: new Decimal(0), persecond: new Decimal(0)}, // Charge resource, requirement to prestige, and how many times the player has prestiged
    consoleunlocked: false
}

player = default_player
function resetplayer() {player = default_player}
