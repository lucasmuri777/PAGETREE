import { RequestHandler, Response, Request } from "express";
import * as sections from '../../services/sections';
import { object, z } from "zod";
import { decodedJWT } from "../../services/auth";
import { User } from "../../types/User";

type deleteSectionType = {
    id: number;
    siteId: number;

}

export const createSection: RequestHandler = async(req, res) =>{
    const {id_user,id} = req.params;
    const type = req.body.type as string;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    
    if(id_user && id && token && token.id == parseInt(id_user)){
        let { order, ...dados } = req.body;
        let data = {
            siteId: parseInt(id),
            type,
            order: parseInt(req.body.order),
            content: dados
        }        
        const section = await sections.create(data as sections.sectionCreateData);
        if(section){
            res.status(201).json({section});
            return;
        }
    }

    res.json({error: 'Algo deu errado'});
    return;
}

export const updateSection: RequestHandler = async(req, res) =>{
    const {id_user, id_site, id} = req.params;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    if(id_user && id && id_site && token && token.id == parseInt(id_user)){
        let content = req.body.content;
        let order = req.body.order;
        if (typeof content === "string") {
            try {
                content = JSON.parse(content);
            } catch (err) {
                res.status(400).json({ error: "Content não está em formato JSON válido" });
                return;
            }
        }
        let data: object = {
            content: content
        }
        if(order || order == 0){
           data = {
                order: parseInt(order),
                content: content
            }   
        }
   
        let filter = { id: parseInt(id), siteId: parseInt(id_site) };
        let update = await sections.update(filter, data as sections.sectionCreateData);
        if(update){
            res.status(200).json({update});
            return;
        }
    }

    res.json({error: 'Algo deu errado'});
    return;
}

export const getSectionsBySiteId: RequestHandler = async(req, res) =>{
    const {id_user, id_site} = req.params;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    if(id_user && id_site && token && token.id == parseInt(id_user)){
        const allSections = await sections.getAll({siteId: parseInt(id_site)});
        if(allSections){
            res.json({allSections});
            return;
        }
    }

    res.json({error: 'Algo deu errado'});
    return;
    
}

export const getSectionById: RequestHandler = async(req, res) =>{
    const {id_user, id_site, id} = req.params;
    if(id_user && id_site && id){
        const section = await sections.getAll({siteId: parseInt(id_site),id: parseInt(id)});
        if(section){
            res.json({section});
            return;
        }
    }

    res.json({error: 'Algo deu errado'});
    return;
}

export const deleteSection: RequestHandler = async(req, res) =>{
    const {id_user, id_site, id} = req.params;
    const token: User = await decodedJWT(req.headers.authorization as string) as User;
    if(id_user && id_site && id && token && token.id == parseInt(id_user)){
        const allSections = await sections.getAll({siteId: parseInt(id_site)}) as deleteSectionType[];;
        const filter = allSections.filter((section)=>{
            return section.id === parseInt(id) ? false : true;
        })
    
        if(filter.length > 1){
            filter.map(async(section, index)=>{
                let filter = { id: section.id, siteId: section.siteId };
                await sections.update(filter, {order: index} as sections.sectionCreateData);
            })
        }

        const deletedSection = await sections.remove({id: parseInt(id), siteId: parseInt(id_site)});
        if(deletedSection){
            res.status(200).json({deletedSection});
            return;
        }

    }
    res.json({error: 'Algo deu errado'});
    return;
}