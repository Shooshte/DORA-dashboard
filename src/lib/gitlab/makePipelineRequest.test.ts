import axios from "axios";

import { makePipelinesRequest } from "./gitlabService";

jest.mock("axios");

describe("makePipelinesRequest", () => {
  it("should call axios.get with the correct URL, headers and params when passed params", async () => {
    await makePipelinesRequest({
      projectID: "12819315",
      pipelineParams: {
        id: "123",
        scope: "finished",
        status: "success",
        ref: "master",
        sha: "123456",
        yaml_errors: false,
        username: "shooshte",
        updated_after: "2021-01-01",
        updated_before: "2021-01-01",
        order_by: "id",
        sort: "asc",
        page: 6,
        per_page: 20,
      },
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.GITLAB_URL}/api/v4/projects/12819315/pipelines`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITLAB_ACCESS_TOKEN}`,
        },
        params: {
          id: "123",
          scope: "finished",
          status: "success",
          ref: "master",
          sha: "123456",
          yaml_errors: false,
          username: "shooshte",
          updated_after: "2021-01-01",
          updated_before: "2021-01-01",
          order_by: "id",
          sort: "asc",
          page: 6,
          per_page: 20,
        },
      }
    );
  });

  it("should call axios.get with the correct URL, headers and params when not passed params", async () => {
    await makePipelinesRequest({
      projectID: "128193152414241",
      pipelineParams: {},
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.GITLAB_URL}/api/v4/projects/128193152414241/pipelines`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITLAB_ACCESS_TOKEN}`,
        },
        params: {},
      }
    );
  });
});
