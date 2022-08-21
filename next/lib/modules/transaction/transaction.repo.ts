import { CrudRepository } from "../../repo/crud.repo";
import { Transaction } from "./transaction.model";
import { TransactionFields } from "./transaction.field";
import { CampaignFields } from "../campaign/campaign.field";
import { CustomerFields } from "../customer/customer.field";

export class TransactionRepository extends CrudRepository<Transaction> {
  apiName = "Transaction";

  shortFragment = this.parseFragment(`
    ${TransactionFields}
    customer{
      ${CustomerFields}
    }
    campaign{
      ${CampaignFields}
    }
  `);

  fullFragment = this.parseFragment(`
    ${TransactionFields}
    customer{
      ${CustomerFields}
    }
    campaign{
      ${CampaignFields}
    }
  `);
}

export const TransactionService = new TransactionRepository();
