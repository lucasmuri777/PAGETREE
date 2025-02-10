import { RequestHandler } from "express";
import * as sites from '../../services/sites';
import * as sections from '../../services/sections';
import * as user from '../../services/user';

export const getSite: RequestHandler = async(req, res) => {
    const {id} = req.params;
    if(id){
        
        let site: any = false;
       if(parseInt(id)){
            site = await sites.getAll({id: parseInt(id)});
       }else{
            site = await sites.getAll({title: id});
       }
       if(site[0]){
        let userHasPremium = await user.getOne({id: site[0].userId});
        if(userHasPremium && userHasPremium.plan != 'FREE'){
            const siteId: number = site[0].id;
            if(siteId){
                const allSectionOfTheSite = await sections.getAll({siteId: siteId});
                if(allSectionOfTheSite){
                    site = {
                        head: site,
                        body: allSectionOfTheSite
                    }
                    res.json({site});
                    return;
                }
            }
        }else{
            res.json({error: 'Site fora do ar!<br/> se você é o proprietário, faça um upgrade para premium'});
            return;
        }
       }
    }
    res.json({error: 'Site não encontrado'});
    return;
}