
export interface User {
	_id: string;
	clerkId: string;
	fullName: string;
	imageUrl: string;
}
export interface Song{
    _id:string,
    title:string,
    albumId:string|null,
    duration:number,
    imageUrl:string,
    audioUrl:string
    createdAt:string,
    updatedAt:string
}
export interface Album{
_id:string,
title:string,
imageUrl:string,
artist:string,
releaseYear:number,
songs:Song[],
createdAt:string,
updatedAt:string


}

export interface Message  {
   _id:number,
    senderId:string,
    receiverId:string,
    message:string,
    createdAt:string,
    updatedAt:string
  };