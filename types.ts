export interface Post {
    id: BigInt,
    title: string,
    author: string,
    video_path: string,
    tags: string[],
    tips: string[]
    procedure: string[],
    anatomy: string[],
    postcontentid: BigInt,
}
export interface Categories {
    id: BigInt[],
    title: string[],
    region: string[]
}
export interface PostCategory {
    id: number[],
    post_id: number[],
    category_id: number[],
}

export interface Posts {
    source: string[],
    select: string[],
    eq: string[],
    order: string[],    
}

export interface SavedVideos {
    key?: string,
    id?: string,
    title?: string,
    uri?: string,
    video_path?: string,
}

export interface Cryptography {
    password: string,
    salt: string,
    cost: number,
    length: number,
}