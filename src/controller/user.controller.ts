import { Request, Response } from 'express';
import * as UserInterface from '../interface/user';
import { UserModel } from '../model/user'

class UserController {

    async userList(req: Request<{}, {}, {
        page: number,
        limit: number,
    }>, res: Response<{
        status: number,
        message: string,
        users?: UserInterface.IUser[],
        result?:any
    } | { status: number, message: string }>): Promise<any> {
        try {

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            if (page < 1 || limit < 1) {
                return res.status(400).json({ status: 400, message: "Invalid pagination values" });
            }

            // Pagination logic
            const skip = (page - 1) * limit;
            const users = await UserModel.find().skip(skip).limit(limit);
            const result = await UserModel.aggregate([


                {
                    $facet:{
                         docs:[
                           
                            {
                                $skip:skip
                            },
                            {
                                $limit:limit
                            }
                         ],
                         totalCount:[
                            {
                                $count:'count'
                            }
                         ]
                    }
                },
                {
                    $unwind:"$totalCount"
                },
                {
                    $addFields:{
                        page:page,
                        limit:limit
                    }
                },
                {
                    $project:{
                        docs:1,
                        totalDocs:"$totalCount.count",
                        totalPages:{
                            $ceil:{
                                $divide:["$totalCount.count",limit]
                            }
                        },
                        pagingCounter:1,
                        hasPrevPage:{
                            $gt:[page,1]
                        },
                        hasNextPage:{
                            $lt:[page,{$ceil:{$divide:["$totalCount.count",limit]}}]
                        },
                        prePage:{
                            $cond:{
                                if:{$gt:[page,1]},
                                then:{$subtract:[page,1]},
                                else:null
                            }
                        },
                        nextPage:{
                            $cond:{
                                if:{
                                    $lt:[page,{$ceil:{$divide:["$totalCount.count",limit]}}]
                                },
                                then:{
                                    $add:[page,1]
                                },
                                else:null
                            }
                        },
                        page:1,
                        limit:1
                    }
                }
            ])
            return res.status(200).json({
                status: 200,
                message: "Success",
                result: result,
                // result
                
            });
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    }
};

export default UserController