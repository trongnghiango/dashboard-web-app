import { CrudRepository } from "../../repo/crud.repo";
import { ReferralTransaction } from "./referral-transaction.model";
import { ReferralTransactionFields } from "./referral-transaction.field";
import { CustomerFields } from "../customer/customer.field";

export class ReferralTransactionRepository extends CrudRepository<ReferralTransaction> {
  apiName = "ReferralTransaction";

  shortFragment = this.parseFragment(`
    ${ReferralTransactionFields}
  `);

  fullFragment = this.parseFragment(`
    ${ReferralTransactionFields}
    customer{
      ${CustomerFields}
    }
  `);
}

export const ReferralTransactionService = new ReferralTransactionRepository();
