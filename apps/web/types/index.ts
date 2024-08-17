 export interface Course {
    courseImage: string;
    courseTitle: string;
    courseDescription: string;
    courseUrl: string;
    rentalDuration: string;
    rentalPrice: number;
    category: string;
    isLive: boolean;
    language: string;
    courseType: string;
  }
  
 export interface Session {
    user:User
 }
 export interface User {
    id :string,
    email:string,
    name:string,
    imageUrl:string
 }