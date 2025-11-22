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
    buyable_amounts: { 
        1: new Decimal(0),
        2: new Decimal(0),
        3: new Decimal(0),
    },
    autoclicker: { strength: 0, cooldown: new Decimal(1, Infinity, Infinity), cps: 0 }, // Stats, cooldown in ticks. 
    defaultcooldowns: { 
        0: Decimal.dInf, 1: new Decimal(20), 2: new Decimal(10), 3: new Decimal(5), 
        4: new Decimal(2), 5: new Decimal(1), 6: new Decimal(1), 7: new Decimal(1), 
        current: Decimal.dInf }, // Default autoclicker cooldowns in ticks
    charge: {amount: new Decimal(0), req: new Decimal(1_000_000), unlocked: false, times: new Decimal(0), persecond: new Decimal(0)}, // Charge resource, requirement to prestige, and how many times the player has prestiged
    consoleunlocked: false
}

player = default_player
function resetplayer() {player = default_player}
