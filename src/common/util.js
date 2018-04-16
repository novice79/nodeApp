
import Noty from 'noty'
import _ from 'lodash'
import moment from 'moment'

const audio_type = ['audio/ogg', 'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/flac'];
const video_type = ['video/ogg', 'video/webm', 'video/mp4'];
const pic_type = ['image/jpeg', 'image/png', 'image/gif', 'image/svg', 'image/webp'];
const book_type = ['text/plain', 'application/epub+zip'];

function hash_str(str){
    return str.split('').map(v=>v.charCodeAt(0)).reduce((a,v)=>a+((a<<7)+(a<<3))^v).toString(16)
}
export default {
    audio_type,
    video_type,
    pic_type,
    book_type,
    hash_str
}