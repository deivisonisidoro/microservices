import { CreateCustomerUseCase } from '../../../../application/usecases/customer/CreateCustomer';
import { CreateCustomerDTO } from '../../../../domain/dtos/customers/CreateCustomer';
import { prismaClient } from '../../../database/prisma/client';
import { PrismaCustomersRepository } from '../../../repositories/prisma/Customers';

export async function createCustomerComposer(data: CreateCustomerDTO) {
  const repository = new PrismaCustomersRepository(prismaClient);
  const createCustomerUseCase = new CreateCustomerUseCase(repository);
  await createCustomerUseCase.execute(data);
}
