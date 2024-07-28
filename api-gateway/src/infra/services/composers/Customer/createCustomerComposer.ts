import { CreateCustomerUseCase } from "../../../../application/useCases/customer/Create/CreateCustomer"
import { CreateCustomerRequestDto } from "../../../../domain/dtos/customer/Create"
import { prismaClient } from "../../../databases/prisma/connection"
import { PasswordHasher } from "../../../providers/PasswordHasher"
import { PrismaCustomerRepository } from "../../../repositories/PrismaCustomer"


export async function createCustomerComposer(data: CreateCustomerRequestDto){
  const repository = new PrismaCustomerRepository(prismaClient)
  const createCustomerUseCase = new CreateCustomerUseCase(repository)
  await createCustomerUseCase.execute(data)
}