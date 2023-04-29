import handler from "@/pages/api/places";
import { mockRequestGET } from "../mocks/mockRequest";

describe("places", () => {
  it("La respuesta debe de retornar un código de estado 200 y una respuesta con una longitud de 3", async () => {
    const { req, res } = mockRequestGET();
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toHaveLength(3);
  });

  it("La respuesta debe de retornar un código de estado 404 y un mensaje de error", async () => {
    const { req, res } = mockRequestGET("POST");
    await handler(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData().message).toBe("Not found");
  });
});
