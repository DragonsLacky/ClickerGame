

export const GenerateRandomItem = (items) => {
    let p = Math.random();
    let probability = 0;
    for (let [key, value] of Object.entries(items)) {
        probability = probability + value.probability;
        if (p < probability) {
            return {key, value}
        }
    }
}


const Rarity = {
    'Legendary': {
        probability: 7/100,
        value : 5
    },
    'Special': {
        probability: 14/100,
        value : 4
    }, 
    'Rare': {
        probability: 18/100,
        value : 3
    },
    'Uncommon': {
        probability: 26/100,
        value : 2
    },
    'Common' :{
        probability: 35/100,
        value : 1
    }
}

export const GenerateRandomRarity = () => {
    return GenerateRandomItem(Rarity);
}

const ArmorPiece = {
    'Helmet': {
        probability: 1/6
    },
    'Chestplate': {
        probability: 1/6
    },
    'Leggings': {
        probability: 1/6
    },
    'Shoes': {
        probability: 1/6
    },
    'Gauntlets': {
        probability: 1/6
    },
    'Sword': {
        probability: 1/6
    }
}

export const GenerateRandomArmorPiece = () => {
    return GenerateRandomItem(ArmorPiece);
}