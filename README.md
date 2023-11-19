# Personal Blog


This Blog is a [Next.js](https://nextjs.org/) project with App router, and goes with admin dashboard in order to create/ update post conveniently without rebuilding the project.
Being more friendly for user who doesn't write code, it can be used by any one who want to business his/ her own blog.

## Screenshots
![App Screenshot](https://github.com/ZiJson/Blog/assets/108473055/ae9b01b9-9124-46f8-9af2-feb7598cde64)
![image](https://github.com/ZiJson/Blog/assets/108473055/7535f306-dc83-4b40-9aad-0e35933e761b)



## Features

- full responsive to all devise
- image/code block display
- admin page
    - create post
    - edit post
    - delete post
- gmail auth admin portection
- supabase user management
## Demo
![demo](https://zijasonblog.zeabur.app/)



## Technologies Used

**Next js**
- client and server side
**Tailwind.css**
- css package
**MogoDB**
- storing post data
**Google Cloud Storage**
- storing image
**Google OAuth**
- gmail login
**Supabase - auth**
- user management

![Diagram](https://i.ibb.co/Y882dVN/diagram-export-11-19-2023-6-27-56-PM.png)


## Authentication Setup

1. create google OAuth service
2. create Supabase project
3. connect Supabase auth with google OAuth [Doc](https://supabase.com/docs/guides/auth/social-login/auth-google)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

`NEXT_PUBLIC_SUPABASE_URL`

`NEXT_PUBLIC_SUPABASE_ANON_KEY`


## Deployment

[Zeabur](https://dash.zeabur.com/) CI/CD 

