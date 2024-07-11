
import { Prisma } from "@prisma/client";

export const clientSelect = Prisma.validator<Prisma.ClientSelect>()({
    id:true,   
    name: true,
    email:true,
    password:true,
    phone:true,
    address:true,
    requestCount :true,
    status:true,    
    subscriptionStatus:true,
    searchTokenBalance:true,
    subscriptionStartDate:true,
    subscriptionExpiresOn:true,
    subscriptionDuration:true,
    isDeleted:true,
})

 export type IClientAttribute =  Prisma.ClientGetPayload<{
    select :typeof clientSelect
 }>