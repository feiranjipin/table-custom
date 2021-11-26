import DesignVenue from './DesignVenue'

const dDvs = {
    install(Vue){
        Vue.component(
            'DesignVenue', DesignVenue
        )
    }
}

if(typeof window != 'undefined' && window.Vue){
    window.Vue.use(dDvs)
}

export default dDvs