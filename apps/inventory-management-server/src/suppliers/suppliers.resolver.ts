import * as graphql from "@nestjs/graphql";
import { SuppliersResolverBase } from "./base/suppliers.resolver.base";
import { Suppliers } from "./base/Suppliers";
import { SuppliersService } from "./suppliers.service";

@graphql.Resolver(() => Suppliers)
export class SuppliersResolver extends SuppliersResolverBase {
  constructor(protected readonly service: SuppliersService) {
    super(service);
  }
}
