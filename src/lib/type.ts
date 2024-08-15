export interface Review {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        hassPassword: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    comment: string; 
}

export interface Like {
    id: string;
    name: string | null;
    createdAt: Date;
    userId: string | null;
    blogId: string;
}

export interface Blog {
    id: string;
    title: string;
    content: string;
    category: string;
    images?: string[];
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
    author: string;
    likes: Like[];  
}




export interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    createdAt: string | null; 
    updatedAt: string | null; 
    hassPassword: string | null;
}
