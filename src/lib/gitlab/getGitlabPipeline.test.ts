import axios from "axios";

import { getGitlabPipelines } from "./gitlabService";

jest.mock("axios");
const mAxiosGet = jest.mocked(axios.get);

describe("getGitlabPipelines", () => {
  test("it should call makePipelinesRequest once when x-total-pages header is 1, returning the response data in an array", async () => {
    const mockResponse = {
      data: [{ a: "foo", b: "bar" }],
      headers: { "x-next-page": "", "x-total-pages": "1" },
    };
    // @ts-ignore
    axios.get.mockImplementationOnce(() => mockResponse);

    const response = await getGitlabPipelines({
      projectID: "12819315",
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(response).toEqual(mockResponse.data);
  });

  test("it should call makePipelinesRequest 3 times when x-total-pages header is 3, returning the responses data in an array", async () => {
    const mockResponse1 = {
      data: [{ a: "foo", b: "bar" }],
      headers: { "x-next-page": "2", "x-total-pages": "3" },
    };
    const mockResponse2 = {
      data: [{ c: "foo", d: "bar" }],
      headers: { "x-next-page": "3", "x-total-pages": "3" },
    };
    const mockResponse3 = {
      data: [{ a: "bar", b: "foo" }],
      headers: { "x-next-page": "", "x-total-pages": "3" },
    };

    mAxiosGet
      .mockImplementationOnce(() => Promise.resolve(mockResponse1))
      .mockImplementationOnce(() => Promise.resolve(mockResponse2))
      .mockImplementationOnce(() => Promise.resolve(mockResponse3));

    const response = await getGitlabPipelines({
      projectID: "12819315",
    });

    // 1 time for previous test, and then 3 times for this one
    expect(axios.get).toHaveBeenCalledTimes(4);

    // TODO: add checking for correct params

    expect(response).toEqual([
      ...mockResponse1.data,
      ...mockResponse2.data,
      ...mockResponse3.data,
    ]);
  });
});
