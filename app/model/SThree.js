import API from './api';
import Utils from '../utils';

export default class SThree {
    static async getSTStatus() {
        try {
            const retVal = await API.request(API.STHREE.STSTATUS);
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
    static async handleSTStart() {
        try {
            const retVal = await API.request(API.STHREE.STSTART);
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
    static async handleSTStop() {
        try {
            const retVal = await API.request(API.STHREE.STSTOP);
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
            const retVal = await API.request({ ...API.STHREE.LIST, url: API.STHREE.LIST.url + '?page_index=' + param.page_index + '&page_size=' + param.page_size });

            if (retVal.error) {
                Utils.error('Axios: SThree list.', retVal.message);
            } else {
                Utils.log('Axios: SThree list.', retVal);
                return retVal.data;
            }
        } catch (e) {
            Utils.error('Axios: SThree list.', e);
        }
        return [];
    }
    static async update(param) {
        // update user
        try {
            const retVal = await API.request(API.STHREE.UPDATE, param);
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
            const retVal = await API.request(API.STHREE.ADD, param);
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
            const retVal = await API.request({ ...API.STHREE.DELETE, url: API.STHREE.DELETE.url + '?id=' + param.id }, param);
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
