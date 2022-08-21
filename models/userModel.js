const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,             
        required:true, 
        unique: true,
    },
    password: {
        type: String,       
        required:true
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

    // validation
    if(!email || !password){
        throw Error('Lütfen tüm alanları doldurunuz')
    }
    if(!validator.isEmail(email)){
        throw Error('Geçerli bir eposta giriniz')
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Girdiğiniz eposta kullanılmaktadır.')
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error('Girdiğiniz şifre yeterince güçlü değildir.')
    }

    
    if(email.length > 30){
        throw Error('Eposta adresi en fazla 30 karakter olmalıdır.')
    }
    if(email.length < 8){
        throw Error('Eposta adresi en az 8 karakter olmalıdır.')
    }
    if(password.length > 30){
        throw Error('Şifre en fazla 30 karakter olmalıdır.')
    }
    if(password.length < 8){
        throw Error('Şifre en az 8 karakter olmalıdır.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hashedPassword })

    return user
}

// statics login method
userSchema.statics.login = async function (email, password) {
    if(!email || !password){
        throw Error('Lütfen tüm alanları doldurunuz.')
    }

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Yanlış eposta')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Yanlış şifre')
    }

    return user
}

module.exports = mongoose.model('User',userSchema)