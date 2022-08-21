export const CampaignFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
startDate: DateTime
endDate: DateTime
ratioBNB: Float
maxTokenLimit: Float
minimumPurchaseAtherAmount: Float
maximumPurchaseAtherAmount: Float
priority: Int
status: String
totalAtherAmount: Float
is100PercentProgress: Boolean
`
export const CampaignQuery = `
id
createdAt
updatedAt
name
startDate
endDate
ratioBNB
maxTokenLimit
minimumPurchaseAtherAmount
maximumPurchaseAtherAmount
priority
status
totalAtherAmount
is100PercentProgress
`