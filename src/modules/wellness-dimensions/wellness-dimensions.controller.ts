import {Controller, Get} from '@nestjs/common';
import {ApiInternalServerErrorResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {DATA_FOUND, DATA_NOT_FOUND} from '@/constants/constants';
import {WellnessDimensionsService} from '@/modules/wellness-dimensions/wellness-dimensions.service';

@ApiTags('Wellness Dimensions')
@Controller('wellness-dimensions')
export class WellnessDimensionsController {
    constructor(private readonly wellnessDimensionsService: WellnessDimensionsService) {
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                "status": 200,
                "message": "Data found",
                "data": [
                    {
                        dimension_name: "string",
                        value: [
                            {
                                _id: "string",
                                dimension_name: "string",
                                focus_area: "string",
                                createdAt: "2023-03-15T06:36:55.947Z",
                                description: "string",
                                leading_questions: [
                                    "string",
                                    "string",
                                    "string",
                                    "string",
                                    "string"
                                ],
                                updatedAt: "2023-03-15T08:06:39.134Z"
                            },
                        ]
                    }
                    ]
            },
        },
        description: '200, returns all wellness dimensions',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: 'InternalServerError',
    })
    @Get()
    async fetchWellnessDimensions(): Promise<object | undefined> {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: []
        }

        const dimensions = await this.wellnessDimensionsService.fetchAll();
        if (dimensions.length > 0) {
            let newArray = dimensions.reduce(function (acc: any, curr: any) {
                //finding Index in the array where the Dimension Name matched
                let findIfNameExist = acc.findIndex(function (item: any) {
                    return item.dimension_name === curr.dimension_name;
                })
                // if in the new array no such object exist where
                // Dimension Name matches then create a new object
                if (findIfNameExist === -1) {
                    let obj = {
                        'dimension_name': curr.dimension_name,
                        'metadata': [curr]
                    }
                    acc.push(obj)
                } else {
                    // if name dimension matches , then push the value
                    acc[findIfNameExist].metadata.push(curr)
                }
                return acc;

            }, []);
            res.data = newArray;
            res.message = DATA_FOUND;
        }
        return res
    }
}
