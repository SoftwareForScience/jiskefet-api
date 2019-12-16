/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

export abstract class UserProfile {
    id: number;
    name: string;
    username: string;
    personid: number;
    email: string;
    first_name: string;
    last_name: string;
    identityclass: string;
    federation: string;
    phone: string;
    mobile: string;
}
