import User from '../Model/User';

import GraphQLUser, { UserQueries } from "./Backend/GraphQLQueries/Users";

export default class UserServices {

    public static createUser(email: string, name: string, password: string): Promise<any> {
        const parameters = {user: `{email: "${email}", name: "${name}", password: "${password}"}`};

        return new Promise<any>((resolve, reject) => {
            GraphQLUser.executeQuery(UserQueries.createUser, ["uid"], parameters).then((value) => {
                resolve(value);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
        });
    }

    public static loginUser(email: string, password: string){
        const parameters = {email: email, password: password};

        return new Promise<any>((resolve, reject) => {
            GraphQLUser.executeQuery(UserQueries.loginUser, ['uid'], parameters).then((value) => {
                console.log('Logged successfully');
                console.log(value);
                resolve(value);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        })

    }

}