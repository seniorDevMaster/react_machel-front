import API from './api';
import Utils from '../utils';

export default class Send {
    static async getSEStatus() {
        try {
            const retVal = await API.request(API.SEND.SESTATUS);
            if (retVal.error) {
                Utils.error('Axios: SCP status.', retVal.message);
            } else {
                Utils.log('Axios: SCP status.', retVal);
                return retVal.data;
            }
        } catch (e) {
            Utils.error('Axios: SCP status.', e);
        }
        return null;
    }
    static async handleSEStart() {
        try {
            const retVal = await API.request(API.SEND.SESTART);
            if (retVal.error) {
                Utils.error('Axios: SCP status.', retVal.message);
            } else {
                Utils.log('Axios: SCP status.', retVal);
                return retVal.data;
            }
        } catch (e) {
            Utils.error('Axios: SCP status.', e);
        }
        return null;
    }
    static async handleSEStop() {
        try {
            const retVal = await API.request(API.SEND.SESTOP);
            if (retVal.error) {
                Utils.error('Axios: SCP status.', retVal.message);
            } else {
                Utils.log('Axios: SCP status.', retVal);
                return retVal.data;
            }
        } catch (e) {
            Utils.error('Axios: SCP status.', e);
        }
        return null;
    }
    static async list(param) {
        // get user's list from backend
        try {
            const retVal = await API.request({ ...API.SEND.LIST, url: API.SEND.LIST.url + '?page_index=' + param.page_index + '&page_size=' + param.page_size });

            if (retVal.error) {
                Utils.error('Axios: Send list.', retVal.message);
            } else {
                Utils.log('Axios: Send list.', retVal);
                return retVal.data;
            }
        } catch (e) {
            Utils.error('Axios: Send list.', e);
        }
        return [];
    }
    static async update(param) {
        // update user
        try {
            const retVal = await API.request(API.SEND.UPDATE, param);
            if (retVal.error) {
                Utils.error('Axios: Update User Error.', retVal.message);
            } else {
                Utils.log('Axios: Update User.', retVal);
                return retVal.data;
            }
        } catch (e) {
            Utils.error('Axios: Update User.', e);
        }
        return [];
    }
    static async add(param) {
        // update user
        try {
            const retVal = await API.request(API.SEND.ADD, param);
            if (retVal.error) {
                Utils.error('Axios: Update User Error.', retVal.message);
            } else {
                Utils.log('Axios: Update User.', retVal);
                return retVal.data;
            }
        } catch (e) {
            Utils.error('Axios: Update User.', e);
        }
        return [];
    }
    static async delete(param) {
        // update user
        try {
            const retVal = await API.request({ ...API.SEND.DELETE, url: API.SEND.DELETE.url + '?id=' + param.id }, param);
            if (retVal.error) {
                Utils.error('Axios: Delete User Error.', retVal.message);
            } else {
                Utils.log('Axios: Delete User.', retVal);
                return retVal.data;
            }
        } catch (e) {
            Utils.error('Axios: Delete User.', e);
        }
        return [];
    }
}
