import * as Joi from "joi"
import { IClientAttribute } from "../types/ClientType"
import PasswordComplexity  from "joi-password-complexity"

const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,   
  };

 class Validate {

    async validateClient(client:IClientAttribute){
      const validated = Joi.object({
        name: Joi.string().min(5).max(30),
        email:Joi.string().required().email().description("email is required"),
        password: PasswordComplexity(complexityOptions).description("require atleast 5 characters, one lowercase, one uppercase, one number, and one symbol"),
        phone:Joi.string().max(11),
        address:Joi.string().required().description('address is required'),
        requestCount :Joi.number(),
        status: Joi.boolean(),    
        subscriptionStatus:Joi.boolean(),
        searchTokenBalance:Joi.number(),
        subscriptionStartDate:Joi.date(),
        subscriptionExpiresOn:Joi.date(),
        subscriptionDuration:Joi.date(),
        isDeleted: Joi.boolean(), 
      })
      return validated.validate(client)
    }


    async validateLoginClient(client:IClientAttribute){
        const validated = Joi.object({          
          email:Joi.string().required().email().description("email is required"),
          password: PasswordComplexity(complexityOptions).description("require atleast 5 characters, one lowercase, one uppercase, one number, and one symbol"),
      
        })
        return validated.validate(client)
      }
 }
 export default Validate