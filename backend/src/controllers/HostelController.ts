import { Request, Response } from "express";
import HostelService from "../services/Hostel.service";
import { IResult, error, success } from "../utils/returnResponses";
import { Service } from "typedi";

@Service()
class HostelController{
    constructor(private readonly service : HostelService){}

    async getAll(request: Request, response: Response){
        try{
            let result: IResult = await this.service.getAll()
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async getOne(request: Request, response: Response){
        try{
            let {id} = request.params;
            let result : IResult = await this.service.getHostelById(id)
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async getHostelsByUser(request: Request, response: Response){
        try{
            let {userId} = request.params;
            let result : IResult = await this.service.getHostelByUser(userId)
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async create(request: Request, response: Response){
        try{
            let body = request.body;
            body.createdBy = request.body.user
            let result : IResult = await this.service.createHostel(body);
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async delete(request: Request, response: Response){
        try{
            let {id} = request.params;
            let result : IResult = await this.service.deleteHostel(id);
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async update(request: Request, response: Response){
        try{
            let {id} = request.params;
            let data = request.body;
            let result : IResult = await this.service.updateHostel(id, data);
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async switchAvailability(request: Request, response: Response){
        try{
            let {id} = request.params;
            let result : IResult = await this.service.switchAvailability(id);
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async getPopularHostel(request: Request, response: Response){
        try{
            let result : IResult = await this.service.getPopularHostel();
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

    async getRecommendedHostels(request: Request, response: Response){
        try{
            let result : IResult = await this.service.getRecommendedHostels();
            success(result, response)
        }
        catch(err : any){
            let result = {message: err.message, status: err.status, payload:null}
            error(result, response)
        }
    }

}

export default HostelController