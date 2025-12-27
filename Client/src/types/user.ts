export type User ={
    id: string;
    displayName: string;
    email: string;
    token: string;
    imageurl?: string
}

export type Logincreds={
    email:string;
    password:string;
}
export type Registercreds={
    email:string;
    displayName:string;
    password:string;
}