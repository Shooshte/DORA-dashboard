import type { GitlabPipelineData, PipelineStats } from "./gitlabTypes";

const hoursFromMilliseconds = (milliseconds?: number) => {
  if (milliseconds === undefined) return 0;

  const days = milliseconds / 3600000;
  const roundedDays = days.toFixed(2);
  return Number(roundedDays);
};

const daysFromMilliseconds = (milliseconds?: number) => {
  if (milliseconds === undefined) return 0;

  const days = milliseconds / 86400000;
  const roundedDays = days.toFixed(2);
  return Number(roundedDays);
};

const parseMilliseconds = (milliseconds?: number) => {
  if (milliseconds === undefined)
    return {
      days: 0,
      hours: 0,
    };

  const days = daysFromMilliseconds(milliseconds);
  const hours = hoursFromMilliseconds(milliseconds);

  return {
    hours,
    days,
  };
};

export const parseGitlabPipelines = (
  pipelinesData: GitlabPipelineData[]
): PipelineStats => {
  const pipelinesCount = pipelinesData.length;

  if (pipelinesCount === 0) {
    return {
      count: 0,
    };
  } else if (pipelinesCount === 1) {
    return {
      count: 1,
    };
  } else {
    let minDifference;
    let maxDifference;
    const timeDifferences = [];

    const sortedData = pipelinesData.sort((a, b) => {
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });

    for (let i = 0; i < pipelinesCount - 1; i++) {
      const updated1 = new Date(sortedData[i].updated_at).getTime();
      const updated2 = new Date(sortedData[i + 1].updated_at).getTime();

      const timeDifference = updated1 - updated2;

      if (minDifference === undefined || timeDifference < minDifference) {
        minDifference = timeDifference;
      }

      if (maxDifference === undefined || timeDifference > maxDifference) {
        maxDifference = timeDifference;
      }

      timeDifferences.push(timeDifference);
    }

    const averageTimeDifference =
      timeDifferences.reduce((a, b) => a + b) / timeDifferences.length;

    const dataInDays = {
      avg: parseMilliseconds(averageTimeDifference),
      min: parseMilliseconds(minDifference),
      max: parseMilliseconds(maxDifference),
    };

    return {
      count: pipelinesCount,
      timeDistance: {
        ...dataInDays,
      },
    };
  }
};
