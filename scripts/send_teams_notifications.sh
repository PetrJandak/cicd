#!/bin/bash

# Usage: ./send_teams_notification.sh 'repo1,repo2,repo3'

ORG_NAME="PetrJandak" # Replace with your organization name
GH_PAT=$1                # Pass your GitHub Personal Access Token as the first argument
TEAMS_WEBHOOK_URL=$2     # Pass your Teams webhook URL as the second argument
REPOS=$3                 # Comma-separated list of repositories

PR_DETAILS=()

echo "Fetching PRs for specified repos and preparing payload..."
IFS=',' read -ra REPO_ARRAY <<< "$REPOS"
for repo in "${REPO_ARRAY[@]}"; do
    prs=$(curl -s -H "Authorization: Bearer $GH_PAT" "https://api.github.com/repos/$ORG_NAME/$repo/pulls?state=open")
    prs_count=$(echo "$prs" | jq '. | length')
    if [ "$prs_count" -gt "0" ]; then
        pr_data=$(echo "$prs" | jq -c '.[] | {url: .html_url, comments: .comments, author: .user.login}')
        PR_DETAILS+=("$pr_data")
    fi
done

# Prepare the JSON payload for Microsoft Teams
if [ ${#PR_DETAILS[@]} -gt 0 ]; then
    FACTS=()
    for pr in "${PR_DETAILS[@]}"; do
        url=$(echo "$pr" | jq -r '.url')
        comments=$(echo "$pr" | jq -r '.comments')
        author=$(echo "$pr" | jq -r '.author')
        FACTS+=("{\"name\": \"${author}\", \"value\": \"[PR Link](${url}) - ${comments} comments\"}")
    done
    FACTS_STRING=$(IFS=, ; echo "${FACTS[*]}")
    PAYLOAD=$(cat <<EOF
    {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "summary": "Open PRs",
      "sections": [{
        "activityTitle": "Open Pull Requests",
        "facts": [${FACTS_STRING}]
      }]
    }
EOF
    )

    # Send the payload to Microsoft Teams
    curl -H "Content-Type: application/json" -d "$PAYLOAD" $WEBHOOK_URL
else
    echo "No open PRs to report."
fi
