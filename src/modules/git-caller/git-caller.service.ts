import axios, { AxiosError } from 'axios';
import * as _ from 'ramda';
import { Cache } from '../../services/Cache';

const BASE_URL = process.env.GITHUB_URL;
axios.defaults.auth = {
    username: process.env.GITHUB_USERNAME as string,
    password: process.env.GITHUB_TOKEN as string
};

/**
 * @description get the repo if it's found just return true otherwise it throws an error
 * @param username 
 * @param repoName 
 */
export const isAccessibleRepo = async (username: string, repoName: string) => {
    await axios.get(`${BASE_URL}/repos/${username}/${repoName}`);
    return true;
};

const urlCache = new Cache();

export const getCommits = async (username: string, repoName: string, start: string, end: string) => {
    const { data } = await axios.get(`${BASE_URL}/repos/${username}/${repoName}/commits?since=${start}&until=${end}`);
    const result = await Promise.all(data.map(reformatCommitData));

    // clearing the cache
    urlCache.clear();

    return result;
};

const reformatCommitData = (data: any) => {
    let { author } = data;
    return (async () => {

        if (!author)
            author = await getAuthorData(data.commit.author.name);

        let followingUrl = author.following_url.replace('{/other_user}', '');
        const gistUrl = author.gists_url.replace('{/gist_id}', '');

        return {
            name: author.name,
            avatar: author.avatar_url,
            isSigned: data.commit.verification.reason !== 'unsigned',
            organizations: (await resolveUrlValue(author.organizations_url)).map(filterOrganizations),
            followersCount: (await resolveUrlValue(author.followers_url)).length,
            followingCount: (await resolveUrlValue(followingUrl)).length,
            gistsCount: (await resolveUrlValue(gistUrl)).length
        }
    })();
};

const getAuthorData = async (authorName: string) => {
    const url = `${BASE_URL}/users/${authorName}`;
    return await resolveUrlValue(url);
};

const resolveUrlValue = async (url: string) => {
    // using the cache if it exists there 
    if (urlCache.exists(url)) {
        return urlCache.get(url);
    }

    let { data } = await axios.get(url);
    // putting data in cache for next time usuage
    urlCache.put(url, data);

    return data;
};

const filterOrganizations = (org: any) => {
    return org.login;
};

export const handleAxiosError = (err: AxiosError) => {
    return { message: err.response?.data.message || 'Something went wrong', status: err.response?.status || 500 };
};