const githubCall = async(username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    return user;
}

export default githubCall;