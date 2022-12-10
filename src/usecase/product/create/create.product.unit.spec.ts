import CreateProductUseCase from "./create.product.usecase";

const productACreateTestingInput = {
  type: "a",
  name: "my testing product name",
  price: 20000,
};

const productBCreateTestingInput = {
  type: "b",
  name: "my testing product name",
  price: 20000,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product of type A", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(productACreateTestingInput);

    expect(output).toEqual({
      id: expect.any(String),
      name: "my testing product name",
      price: 20000,
    });
  });

  it("should create a product of type B", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(productBCreateTestingInput);

    expect(output).toEqual({
      id: expect.any(String),
      name: "my testing product name",
      price: 40000,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    productACreateTestingInput.name = "";

    await expect(productCreateUseCase.execute(productACreateTestingInput)).rejects.toThrow(
      "Name is required"
    );
  });
});
