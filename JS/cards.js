const cards = {
    regular: {
        1: {cost: new Decimal(20)},
        2: {cost: new Decimal(200)},
        3: {cost: new Decimal(500)},
        4: {cost: new Decimal(2000)},
        5: {cost: new Decimal(2000)},
        6.1: {cost: new Decimal(5000)}, 6.2: {cost: new Decimal(5000)},
        7: {cost: new Decimal(10_000)},
        8: {cost: new Decimal(31_415)},
        9.1: {cost: new Decimal(100_000)}, 9.2: {cost: new Decimal(100_000)},
        10: {cost: new Decimal(500_000)},
        11: {cost: new Decimal(694_200)},
        12: {cost: new Decimal(1_500_000)}
    },
    charge: {
        1: {cost: [new Decimal(500_000), new Decimal(200)]}, // about cost: first element is points, second one is charge
        2: {cost: [new Decimal(1_000_000), new Decimal(500)]}
    }
}
