import { getGitlabPipelines } from "../../lib/gitlab/gitlabService";
import { parseGitlabPipelines } from "../../lib/gitlab/gitlabUtils";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // @ts-ignore
    const { projectID, pipelineParams } = await request.json();

    // TODO add request body schema validation
    const pipelines = await getGitlabPipelines({ projectID, pipelineParams });

    const stats = parseGitlabPipelines(pipelines);

    return NextResponse.json(stats);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
