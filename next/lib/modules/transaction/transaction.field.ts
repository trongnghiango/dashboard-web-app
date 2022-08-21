export const TransactionFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
transactionHash: String
address: String
amountBNB: Float
amountAther: Float
ratioBNB: Float
percentPaid: Float
status: String
blockId: Int
customerId: String
campaignId: String
`
export const TransactionQuery = `
id
createdAt
updatedAt
transactionHash
address
amountBNB
amountAther
ratioBNB
percentPaid
status
blockId
customerId
campaignId
`