const Core = require('@actions/core');
const Github = require('@actions/github');
const axios = require('axios');
// const Slack = require('node-slack');

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
				login: authorName,
				avatar_url: authorAvatar,
      }
    },
    repository: {
      name: repoName,
    },
  } = payload;

  const reviewersNamesArray = requestedReviewers.map(({ login }) => login);
  const reviewersNames = reviewersNamesArray.join(', ');

  // const slack = new Slack(webhookUrl);

  // const text = `
	// 	htmlUrl: ${htmlUrl}
	// 	title: ${title}
	// 	repoName: ${repoName}
	// 	authorName: ${authorName}
	// 	reviewersNames: ${reviewersNames}
  // `.replace(
  //   /\t/g,
  //   ''
	// );
	
	// 'https://apprecs.org/ios/images/app-icons/256/20/921456160.jpg'
	// slack.send({ text, username });
	
	axios.post(
		webhookUrl,
		{
			username,
			"icon_ur": "https://apprecs.org/ios/images/app-icons/256/20/921456160.jpg",
			"attachments": [
				{
					"mrkdwn_in": ["text"],
					"color": "#36a64f",
					"pretext": "Plsssss reviews 🙏",
					"author_name": authorName,
					"author_icon": authorAvatar,
					"title": title,
					"title_link": htmlUrl,
					"fields": [
							{
									"title": "A field's title",
									"value": "This field's value",
									"short": false
							},
							{
									"title": "A short field's title",
									"value": "A short field's value",
									"short": true
							},
					],
				},
			],
		},
	);
} catch (error) {
  Core.setFailed(error.message);
};
