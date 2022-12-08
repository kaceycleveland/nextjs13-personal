import { GithubDay } from "app/components/GithubActivity";
import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";

export const githubClient = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_PAT}`,
  },
});

export const getGithubActivity = async (): Promise<GithubDay[]> => {
  const githubActivityResponse = await githubClient.post("", {
    query: print(gql`
      {
        user(login: "kaceycleveland") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  weekday
                  date
                }
              }
            }
          }
        }
      }
    `),
  });

  const weeks =
    githubActivityResponse.data.data.user.contributionsCollection
      .contributionCalendar.weeks;
  const lastWeek = weeks[weeks.length - 2].contributionDays;
  const currentWeek = weeks[weeks.length - 1].contributionDays;
  return lastWeek.concat(currentWeek).slice(-7);
};
