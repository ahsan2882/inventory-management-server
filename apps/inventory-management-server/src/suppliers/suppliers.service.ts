import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SuppliersServiceBase } from "./base/suppliers.service.base";

@Injectable()
export class SuppliersService extends SuppliersServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
