import { Module } from "@nestjs/common";
import { SuppliersModuleBase } from "./base/suppliers.module.base";
import { SuppliersService } from "./suppliers.service";
import { SuppliersController } from "./suppliers.controller";
import { SuppliersResolver } from "./suppliers.resolver";

@Module({
  imports: [SuppliersModuleBase],
  controllers: [SuppliersController],
  providers: [SuppliersService, SuppliersResolver],
  exports: [SuppliersService],
})
export class SuppliersModule {}
