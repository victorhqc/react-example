import BaseModel from './base';

class Activity extends BaseModel {
    constructor() {
        super({
            model: 'Activities',
            relations: []
        })
    }
};

export default Activity;
