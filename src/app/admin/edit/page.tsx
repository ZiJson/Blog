"use client";
import React, { useState, useCallback } from 'react'
import { uploadPostToDB } from '../../../controllers/clientController';
import TextUploader from '../../../components/admin/TextUploader';
import ImageUploader from '../../../components/admin/ImageUploader';
import TitleUploader from '../../../components/admin/TitleUploader';
import PostEditor from '@/components/admin/PostEditor';
import { Post } from '@/app/page';
import { TextSection } from '@/components/admin/PostEditor';


const newTextSection: TextSection = {
    id: 0,
    type: "text",
    deletable: true,
    content: "",
    sectionTitle: ""
}

const Page = () => {
    const emptyPost: Post = {
        _id: "",
        title: {
            title: "",
            publicUrl: "",
            name: ""
        },
        content: [{ ...newTextSection,id:1, deletable: false }],
        date: ""
    }
    return (
        <PostEditor post={emptyPost} />
    )
}

export default Page