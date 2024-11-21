import { RequestHandler } from "express";
import * as sites from '../../services/sites';
import * as sections from '../../services/sections';

export const getSite: RequestHandler = async(req, res) => {
    const {id} = req.params;
    if(id){
        let site: any = false;
       if(parseInt(id)){
            site = await sites.getAll({id: parseInt(id)});
       }else{
            site = await sites.getAll({name: id});
       }
       if(site){
        let siteId = site.id;
        let allSectionOfTheSite = await sections.getAll({siteId: siteId});
        if(allSectionOfTheSite){
            site = {
                head: site,
                body: allSectionOfTheSite
            }
            res.json({site});
            return;
        }
       }
    }
    res.json({error: 'Site não encontrado'});
    return;
}