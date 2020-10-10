import { Request, Response, Router } from 'express';
import { getCommits, isAccessibleRepo } from './git-caller.service';
const router = Router();

router.get('/:username/:repo', async (req: Request, res: Response) => {
    const { username, repo } = req.params;
    return res.send({ exists: await isAccessibleRepo(username, repo) });
});

router.get('/:username/:repo/commits', async (req: Request, res: Response) => {
    const { username, repo } = req.params;
    const { start, end } = req.query;

    let commits = await getCommits(username, repo, start as string, end as string);
    return res.send(commits);
});

export default router;