'use strict'

let saveImage  = async (req,res, activityModel) => {
    const filter = { event_name: req.body.event };
    const update = { image_base_64: req.body.image };
    let doc = await activityModel.findOneAndUpdate(filter,update, {
        new: true
    })

    if (doc !== null &&  doc.image_base_64 !== null){
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
}

let ImageUpdater = function() {
    this.saveImage = saveImage;
}

module.exports = new ImageUpdater();
