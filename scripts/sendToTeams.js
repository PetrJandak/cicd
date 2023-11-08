
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Make sure to set this in your GitHub secrets
const TEAMS_WEBHOOK_URL = process.env.WEBHOOK_URL; // Make sure to set this in your GitHub secrets
const OWNER = 'PetrJandak'; // Replace with your GitHub username or organization name

const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
};

async function fetchPullRequests(repo) {
    const url = `https://api.github.com/repos/${OWNER}/${repo}/pulls?state=open`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch PRs for ${repo}: ${response.status}`);
    }
    return response.json();
}

async function sendToTeams(prDetails) {
    const messageCard = {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        "summary": "Open PRs",
        "sections": [{
            "activityTitle": "Open Pull Requests",
            "facts": prDetails.map(pr => ({
                "name": pr.user.login,
                "value": `[${pr.title}](${pr.html_url}) - ${pr.comments} comments`
            }))
        }]
    };

    const response = await fetch(TEAMS_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(messageCard),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        console.log('PRs sent successfully');
    }
}

    async function main() {
        const repoList = process.env.REPOSITORIES;
        const repos = repoList.split(',');

        let prDetails = [];

        for (const repo of repos) {
            const prs = await fetchPullRequests(repo);
            prDetails = prDetails.concat(prs.map(pr => ({
                title: pr.title,
                html_url: pr.html_url,
                comments: pr.comments,
                user: pr.user
            })));
        }

    if (prDetails.length > 0) {
        await sendToTeams(prDetails);
    } else {
        console.log('No open pull requests found.');
    }
}

main().catch(error => {
    console.error('An error occurred:', error);
    process.exit(1); // Exit with a failure code
});
