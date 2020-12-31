const Core = require('@actions/core');
const Github = require('@actions/github');
const axios = require('axios');

try {
  const {
		env: {
			SLACK_WEBHOOK: webhookUrl,
		},
	} = process;

  const { context: { payload } } = Github;

  const {
    pull_request: {
      html_url: htmlUrl,
      requested_reviewers: requestedReviewers,
      title,
      user: {
				login: authorName,
				avatar_url: authorAvatar,
      },
    },
    repository: {
      name: repoName,
    },
  } = payload;

  const reviewersNamesArray = requestedReviewers.map(({ login }) => login);
  const reviewersNames = reviewersNamesArray.join(', ');
	
	axios.post(
		webhookUrl,
		{
			'username': 'TAGUS reviewer',
			'icon_url': 'https://iconape.com/wp-content/png_logo_vector/tagus-beer-logo.png',
			'attachments': [
				{
					'color': '#36a64f',
					'pretext': 'Plsssss reviews 🙏',
					'text': '⠀',
					'author_name': authorName,
					'author_icon': authorAvatar,
					'title': title,
					'title_link': htmlUrl,
					'fields': [
							{
									'title': 'Repository',
									'value': `${repoName}`,
									'short': true,
							},
							{
									'title': 'A short field\'s title',
									'value': 'A short field\'s value',
									'short': true,
							},
							{
									'title': 'Reviewers',
									'value': reviewersNames,
									'short': false,
							},
					],
				},
			],
		},
	);
} catch ({ message }) {
  Core.setFailed(message);
};
