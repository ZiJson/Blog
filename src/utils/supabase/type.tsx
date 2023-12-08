export type ProfileTable = {
    id: string
    updated_at: string
    username: string
    full_name: string
    avatar_url: string
    website: string
    admin_role: boolean
}
export type CommentTable = {
    id: string
    created_at: string
    text: string
    user_id: string
    post_id: string
}