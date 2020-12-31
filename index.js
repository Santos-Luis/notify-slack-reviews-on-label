const Core = require('@actions/core');
const Github = require('@actions/github');
const Slack = require('node-slack');

try {
  const { env } = process;
  const webhookUrl = env.SLACK_WEBHOOK;
  const username = env.USERNAME || 'ReadyForReviewBot';

  const payload = Github.context.payload;
  const {
    pull_request: {
      html_url: htmlUrl,
      requested_reviewers: requestedReviewers,
      title,
      user: {
        login: authorName
      }
    },
    repository: {
      name: repoName
    }
  } = payload;

  const reviewersNamesArray = requestedReviewers.map(({ login }) => login);
  const reviewersNames = reviewersNamesArray.join(', ');

  const slack = new Slack(webhookUrl);

  const text = `
    htmlUrl: ${htmlUrl}
    title: ${title}
    repoName: ${repoName}
    authorName: ${authorName}
    reviewersNames: ${reviewersNames}
  `;

  slack.send({ text, username });
} catch (error) {
  Core.setFailed(error.message);
};
