export interface BlogListDto {
    generatedBlogId: number;
    blogRequestId: number;
    title: string;
    contentPreview: string;
    category: string;
    audience: string;
    tone: string;
    generatedAt: string;
}

export interface BlogResponseDto {
    generatedBlogId: number;
    blogRequestId: number;
    title: string;
    content: string;
    generatedAt: string;
}

export interface GenerateBlogDto {
    category: string;
    topic: string;
    audience: string;
    tone: string;
    wordCount: number;
}