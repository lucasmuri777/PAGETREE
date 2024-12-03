import { RequestHandler, Response, Request } from "express";
import * as sections from '../../services/sections';
import { z } from "zod";


export const createSection: RequestHandler = async(req, res) =>{
    const {id_user,id} = req.params;
    const type = req.body.type as string;
    
    if(id_user && id){
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
    if(id_user && id && id_site){
        let content = req.body.content;
        if (typeof content === "string") {
            try {
                content = JSON.parse(content);
            } catch (err) {
                res.status(400).json({ error: "Content não está em formato JSON válido" });
                return;
            }
        }
        let data = {
            content: content
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
    if(id_user && id_site){
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
    if(id_user && id_site && id){
        const deletedSection = await sections.remove({id: parseInt(id), siteId: parseInt(id_site)});
        if(deletedSection){
            res.status(200).json({deletedSection});
            return;
        }
    }
    res.json({error: 'Algo deu errado'});
    return;
}