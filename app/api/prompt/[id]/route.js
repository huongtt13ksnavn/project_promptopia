import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDatabase()

        const prompt = await Prompt.findById(params.id)

        if(!prompt) return new Response("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 })
    }
}

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json()
    try {
        await connectToDatabase()

        const promptExisting = await Prompt.findById(params.id)

        if(!promptExisting) return new Response("Prompt not found", { status: 404 })

        promptExisting.prompt = prompt
        promptExisting.tag = tag

        await promptExisting.save()
        return new Response(JSON.stringify(promptExisting), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDatabase()

        const prompt = await Prompt.findByIdAndRemove(params.id)

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
} 