import * as types from './types'
import api from '@/api/api'
const actions = {
    setScanData({commit}, data) {
        // console.log(data)
        api.getsacndata(data).then(res => {
            // alert(res)
            commit(types.SET_SCAN_DATA, res.data)
        })
        
    }

}


export default actions
