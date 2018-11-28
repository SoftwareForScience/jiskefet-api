/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Entity } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, IsNumberString } from 'class-validator';
import { SubType } from '../enums/log.subtype.enum';
import { Origin } from '../enums/log.origin.enum';
import { OrderDirection } from '../enums/orderDirection.enum';
import * as _ from 'lodash';
import { User } from '../entities/user.entity';

/**
 * Represents the query parameters given when executing a GET on /logs.
 */
@Entity('logs')
export class QueryLogDto {

    @ApiModelProperty({
        description: 'On which field to order on.',
        required: false,
    })
    @IsOptional()
    orderBy?: string;

    @ApiModelProperty({
        description: 'The order direction, either ascending or descending.',
        enum: _.values(OrderDirection),
        required: false,
    })
    @IsEnum(OrderDirection, {
        each: true,
        message: `orderDirection must be of enum string types:
            ${_.values(OrderDirection).map((x: OrderDirection) => x)}.`
    })
    @IsOptional()
    orderDirection?: OrderDirection;

    @ApiModelProperty({
        description: 'The maximum amount of logs in each result.',
        default: '25',
        required: false,
    })
    @IsNumberString()
    @IsOptional()
    pageSize?: string;

    @ApiModelProperty({
        description: 'The current page, i.e. the offset in the result set based on pageSize.',
        default: '1',
        required: false,
    })
    @IsNumberString()
    @IsOptional()
    pageNumber?: string;

    @ApiModelProperty({
        description: 'The id of the log.',
        required: false,
    })
    @IsNumberString()
    @IsOptional()
    logId?: string;

    @ApiModelProperty({
        description: 'Search for a term that exists in the title field of a log.',
        required: false,
    })
    @IsString()
    @IsOptional()
    searchterm?: string;

    @ApiModelProperty({
        description: 'The subtype of the log.',
        enum: _.values(SubType),
        required: false,
    })
    @IsEnum(SubType, { each: true, message: 'Each value in subtype must be a valid enum value' })
    @IsOptional()
    subtype?: SubType;

    @ApiModelProperty({
        description: 'The origin/creator of the log.',
        enum: _.values(Origin),
        required: false,
    })
    @IsEnum(Origin, { each: true, message: 'Each value in origin must be a valid enum value' })
    @IsOptional()
    origin?: Origin;

    @ApiModelProperty({
        description: 'The lower bound of the creation time filter range.',
        required: false,
    })
    // Todo: does not work properly yet, %3A instead of :, perhaps.
    // @IsDateString()
    @IsOptional()
    startCreationTime?: string;

    @ApiModelProperty({
        description: 'The upper bound of the creation time filter range.',
        required: false,
    })
    // @IsDateString()
    @IsOptional()
    endCreationTime?: string;

    @ApiModelProperty({
        description: 'The author of the log..',
        required: false,
    })
    user?: User;
}
