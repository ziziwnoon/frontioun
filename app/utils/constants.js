module.exports = {
    MongoIDPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i ,
    ROLES : {
        USER : 'USER' ,
        ADMIN : 'ADMIN' ,
        WRITER : 'WRITER'
    } ,
    ACCESS_TOKEN_SECRET_KEY : '9EEEBDBB856732167F8FB7D417B417CFB7BDFC9560845A75497E9B70A081E3C2' ,
    REFRESH_TOKEN_SECRET_KEY : '96B85A64AB9CBFC9D7CC0EDB58EEEF450351BD6FB45B404F53296B534AAB8521' ,
}