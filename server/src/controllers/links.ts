import { Request, Response } from 'express';
const LinkSchema = require("../model/links");

class LinkController {
    async create(request: Request, response: Response) {
        const link = new LinkSchema(request.body);

        await link.save()
            .then((res: any) => {
                return response.status(200).json({data: res});
            })
            .catch((err: any) => {
                return response.status(400).json({ error: err })
            });
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { Link, NameLink } = request.body;
        if (!id) {
            return response.status(400).json({ error: "Id not valid." })
        }
        await LinkSchema.findByIdAndUpdate(
            id,
            { Link, NameLink },
            { new: true }
        )
            .then((res: any) => {
                if (!res) {
                    throw 'Error on Update. Check values.';
                }
                return response.status(200).json({data: res});
            })
            .catch((err: any) => {
                return response.status(400).json({ err: err });
            });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        await LinkSchema.findByIdAndDelete(
            id,
        )
            .then((res: any) => {
                if (!res) {
                    throw 'Error on Delete. Check values.';
                }
                return response.status(200).json({data: res});
            })
            .catch((err: any) => {
                return response.status(400).json({ err: err });
            });
    }

    async listAll(request: Request, response: Response) {
        await LinkSchema.find()
            .then((res: any) => {
                return response.status(200).json({data: res});
            })
            .catch((err: any) => {
                return response.status(400).json({ error: err });
            });
    }

    async findById(request: Request, response: Response) {
        const { id } = request.params;

        await LinkSchema.findById(id)
            .then((res: any) => {
                if(!res){
                    return response.status(404).json({ error: "Link not found" });
                }
                return response.status(200).json({data: res});
            })
            .catch((err: any) => {
                return response.status(400).json({ error: err });
            });
    }

    async findByLinkName(request: Request, response: Response) {
        const { linkName } = request.params;
        await LinkSchema.find({ "NameLink": linkName })
            .then((res: any) => {
                return response.status(200).json({data: res});
            })
            .catch((err: any) => {
                return response.status(400).json({ error: err });
            });
    }

    async findByLink(request: Request, response: Response) {
        const { link } = request.params;
        await LinkSchema.find({ "Link": link })
            .then((res: any) => {
                return response.status(200).json({data: res});
            })
            .catch((err: any) => {
                return response.status(400).json({ error: err });
            });
    }
}

export default LinkController;