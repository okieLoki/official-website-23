import { Request, Response } from 'express';
import Team from '../models/Team';

const addTeamMember = async (req: Request, res: Response) => {
    try {
        const { name, position, email } = req.body;

        // Check for existing entry 
        const existingMember = await Team.findOne({ email });

        if (existingMember) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Check if mandatory fields are present
        if (!position || !name || !email) {
            return res.status(400).json({
                message: 'Mandatory fields are missing'
            });
        }

        // check for mentor Position
        if (position === 'mentor' && !req.body.role) {
            return res.status(400).json({
                message: 'Mentor role is missing'
            });
        }

        const member = await Team.create({ ...req.body });

        return res.status(201).json({
            message: 'Member added',
            data: member
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};

const getTeamMembers = async (req: Request, res: Response) => {

    try {
        const lead = await Team.find({ position: 'lead' });
        const coLead = await Team.find({ position: 'co-lead' });
        const mentor = await Team.find({ position: 'mentor' });
        const core = await Team.find({ position: 'core' });


        return res.status(200).json({
            "lead": lead,
            "co-lead": coLead,
            "mentor": mentor,
            "core": core
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server error'
        })
    }

}

const deleteTeamMember = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedMember = await Team.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({
                message: 'Member not found'
            });
        }

        return res.status(200).json({
            message: 'Member deleted'
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
}

export { addTeamMember, getTeamMembers, deleteTeamMember };

