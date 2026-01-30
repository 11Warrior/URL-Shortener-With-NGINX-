
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { URL } from "../db/models/URL";

export const getAllUrls = async (req: Request, res: Response) => {
    try {
        const urls = await URL.find()

        return res.status(200).json(urls);

    } catch (error) {
        console.log('Error generating short URL', error);
        throw error;
    }
}

export const generateShortURL = async (req: Request, res: Response) => {
    try {
        const { longUrl } = req.body;
        const shortId = nanoid(8);
        //lets keep it single line shorturl

        const urlInDB = await URL.findOne({
            url: longUrl
        })
        // console.log(longUrl, urlInDB);
        if (urlInDB) return res.status(400).json({ status: 'Long Url already in Db' })

        const url = await URL.create({
            url: longUrl,
            shortUrl: {
                url: shortId,
                clicks: 0
            }
        })

        return res.status(201).json({ status: 'sucess', shortUrl: shortId });

    } catch (error) {
        console.log('Error generating short URL', error);
        throw error;
    }
}

export const redirect = async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params as { shortUrl: string };
        // console.log(shortUrl);

        const urlInDb = await URL.findOne({
            "shortUrl.url": shortUrl!,

        })

        if (!urlInDb) return res.status(401).json({ status: 'Not-Found', message: 'short url not in db' })

        // console.log(urlInDb);
        const longUrl = urlInDb.url;
        // console.log(longUrl);

        const updatedUrl = await urlInDb.updateOne(
            {
                $inc: { "shortUrl.clicks": 1 }
            },
        )

        // console.log(updatedUrl, urlInDb);

        res.redirect(longUrl!);

    } catch (error) {
        console.log('Error generating short URL', error);
        throw error;
    }
}        