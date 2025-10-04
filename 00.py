import requests
import pandas as pd
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv


load_dotenv()
TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {"Authorization": f"token {TOKEN}", "Accept": "application/vnd.github.v3+json"}
BASE_URL = "https://api.github.com"


repos = [
    {"name": "bitcoin", "owner": "bitcoin"},
    {"name": "go-ethereum", "owner": "ethereum"},
    {"name": "cardano-node", "owner": "input-output-hk"},
    {"name": "polkadot", "owner": "paritytech"},
    {"name": "solana", "owner": "solana-labs"}
]


since_date = (datetime.now() - timedelta(days=365)).isoformat() + "Z"
results = []

for repo in repos:
    url = f"{BASE_URL}/repos/{repo['owner']}/{repo['name']}/commits"
    params = {"since": since_date, "per_page": 100}
    all_commits = []
    
    
    while True:
        response = requests.get(url, headers=HEADERS, params=params)
        if response.status_code != 200:
            print(f"Error for {repo['name']}: {response.status_code}")
            break
        all_commits.extend(response.json())
        if "next" not in response.links:
            break
        url = response.links["next"]["url"]
    
    results.append({
        "Repository": f"{repo['owner']}/{repo['name']
