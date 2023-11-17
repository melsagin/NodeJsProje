const todo = require("../models/todoModel")

const todoAdd = async (req , res) => {
    console.log(req.body);
    try {
        const _todo = await todo.findOne({name: req.body.name})
        if(_todo){
            return res.status(400).json({
                success: false,
                message: "Bu isimde kayıt mevcut"
            })
        }
        const todoAdd = new todo(req.body)//şemadan alınan verileri veritabanına kayıt etmesi gerekiyor.
        await todoAdd.save() //veritabanına kaydet
            .then(() => {
                return res.status(201).json(todoAdd)//işlem başarıyla tammamlanmışsa todoAdd'i döndür
            }) 
            .catch((err) => {//işlem başarısızsa burası çalışsın
                return res.status(400),json({
                    success: false,
                    message: "Kayıt oluşturulurken hata çıktı: " + err
                })
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt oluşturulamadı."
        })
        
    }
}

const todoGetAll = async (req , res) => {
    const { page } = req.query
    const limit = 2
    const skip = Number(page - 1) * limit //buraya göre kaldığı yeri bulup istenilen kaydın olduğu yere gidecek
    try {
        const todoGetAll = await todo.find({}).limit(limit).skip(skip)
        return res.status(200).json({
            success: true,
            data: todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt Getirilemedi !" 
        })
    }
}

const todoUpdate = async (req , res) => {
    const { id } = req.params
    try {
        const todoUpdate = await todo.findByIdAndUpdate(id, req.body)//bu işlem biraz bekleteceği için await kullanılıyor
        if(todoUpdate){
            return res.status(200).json({
                success: true,
                message: "Güncelleme Başarılı"
            })
        }
        else return res.status(400).json({
            success: false,
            message: "Kayıt Güncellenemedi"
        })
        
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message:"Kayıt Güncellenemedi"
        })
    }
}

const todoDelete = async (req, res) => {
    const { id } = req.params
    
    try {
        const todoDelete = await todo.findByIdAndDelete(id) //verilen id yi bul ve o kaydı sil
        if (todoDelete) {
            return res.status(200).json({
                success: true,
                message: "Kayıt Başarıyla Silindi"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Kayıt Silinemedi"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıt Silinemedi : " + error
        })
    }


}

const todoGet = async (req, res) => {
    const { id } = req.params

    const todoGet = await todo.findById(id)
    if (todoGet) {
        return res.status(200).json(todoGet)
    }
    else {
        return res.status(404).json({
            success: false,
            message: "Kayıt Bulunamadı !"
        })
    }
}

module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet
}