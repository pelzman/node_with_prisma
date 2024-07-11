import { PrismaClient, Prisma } from "@prisma/client";

class BaseRepository<
  T,
  CreateInput,
  WhereInput,
  UpdateInput,
  WhereUniqueInput
> {
  protected model: any;
  //   protected prisma: PrismaClient;
  constructor(model: any) {
    this.model = model;
    // this.prisma = new PrismaClient();
  }
  async create(data: CreateInput): Promise<T> {
    return this.model.create({ data }) as unknown as T;
  }
  async createMany(data: CreateInput): Promise<Prisma.BatchPayload> {
    return this.model.createMany({ data });
  }
  async findMany(where?: WhereInput): Promise<T[]> {
    return this.model.findMany({ where });
  }
  async findOne(where?: WhereUniqueInput): Promise<T | null> {
    return this.model.findUnique({ where });
  }
  async findById(where:WhereUniqueInput): Promise<T | null> {
    return await this.model.findUnique({ where });
  }

  async update(where: WhereUniqueInput, data: UpdateInput): Promise<T> {
    return this.model.update({ where, data });
  }
  //for soft delete deleteAt is added to the model and then filter by it using qauery
  async softDelete(where: WhereUniqueInput): Promise<T> {
    return this.model.update({ where, data: { deletedAt: new Date() } });
  }

  async deepDelete(where: WhereUniqueInput): Promise<T> {
    return this.model.delete({ where });
  }

  async deleteOne(where: WhereUniqueInput): Promise<T | null> {
    const entity = await this.model.findUnique({ where });
    if (entity) {
      await this.model.delete({ where });
    }
    return entity;
  }

  async deleteMany(where: WhereInput): Promise<void> {
    return this.model.deleteMany({ where });
  }
}

export default BaseRepository;
