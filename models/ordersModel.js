const {db}=require('../database/database');
const ObjectId= require('mongodb').ObjectId;
let orders;
const Handlebars=require('handlebars');
exports.list = async () => {
    const orderCollection=db().collection('orders');
    const orders =await orderCollection.aggregate(
        [
            {
                $lookup: {
                    "from": "user",
                    "localField": 'user_id',
                    "foreignField": '_id',
                    "as": 'user'
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$user", 0 ] }, "$$ROOT" ] } }
             },
             { $project: { user: 0 } },
             { $sort : { _id : -1 } }
        ]
    ).toArray();
    return orders;
};
exports.get=async(id)=>{
    const orderCollection=db().collection('orders');
    const order= await orderCollection.findOne({_id:ObjectId(id)});
    return order;
}
exports.getDetail = async (id) => {
    const orderCollection=db().collection('orders');
    const order = await orderCollection.aggregate(
        [
            { $match: { _id: ObjectId(id) } },

            {
                $lookup: {
                    "from": "books",
                    "localField": 'books.book_id',
                    "foreignField": '_id',
                    "as": 'book'
                }
            },
            {
                $addFields: {
                    books_detail:
                    {
                        $map: {
                            input: "$books",
                            as: "e",
                            in: {
                                $mergeObjects: [
                                    "$$e",
                                    { $arrayElemAt: [{ $filter: { input: "$book", as: "j", cond: { $eq: ["$$e.book_id", "$$j._id"] } } }, 0] }
                                ]
                            }
                        }
                    }
                }
            },

            { $project: { book: 0 } }

        ]
    ).toArray();

    return order[0];
}
exports.update=async(id,data)=>{
    const orderCollection=db().collection('orders');
    await orderCollection.updateOne({ _id: ObjectId(id) }, {$set: data}, function (err, results) {});
}