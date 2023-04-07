type PipelineStatus =
  | "created"
  | "waiting_for_resource"
  | "preparing"
  | "pending"
  | "running"
  | "success"
  | "failed"
  | "canceled"
  | "skipped"
  | "manual"
  | "scheduled";

type PipelineSource =
  | "push"
  | "web"
  | "trigger"
  | "schedule"
  | "api"
  | "pipeline"
  | "external"
  | "chat"
  | "webide"
  | "merge_request_event"
  | "external_pull_request_event"
  | "parent_pipeline"
  | "ondemand_dast_scan"
  | "ondemand_dast_validation";

export interface GitlabPipelineParams {
  projectID: string;
  pipelineParams?: {
    id?: string | number;
    scope?: "running" | "pending" | "finished" | "branches" | "tags";
    status?: PipelineStatus;

    source?: PipelineSource;

    ref?: string;
    sha?: string;
    yaml_errors?: boolean;
    username?: string;
    updated_after?: string;
    updated_before?: string;
    order_by?: "id" | "status" | "ref" | "updated_at" | "user_id";
    sort?: "asc" | "desc";
    page?: number;
    per_page?: number;
  };
}

export interface GitlabPipelineData {
  id: number;
  iid: number;
  project_id: number;
  sha: string;
  ref: string;
  status: PipelineStatus;
  source: PipelineSource;
  created_at: string;
  updated_at: string;
  web_url: string;
}

interface NoPipelines {
  count: 0;
}

interface OnePipeline {
  count: 1;
}

interface Metric<T = number> {
  min: T;
  avg: T;
  max: T;
}

interface DaysHours {
  days: number;
  hours: number;
}

interface MultiplePipelines {
  count: number;
  timeDistance: Metric<DaysHours>;
}

export type PipelineStats = NoPipelines | OnePipeline | MultiplePipelines;
