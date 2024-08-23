import { Service } from "typedi";
import HostelRepository from "../repositories/HostelRepository";
import { uploader, uploaderListOfMedia } from "../utils/uploader";

@Service()
class HostelService{
    constructor(
        private readonly repository : HostelRepository
    ){}

    async getAll(){
        let result = await this.repository.getAll()
        return {
            payload: result,
            message: "",
            status: 200
        }
    }

    async getHostelById(id: string){
        let result = await this.repository.getOneById(id);
        return {
            payload: result,
            message: "Succesful",
            status: 200
        }
    }

    async getHostelByUser(id: string){
        let result = await this.repository.getByUser(id);
        return {
            payload: result,
            message: "Succesful",
            status: 200
        }
    }

    async createHostel(data: any){
        if(data.images){
            data.images = await uploaderListOfMedia(data.images)
        }

        let result = await this.repository.save(data)
        return {
            payload: result,
            message: "Hostel added successfully",
            status: 200
        }
    }

    async deleteHostel(id: string){
        let result = await this.repository.delete(id);
        return {
            payload: result,
            message: "Hostel Deleted Successfully",
            status: 200
        }
    }

    async updateHostel(id: string, data: any){
        let result = await this.repository.update(id, data);
        return {
            payload: result,
            message: "Hostel Updated Successfully",
            status: 200
        }
    }

    async switchAvailability(id: string){
        let result: any = await this.repository.getOneById(id);
        result.available = !result?.available
        result = await this.repository.update(id, result);
        return {
            payload: result,
            message: "Hostel Availability Updated",
            status: 200
        }
    }

    async getRecommendedHostels(){
        let result = await this.repository.getRecommendedHostel()
        return {
            payload: result,
            message: "Succesful",
            status: 200
        }
    }

    async getPopularHostel(){
        let result = await this.repository.getPopularHostel()
        return {
            payload: result,
            message: "Succesful",
            status: 200
        }
    }
}

export default HostelService;