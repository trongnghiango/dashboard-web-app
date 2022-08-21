import { CrudRepository } from "../../repo/crud.repo";
import { MemberTransaction } from "./member-transaction.model";
import { MemberTransactionFields } from "./member-transaction.field";

export class MemberTransactionRepository extends CrudRepository<MemberTransaction> {

  apiName = "MemberTransaction";

  shortFragment = this.parseFragment(`
    ${MemberTransactionFields}
  `);

  fullFragment = this.parseFragment(`
    ${MemberTransactionFields}
  `);

}

export const MemberTransactionService = new MemberTransactionRepository();