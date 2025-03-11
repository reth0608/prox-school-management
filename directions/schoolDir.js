import express from "express";
import DB from "../config/database.js";

const router = express.Router();

router.post('/addSchool', (req, res)=>{
    const {name, address, latitude, longitude}=req.body;
    if(!name || !address || !latitude || !longitude){
        return res.status(400).json({error: 'All fields are required'});
    }
    const query = 'insert into schools(name, address, latitude, longitude) values (?, ?, ?, ?)';
    DB.query(query, [name, address, latitude, longitude], (err, result)=>{
        if (err){
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({message: 'School added successfully'});
    });
});

router.get('/listSchools', (req, res)=>{
    const { latitude, longitude } = req.query;
    const distance = (lat1, lat2, lon1, lon2)=>{
        const R = 6371;
        
        const toRad = (angle) => (angle*Math.PI)/180;

        lat1=toRad(lat1);
        lat2=toRad(lat2);
        lon1=toRad(lon1);
        lon2=toRad(lon2);

        const delLat = (lat2-lat1);
        const delLot = (lon2-lon1);

        const a = (Math.sin(delLat/2)**2) + Math.cos(lat1)*Math.cos(lat2)*Math.sin(delLot/2)*Math.sin(delLot/2);

        const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R*c;
    };

    DB.query('select * from schools', (err, results)=>{
        if(err){
            console.error(err);
            return res.status(500).json({error: 'Database not found'});
        }
        results.forEach(school => {
            school.distance=distance(latitude, school.latitude, longitude, school.longitude);
        });
        results.sort((a,b)=>a.distance - b.distance);
        res.json(results);
    });
});

export default router;