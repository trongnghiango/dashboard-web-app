export const ProviderFields = `
id: String
createdAt: DateTime
updatedAt: DateTime
name: String
code: String
appId: String
contract: String;
serverUrl: String
isRunning: Boolean
restartTime: DateTime
restartCount: Int
`
export const ProviderQuery = `
id
createdAt
updatedAt
name
code
contract
appId
serverUrl
isRunning
restartTime
restartCount
`