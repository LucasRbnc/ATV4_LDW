import { Request, Response } from "express";
import EventModel from "../model/eventSchema";

class EventController {
    public async createEvent(req: Request, res: Response){
        const { titulo ,descricao, data, local} = req.body;
        try{
            const response = await EventModel.create({titulo,descricao,data,local})
            res.status(200).send(response);
        } catch( error ){
            console.error(error);
            res.status(500).json({message: 'Erro ao criar um evento'});
        }
    }
    public async listEvent(req:Request, res: Response){
        try {
            const events = await EventModel.find();
            res.status(200).send(events);
        } catch( error ){
            console.error(error);
            res.status(500).json({message: 'Erro ao criar um evento'});
        }
    }
    public async updateEvent(req: Request, res: Response) {
        const { id, titulo, descricao, data, local } = req.body;

        try {
            const updatedEvent = await EventModel.findByIdAndUpdate(
                id, 
                { titulo, descricao, data, local }, 
                { new: true, runValidators: true } 
            );

            if (!updatedEvent) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }

            res.status(200).send(updatedEvent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar o evento' });
        }
    }
    public async searchEventByTitle(req: Request, res: Response) {
        const { titulo } = req.query; 

        if (!titulo || typeof titulo !== 'string') {
            return res.status(400).json({ message: 'É necessário fornecer um título para a busca' });
        }

        try {
            const events = await EventModel.find({
                titulo: { $regex: new RegExp(titulo, 'i') } 
            });

            if (events.length === 0) {
                return res.status(404).json({ message: 'Nenhum evento encontrado com esse título' });
            }

            res.status(200).send(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar eventos' });
        }
    }
    public async deleteEvent(req: Request, res: Response){
        const {id} = req.params;
        try{
            const deletedEvent = await EventModel.findByIdAndDelete(id);
            if(!deletedEvent){
                return res.status(404).json({message: 'Evento não encontrado'});
            }
            res.status(200).json({ message: 'Evento deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar o evento' });
        }
    }
}

export default EventController;