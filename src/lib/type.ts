

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    hassPassword: string | null;
}

export interface Review {
    id: string;
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
    createdAt: Date;
    blogId: string;
    parentReviewId?: string | null;
    replies?: Review[]; // Nested replies
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
    reviews: Review[]; // Includes nested replies
    createdAt: Date;
    updatedAt: Date;
    author: string;
    likes: Like[];  
}
