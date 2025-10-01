import http from "../utils/http";

export const getBranches = async () => {
    return await http.get('/branches?include[0]=sections&include[1]=sections.tables')
}

export const updateBranch = async(id, payload) => {
    return await http.put(`/branches/${id}`, payload)
}

