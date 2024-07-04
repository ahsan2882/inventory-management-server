import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { SuppliersService } from "./suppliers.service";
import { SuppliersControllerBase } from "./base/suppliers.controller.base";

@swagger.ApiTags("suppliers")
@common.Controller("suppliers")
export class SuppliersController extends SuppliersControllerBase {
  constructor(protected readonly service: SuppliersService) {
    super(service);
  }
}
