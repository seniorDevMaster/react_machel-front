import API from "./api"
import Utils from "../utils"

export default class System {
    static async getSYSStatus() {
        try {
            const retVal = await API.request(API.SYSTEM.SYSSTATUS)
            if (retVal.error) {
                Utils.error("Axios: System status.", retVal.message)
            } else {
                return retVal.data
            }
        } catch (e) {
            Utils.error("Axios: System status.", e)
        }
        return null
    }
    static async list(param) {
        // get System's list from backend
        try {
            const retVal = await API.request({
                ...API.SYSTEM.LIST,
                url:
                    API.SYSTEM.LIST.url +
                    "?page_index=" +
                    param.page_index +
                    "&page_size=" +
                    param.page_size,
            })

            if (retVal.error) {
                Utils.error("Axios: System list.", retVal.message)
            } else {
                return retVal.data
            }
        } catch (e) {
            Utils.error("Axios: System list.", e)
        }
        return []
    }
    static async listAll() {
        try {
            const retVal = await API.request(API.STHREE.LIST);
            if (retVal.error) {
                Utils.error("Axios: System status.", retVal.message)
            } else {
                return retVal.data
            }
        } catch (e) {
            Utils.error("Axios: System status.", e)
        }
        return null
    }
    static async download(param) {
        // get System's list from backend
        try {
            const retVal = await API.request({
                ...API.SYSTEM.DOWNLOAD,
                url:
                    API.SYSTEM.DOWNLOAD.url +
                    "?s3_id=" +
                    param.s3_id +
                    "&file_name=" +
                    param.file_name,
            })

            if (retVal.error) {
                Utils.error("Axios: System download.", retVal.message)
            } else {
                return retVal.data
            }
        } catch (e) {
            Utils.error("Axios: System download.", e)
        }
        return []
    }
}
