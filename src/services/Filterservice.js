import httpService from "./httpService"


export const GetTimeList = (id=null , cumulative_total_time=null) =>{
    return httpService(`admin/worker/search/${id ? `?parent=${id , cumulative_total_time}` : ""}`, 'get')
}


export const GetBranchList = (id=null , cumulative_total_time=null) =>{

    return httpService(`admin/branch`, 'get')

}