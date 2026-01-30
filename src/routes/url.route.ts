import router from 'express';
import { generateShortURL, getAllUrls, redirect } from '../controllers/url.controller';

const urlRouter = router();

urlRouter.get('/', getAllUrls);
urlRouter.post('/generate', generateShortURL);
urlRouter.get('/:shortUrl', redirect);

export default urlRouter;