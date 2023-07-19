'use client'

import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreatePrompt = () => {
    const router = useRouter()
    const {data: session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const createForm = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session.user.id,
                    tag: post.tag
                })
            })
            if (response.ok) {
                router.push('/profile')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form type="Create" submitting={submitting} handleSubmit={createForm} post={post} setPost={setPost} />
    )
}

export default CreatePrompt