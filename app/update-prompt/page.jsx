'use client'

import Form from "@components/Form"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const UpdatePrompt = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const respone = await fetch(`/api/prompt/${promptId}`)
            const data = await respone.json()
            console.log(data);
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId])


    const updateForm = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if(!promptId) return alert('Prompt ID not found')

        try {
            const respone = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if (respone.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form type="Edit" submitting={submitting} handleSubmit={updateForm} post={post} setPost={setPost} />
    )
}

export default UpdatePrompt