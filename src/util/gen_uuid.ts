import { v4 as uuidv4 } from 'uuid';
function gen_uuid() {
    return uuidv4();
}

export { gen_uuid };