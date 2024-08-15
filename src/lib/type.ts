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
}

export interface Blog {
    id: string;
    title: string;
    content: string;
    category: string;
    images?: string[]; 
    reviews: Review[];
    likes: Like[];  // Include the like array here
    createdAt: Date; 
    updatedAt: Date;  
    author: string;
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
