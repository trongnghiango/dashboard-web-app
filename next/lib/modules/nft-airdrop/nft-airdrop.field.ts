export const NftAirdropFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
price: Float
seedElementBonus: [Int]
seedExp: [Int]
seedHPBonus: [Int]
seedLevel: [Int]
seedSkillBonus: [Int]
seedMana: [Int]
seedHp: [Int]
seedSummonCost: [Int]
seedStamina: [Int]
seedLucky: [Int]
mediaUrl: String
`
export const NftAirdropQuery = `
id
createdAt
updatedAt
name
price
seedElementBonus
seedExp
seedHPBonus
seedLevel
seedSkillBonus
seedMana
seedHp
seedSummonCost
seedStamina
seedLucky
mediaUrl
`