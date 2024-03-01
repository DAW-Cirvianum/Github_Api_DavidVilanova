import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

// Define your personal access token
const TOKEN = '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';

// Create an instance of Octokit with your access token
const octokit = new Octokit({ auth: TOKEN });

// Function to fetch user information
async function fetchUser(username) {
  try {
    const response = await octokit.request(`GET /users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user information: ${error.message}`);
  }
}

// Function to fetch repositories for a user
async function fetchUserRepositories(username) {
  try {
    const response = await octokit.request(
      `GET /users/${username}/repos?sort=created`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}


// Main function to fetch and show basic user information
async function userInfo(username) {
  try {
    const user = await fetchUser(username);
    console.log('User:', user);
    
    const logo = document.querySelector('.logo');
    logo.src = user.avatar_url;

    const userInfo = document.querySelector('.userInfo');
    userInfo.innerHTML = `
      <p class="user-name">Name: ${user.name}</p>
      <p class="user-login">Login: ${user.login}</p>
      <p class="user-bio">Bio: ${user.bio}</p>
      <p class="user-location">Location: ${user.location}</p>
    `;
  } catch (error) {
    console.error('Error:', error);
  }
}


// Main function to fetch and display repository information
async function repos(username) {
  try {
    const repositories = await fetchUserRepositories(username);
    console.log(repositories);

    // Get the GitHub data container
    const githubDataContainer = document.querySelector('.repo-list');
    console.log(githubDataContainer);

    // Clear the container
    githubDataContainer.innerHTML = '';

    // Add each repository to the container
    repositories.forEach((repo) => {
      const repoElement = document.createElement('div');
      repoElement.className = 'repo-item bg-gray-800 text-white p-6 rounded-md shadow-lg my-4';

      const repoName = document.createElement('h2');
      repoName.className = 'repo-name text-2xl font-bold mb-2';
      repoName.textContent = repo.name;
      repoElement.appendChild(repoName);

      const repoDescription = document.createElement('p');
      repoDescription.className = 'repo-description text-gray-300 mb-2';
      repoDescription.textContent = repo.description || 'No description available';
      repoElement.appendChild(repoDescription);

      const repoLink = document.createElement('a');
      repoLink.className = 'repo-link text-blue-400 hover:underline';
      repoLink.href = repo.html_url;
      repoLink.textContent = 'View on GitHub';
      repoElement.appendChild(repoLink);

      const repoLanguage = document.createElement('p');
      repoLanguage.className = 'repo-language text-gray-400';
      repoLanguage.textContent = 'Language: ' + (repo.language || 'Not specified');
      repoElement.appendChild(repoLanguage);

      const repoStars = document.createElement('p');
      repoStars.className = 'repo-stars text-yellow-400';
      repoStars.textContent = 'Stars: ' + repo.stargazers_count;
      repoElement.appendChild(repoStars);

      const repoForks = document.createElement('p');
      repoForks.className = 'repo-forks text-green-400';
      repoForks.textContent = 'Forks: ' + repo.forks;
      repoElement.appendChild(repoForks);

      githubDataContainer.appendChild(repoElement);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}



async function newRepo() {
  try {
    const response = await octokit.request('POST /user/repos', {
      name: 'Nou Repositori',
      description: 'Repositori de prova creat amb Octokit',
      private: false,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteRepo() {
  try {
    const response = await octokit.request(
      'DELETE /repos/DavidVilanova11/respostori_nou'
    );
    console.log(response.status);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the main function with a username
function main() {
  userInfo('DavidVilanova11');
  repos('DavidVilanova11');
}

// make functions available to the browser
window.newRepo = newRepo;
window.deleteRepo = deleteRepo;

main();
