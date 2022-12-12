import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product = new Product("123", "my product a", 20000);
    await productRepository.create(product);

    const anotherProduct = new Product("124", "my another product", 50000);
    await productRepository.create(anotherProduct);

    const input = {};

    const result = await usecase.execute(input);

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product.id);
    expect(result.products[0].name).toBe(product.name);
    expect(result.products[0].price).toBe(product.price);

    expect(result.products[1].id).toBe(anotherProduct.id);
    expect(result.products[1].name).toBe(anotherProduct.name);
    expect(result.products[1].price).toBe(anotherProduct.price);
  });
});
