import { createMocks, RequestMethod } from "node-mocks-http";

export const mockRequestGET = (method: RequestMethod = "GET") => {
  const { req, res } = createMocks({ method });
  return { req, res };
};

export const mockRequestPOST = (method: RequestMethod = "POST") => {
  const { req, res } = createMocks({ method });
  req.headers = {
    "Content-Type": "application/json",
  };
  req.body = { username: "erikgiovani" };
  return { req, res };
};
