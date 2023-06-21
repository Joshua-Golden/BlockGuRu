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
    id: BigInt,
    title: string,
    region: string
}
export interface PostCategories {
    id: BigInt,
    video_id: BigInt,
    category_id: BigInt
}