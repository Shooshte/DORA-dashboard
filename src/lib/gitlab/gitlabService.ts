import axios from "axios";

import type { GitlabPipelineData, GitlabPipelineParams } from "./gitlabTypes";

export const getGitlabPipelines = async ({
  projectID,
  pipelineParams,
}: GitlabPipelineParams) => {
  const pipelineData: GitlabPipelineData[] = [];

  const { data, headers } = await makePipelinesRequest({
    projectID,
    pipelineParams: { ...pipelineParams, page: 1, per_page: 100 },
  });

  data.forEach((pipeline) => {
    pipelineData.push(pipeline);
  });

  const totalPages = parseInt(headers["x-total-pages"]);
  if (totalPages <= 1) {
    return pipelineData;
  } else {
    const pageParams = [];

    for (let i = 2; i <= totalPages; i++) {
      pageParams.push({ page: i, per_page: 100 });
    }

    await Promise.all(
      pageParams.map(async (params) => {
        const { data } = await makePipelinesRequest({
          projectID,
          pipelineParams: { ...pipelineParams, ...params },
        });
        data.forEach((pipeline) => {
          pipelineData.push(pipeline);
        });
      })
    );
  }

  return pipelineData;
};

export const makePipelinesRequest = async (params: GitlabPipelineParams) => {
  const { projectID, pipelineParams } = params;
  const response = await axios.get<GitlabPipelineData[]>(
    `${process.env.GITLAB_URL}/api/v4/projects/${projectID}/pipelines`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITLAB_ACCESS_TOKEN}`,
      },
      params: { ...pipelineParams },
    }
  );
  return response;
};
