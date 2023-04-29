import handler from "@/pages/api/search-place";
import { mockRequestPOST } from "../mocks/mockRequest";
import mockFetch from "../mocks/mockFetch";
import { mockUserGitHub } from "../mocks/mockData";

describe("search-place", () => {
  beforeEach(() => {
    global.fetch = mockFetch(mockUserGitHub);
  });

  it("La respuesta debe de retornar un código de estado 200 y un mensaje de segundo lugar", async () => {
    const { req, res } = mockRequestPOST();
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().message).toBe(
      "Congratulations, you are in the second place"
    );
  });

  it("La respuesta debe de retornar un código de estado 404 y un mensaje de error", async () => {
    const { req, res } = mockRequestPOST("GET");
    await handler(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData().message).toBe("Not found");
  });
});
