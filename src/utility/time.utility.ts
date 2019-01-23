/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file 'LICENSE'
 */

export class TimeUtility {
    /**
     * Returns current epoch time with a padding of .000001 as a decimal.
     */
    public getEpoch16(): number {
        const epoch10 = Math.round((new Date()).getTime());
        const epoch16 = (epoch10 * 1000 + 1) / 1000000;
        return epoch16;
    }
}
