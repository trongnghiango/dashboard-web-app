export const NftFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
nftId: Int
transactionHash: String
smartContract: String
nickName: String
customerId: String
statExp: Int
statLevel: Int
statSkillBonus: Int
statHPBonus: Int
statElementBonus: Int
statMana: Int
statHp: Int
statSummonCost: Int
statStamina: Int
statLucky: Int
rating: Int
nftInfoId: String
itemId: String
marketStatus: String
nftMintedStatus: String
`
export const NftQuery = `
id
createdAt
updatedAt
name
nftId
transactionHash
smartContract
nickName
customerId
statExp
statLevel
statSkillBonus
statHPBonus
statElementBonus
statMana
statHp
statStamina
statLucky
statSummonCost
rating
nftInfoId
itemId
marketStatus
nftMintedStatus
`