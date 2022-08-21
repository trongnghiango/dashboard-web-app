import { CrudRepository } from "../../repo/crud.repo";
import { TypeEvent } from "./type-event.model";
import { TypeEventFields } from "./type-event.field";

export class TypeEventRepository extends CrudRepository<TypeEvent> {

  apiName = "TypeEvent";

  shortFragment = this.parseFragment(`
    ${TypeEventFields}
  `);

  fullFragment = this.parseFragment(`
    ${TypeEventFields}
  `);

}

export const TypeEventService = new TypeEventRepository();