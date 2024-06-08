const {db} = require('../config/db');

const getDescriptionById = async (id) => {
    try {
        const query = 'SELECT U.name, d.description, d.prescription, d.createat FROM users U JOIN description d ON U.id = d.user_id WHERE U.id = $1;'
        const {rows} = await db.query (query, [id]);
        return rows;
    }
    catch (error){
        console.log (error);
        throw new Error (error);
    }
};

const createDescription = async (description, prescription, userId) => {
    try {
        const query = 'Insert into description (description, prescription, user_id) VALUES ($1, $2, $3) returning *;';
        const {rows} = await db.query (query, [description, prescription, userId]);
        return rows [0];

    } catch (error){
        console.log (error);
        throw new Error (error);
    }
};

module.exports ={getDescriptionById, createDescription};