import Project from "../models/Project";


const addProject = async (req: any, res: any) => {

    try {
        const { name, image, project_lead, github_link, description, members } = req.body;

        if (!name || !image || !project_lead || !github_link || !description || !members) {
            return res.status(400).json({
                message: "Please fill out all fields"
            })
        }

        const project = Project.create({
            ...req.body
        })

        return res.status(201).json({
            message: "Project created successfully",
            project
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

const getProjects = async (req: any, res: any) => {
    try {
        const projects = await Project.find();

        return res.status(200).json({
            projects
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

const deleteProject = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        await Project.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Project deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export {
    addProject,
    getProjects,
    deleteProject
}