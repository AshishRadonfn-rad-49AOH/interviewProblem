const userModel = require("../model/userModel");


/**************** Create User data ****************** */

const create = async function (req, res) {
    try { 
        let data = req.body
        let phone = data
        let string = JSON.stringify(Object.values(phone))
        // console.log(string)
        string = string.slice(2, string.length - 2);
        let phone1 = string.split(',');
        // console.log(phone1)

        for (let i = 0; i < phone1.length; i++) {
            phone1[i] = phone1[i].slice(1, phone1[i].length - 1)          
            phone1[i] = phone1[i].replace(/[^+0-9]+/gmi,"")
        }
        // console.log(phone1)

        let map = new Map()
        for(let i=0; i<phone1.length; i++){
            map.set(phone1[i], map.get(phone1[i]) + 1 || 1)
        }
        // console.log(map)
        let output = [];
        for(let value of map){
            if(value[1] > 1 && value[0][0] === '+'){
                output.push(value[0].slice(-10))
            } else {
                output.push(value[0])
            }
        }
        // console.log(output)
        let final = [...new Set(output)]
        console.log(final)


        //check unique phone
        const isPhoneUsed = await userModel.findOne({ phone: final[0] });
        if (isPhoneUsed) return res.status(400).send({ status: false, message: "phone is already used, try different one" });

        /-------------------create user ---------------------------------------------/
        let savedData = await userModel.create({ phone: final[0] });
        return res.status(201).send({ status: true, data: savedData });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = { create }