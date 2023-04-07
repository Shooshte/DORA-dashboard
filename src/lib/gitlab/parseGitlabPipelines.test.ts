import { parseGitlabPipelines } from "./gitlabUtils";

import type { GitlabPipelineData } from "./gitlabTypes";

describe("parseGitlabPipelines", () => {
  it("should parse pipelines data count and averages correctly", () => {
    const data: GitlabPipelineData[] = [
      {
        id: 829835954,
        iid: 2653,
        project_id: 12819315,
        sha: "2acb8b209900fb564762dc2d49c7be314d1ba7bd",
        ref: "master",
        status: "success",
        source: "push",
        created_at: "2023-04-06T08:36:42.541Z",
        updated_at: "2023-04-06T08:52:10.682Z",
        web_url:
          "https://gitlab.com/tus-applications/tus_trgovine_recommended_basket/-/pipelines/829835954",
      },
      {
        id: 829669706,
        iid: 2650,
        project_id: 12819315,
        sha: "8153651725f369cb07d8985f8dea3f1ffcfc3290",
        ref: "master",
        status: "success",
        source: "push",
        created_at: "2023-04-06T05:18:45.944Z",
        updated_at: "2023-04-06T05:25:46.422Z",
        web_url:
          "https://gitlab.com/tus-applications/tus_trgovine_recommended_basket/-/pipelines/829669706",
      },
      {
        id: 829646561,
        iid: 2647,
        project_id: 12819315,
        sha: "094e8f1de28fd5698e0ef7927f61b2df821c02b3",
        ref: "master",
        status: "success",
        source: "push",
        created_at: "2023-04-06T04:31:42.345Z",
        updated_at: "2023-04-06T04:39:02.134Z",
        web_url:
          "https://gitlab.com/tus-applications/tus_trgovine_recommended_basket/-/pipelines/829646561",
      },
      {
        id: 822613146,
        iid: 2629,
        project_id: 12819315,
        sha: "1153339533f36f0db6767fdaa6e3231c517315bc",
        ref: "master",
        status: "success",
        source: "push",
        created_at: "2023-03-30T08:39:10.138Z",
        updated_at: "2023-03-30T08:45:20.097Z",
        web_url:
          "https://gitlab.com/tus-applications/tus_trgovine_recommended_basket/-/pipelines/822613146",
      },
      {
        id: 822608380,
        iid: 2627,
        project_id: 12819315,
        sha: "b39654a0817e5a35677214c47bc4460ca24880c5",
        ref: "master",
        status: "success",
        source: "push",
        created_at: "2023-03-30T08:36:04.623Z",
        updated_at: "2023-03-30T08:39:04.474Z",
        web_url:
          "https://gitlab.com/tus-applications/tus_trgovine_recommended_basket/-/pipelines/822608380",
      },
    ];

    const parsedData = parseGitlabPipelines(data);
    expect(parsedData).toEqual({
      count: 5,
      timeDistance: {
        avg: { hours: 42.05, days: 1.75 },
        min: { hours: 0.1, days: 0 },
        max: { hours: 163.9, days: 6.83 },
      },
    });
  });

  it("should return count 0 and distances as undefined when an empty array is passed", () => {
    const parsedData = parseGitlabPipelines([]);
    expect(parsedData).toEqual({
      count: 0,
    });
  });

  it("should return count 1 and no distance data when only a single pipeline is passed", () => {
    const parsedData = parseGitlabPipelines([
      {
        id: 822608380,
        iid: 2627,
        project_id: 12819315,
        sha: "b39654a0817e5a35677214c47bc4460ca24880c5",
        ref: "master",
        status: "success",
        source: "push",
        created_at: "2023-03-30T08:36:04.623Z",
        updated_at: "2023-03-30T08:39:04.474Z",
        web_url:
          "https://gitlab.com/tus-applications/tus_trgovine_recommended_basket/-/pipelines/822608380",
      },
    ]);
    expect(parsedData).toEqual({ count: 1 });
  });
});
