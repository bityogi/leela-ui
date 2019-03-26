import { Enum } from 'enumify';


const MEDIATYPE = Object.freeze({
    BANNER_IMAGE : Symbol(0),
    PROFILE_IMAGE : Symbol(1),
    EVENT_IMAGE: Symbol(2),
    ALTERNATE_EVENT_IMAGE: Symbol(3)
})

class LOCATION_TYPE extends Enum {}
LOCATION_TYPE.initEnum([ 'Physical', 'Online' ])

export {
    LOCATION_TYPE,
    MEDIATYPE,
}